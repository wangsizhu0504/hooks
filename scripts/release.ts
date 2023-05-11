import { execSync } from 'node:child_process'
import path from 'node:path'
import { createRequire } from 'node:module'
import fs from 'node:fs'
import { consola } from 'consola'
import semver from 'semver'
import minimist from 'minimist'
import enquirer from 'enquirer'

const { prompt } = enquirer
const args = minimist(process.argv.slice(2))
const currentVersion = createRequire(import.meta.url)('../package.json').version
const preId = args.preid || semver.prerelease(currentVersion)?.[0]
const getPkgRoot = pkg => path.resolve(__dirname, `../packages/${pkg}`)

const packages = fs
  .readdirSync(path.resolve(__dirname, '../packages'))
  .filter(p => !p.endsWith('.ts') && !p.endsWith('.json') && !p.endsWith('.md') && !p.startsWith('.'))

const versionIncrements = [
  'patch',
  'minor',
  'major',
  ...(preId ? ['prepatch', 'preminor', 'premajor', 'prerelease'] : []),
]

const inc = (i: any) => semver.inc(currentVersion, i, preId)

async function main() {
  let targetVersion = args._[0]
  if (!targetVersion) {
    // @ts-expect-error
    const { release } = await prompt({
      type: 'select',
      name: 'release',
      message: 'Select release type',
      choices: versionIncrements.map(i => `${i} (${inc(i)})`).concat(['custom']),
    })

    if (release === 'custom') {
      const result: Record<string, any> = await prompt({
        type: 'input',
        name: 'version',
        message: 'Input custom version',
        initial: currentVersion,
      })
      targetVersion = result.version
    } else {
      targetVersion = release.match(/\((.*)\)/)[1]
    }
  }
  if (!semver.valid(targetVersion))
    throw new Error(`invalid target version: ${targetVersion}`)
  // @ts-expect-error
  const { yes: confirmRelease } = await prompt({
    type: 'confirm',
    name: 'yes',
    message: `Releasing v${targetVersion}. Confirm?`,
  })

  if (!confirmRelease) return
  updateVersions(targetVersion)
  // generate changelog
  consola.info('Generating changelog...')

  execSync('pnpm run changelog', { stdio: 'inherit' })

  execSync('npm run build:types', { stdio: 'inherit' })
  // publish packages
  consola.info('Publishing packages...')
  for (const pkg of packages)
    await publishPackage(pkg, targetVersion)

  // push to GitHub
  if (!args.skipGit) {
    consola.info('Pushing to GitHub...')
    execSync('git add .', { stdio: 'inherit' })
    execSync(`git commit -m "chore: release v${targetVersion}"`, { stdio: 'inherit' })
    execSync(`git tag -a v${targetVersion} -m "v${targetVersion}"`, { stdio: 'inherit' })
  }
}

function updatePackage(pkgRoot, version) {
  const pkgPath = path.resolve(pkgRoot, 'package.json')
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'))
  pkg.version = version
  fs.writeFileSync(pkgPath, `${JSON.stringify(pkg, null, 2)}\n`)
}

function updateVersions(version) {
  // 1. update root package.json
  updatePackage(path.resolve(__dirname, '..'), version)
  // 2. update all packages
  packages.forEach(p =>
    updatePackage(getPkgRoot(p), version),
  )
}

async function publishPackage(pkgName, version) {
  const pkgRoot = getPkgRoot(pkgName)
  const pkgPath = path.resolve(pkgRoot, 'package.json')
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'))
  if (pkg.private)
    return

  let releaseTag: string | null = null
  if (args.tag)
    releaseTag = args.tag
  else if (version.includes('alpha'))
    releaseTag = 'alpha'
  else if (version.includes('beta'))
    releaseTag = 'beta'
  else if (version.includes('rc'))
    releaseTag = 'rc'

  try {
    execSync(
      [
        'pnpm publish',
        ...(releaseTag ? ['--tag', releaseTag] : []),
        '--access',
        'public',
      ].join(' '),
      {
        cwd: pkgRoot,
        stdio: 'pipe',
      },
    )
    consola.success(`Successfully published ${pkgName}@${version}`)
  } catch (e) {
    if (e.stderr.match(/previously published/))
      consola.info(`Skipping already published: ${pkgName}`)
    else
      throw e
  }
}

main().catch((err) => {
  updateVersions(currentVersion)
  console.error(err)
  process.exit(1)
})

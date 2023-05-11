export interface PackageManifest {
  name: string
  display: string
  description?: string
  external?: string[]
  globals?: Record<string, string>
  manualImport?: boolean
  build?: boolean
  iife?: boolean
  cjs?: boolean
  mjs?: boolean
  dts?: boolean
  target?: string
  utils?: boolean
  copy?: string[]
}

export interface HookFunction {
  name: string
  package: string
  importPath?: string
  lastUpdated?: number
  category?: string
  description?: string
  docs?: string
  internal?: boolean
  component?: boolean
  directive?: boolean
  external?: string
}

export interface HookPackage extends PackageManifest {
  dir: string
  docs?: string
}

export interface PackageIndexes {
  packages: Record<string, HookPackage>
  categories: string[]
  functions: HookFunction[]
}

import { watchEffect } from 'vue-demi'
import createEffectWithTarget from './createEffectWithTarget'

const useEffectWithTarget = createEffectWithTarget(watchEffect)

export default useEffectWithTarget

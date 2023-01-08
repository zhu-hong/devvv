import { Dep } from './dep'

export function watchEffect(callback) {
  Dep.effectCallback = callback
  callback()

  Dep.effectCallback = null
}
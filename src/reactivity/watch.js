import { Dep } from './dep'
import { ComputedRef } from './reactive'

export function watchEffect(callback) {
  Dep.effectCallback = callback
  callback()

  Dep.effectCallback = null
}

export function watch(depFn, callback) {
  Dep.effectCallback = callback
  depFn()
  Dep.effectCallback = null
}

export function computed(callback) {
  Dep.effectCallback = callback
  const value = callback()

  const cf = new ComputedRef(value)

  Object.defineProperty(callback, 'computedRef', {
    value: cf,
  })

  Dep.effectCallback = null

  return cf
}
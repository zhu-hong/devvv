import { Dep } from './dep'

const dep = new Dep()

export function reactive(data) {
  return new Proxy(data, {
    get(target, key) {
      const value = Reflect.get(target, key)
      dep.collect(target, key)
      return (value !== null && typeof value === 'object') ? reactive(value) : value
    },
    set(target, key, value) {
      const oldVal = target[key]
      const res = Reflect.set(target, key, value)
      dep.notify(target, key, value, oldVal)
      return res
    },
  })
}

export class ComputedRef {
  constructor(value) {
    this._value = value
  }

  get value() {
    return this._value
  }

  set value(value) {
    this._value = value
  }
}
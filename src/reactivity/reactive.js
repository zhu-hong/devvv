export function reactive(data) {
  return new Proxy(data, {
    get(target, key) {
      const value = Reflect.get(target, key)
      return (value !== null && typeof value === 'object') ? reactive(value) : value
    },
    set(target, key, value) {
      return Reflect.set(target, key, value)
    },
  })
}
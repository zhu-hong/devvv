export class Dep {
  static effectCallback = null

  effectMap = new WeakMap()

  collect(target, key) {
    const { effectCallback } = Dep

    if(effectCallback) {
      /**
       * @type { Map<any, Set> }
       */
      let depMap = this.effectMap.get(target)

      if(!depMap) {
        depMap = new Map()
        this.effectMap.set(target, depMap)
      }

      let deps = depMap.get(key)

      if(!deps) {
        deps = new Set()
        depMap.set(key, deps)
      }

      deps.add(effectCallback)
    }
  }

  notify(target, key, curVal, oldVal) {
    const depMap = this.effectMap.get(target)

    if(!depMap) return

    const deps = depMap.get(key)

    deps.forEach((dep) => {
      const newVal = dep(curVal, oldVal)

      if(dep.computedRef) {
        dep.computedRef.value = newVal
      }
    })
  }
} 
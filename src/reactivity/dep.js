export class Dep {
  static effectCallback = null

  effectMap = new WeakMap()

  collect(target, key) {}

  notify(target, key, value) {}
} 
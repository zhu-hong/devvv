let currentEffect: Function | null = null

function createSignal<T>(value: T) {
  const effects: Set<Function> = new Set()

  function read(): T {
    if(currentEffect !== null) {
      effects.add(currentEffect)
    }

    return value
  }

  function write(newValue: T): void {
    value = newValue

    effects.forEach((e) => e())
  }

  return [read, write]
}

function createEffect(effect: Function) {
  currentEffect = effect
  effect()
  currentEffect = null
}

const [count, setCount] = createSignal(0)
console.log(count())

let a = 0
createEffect(() => {
  a = count() + 10
  console.log(a)
})

setInterval(() => {
  setCount(count() + 1)
}, 1000)
type Entry<K, V> = [K, V]

export default class Collection<K, V> {
  private values: Entry<K, V>[]
  constructor(values: Entry<K, V>[] = []) {
    this.values = values
  }

  get(key: K): V | undefined {
    return this.values.find(e => e[0] === key)?.[1]
  }

  set(key: K, value: V) {
    this.values.push([key, value])
  }

  delete(key: K): boolean {
    const i = this.values.findIndex(e => e[0] === key)
    this.values.splice(i, 1)
    return i !== -1
  }

  forEach(cb: (key: K, value: V, index: number, coll: Collection<K, V>) => undefined) {
    this.values.forEach((entry, index) => {
      cb(entry[0], entry[1], index, this)
    })
  }

  find(cb: (key: K, value: V, index: number, coll: Collection<K, V>) => boolean): V | undefined {
    return this.values.find((entry, index) => {
      return cb(entry[0], entry[1], index, this)
    })?.[1]
  }

  filter(cb: (key: K, value: V, index: number, coll: Collection<K, V>) => boolean): Collection<K, V> | undefined {
    return new Collection<K, V>(this.values.filter((entry, index) => {
      return cb(entry[0], entry[1], index, this)
    }))
  }

  clear() {
    this.values = []
  }

  get first(): V | undefined {
    return this.values?.[0]?.[1]
  }

  get length(): number {
    return this.values.length
  }
}
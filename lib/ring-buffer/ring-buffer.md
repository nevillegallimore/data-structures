# RingBuffer
Array based ring buffer with `push`, `pop`, `unshift`, `shift` operations running in constant runtime.

#### RingBuffer&lt;T = any&gt;(capacity: number)
Instantiates an empty `RingBuffer<T>` of given `capacity`:
```typescript
const buffer: RingBuffer<number> = new RingBuffer<number>(5);
console.log(buffer.capacity); // 5
```

#### .fromArray&lt;T = any&gt;(values: Array&lt;T&gt;, capcacity: number): RingBuffer&lt;T&gt;
Instantiates a new `RingBuffer<T>` based on the provided `values` array and provided `capacity`. If no `capacity` is provided, the buffer will default to the length of the provided `values` array:
```typescript
const buffer: RingBuffer<number> = RingBuffer.fromArray<number>([1, 2, 3], 5);
console.log(buffer.length); // 3
console.log(buffer.capacity); // 5

const buffer: RingBuffer<number> = RingBuffer.fromArray<number>([1, 2, 3]);
console.log(buffer.length); // 3
console.log(buffer.capacity); // 3
```

#### .toArray(): Array&lt;T&gt;
Returns content of `RingBuffer<T>` as `Array<T>`:
```typescript
const buffer: RingBuffer<number> = RingBuffer.fromArray<number>([1, 2, 3]);
console.log(buffer.toArray()); // [1, 2, 3]
```

#### .push(value: T): void
Adds value to the end of `RingBuffer<T>`:
```typescript
const buffer: RingBuffer<number> = new RingBuffer<number>(5);
console.log(buffer.length); // 0

buffer.push(1);
console.log(buffer.length); // 1
console.log(buffer.toArray()); // [1]

buffer.push(2);
console.log(buffer.length); // 2
console.log(buffer.toArray()); // [1, 2]
```

#### .unshift(value: T): void
Adds value to the beginning of `RingBuffer<T>`:
```typescript
const buffer: RingBuffer<number> = new RingBuffer<number>(5);
console.log(buffer.length); // 0

buffer.unshift(1);
console.log(buffer.length); // 1
console.log(buffer.toArray()); // [1]

buffer.unshift(2);
console.log(buffer.length); // 2
console.log(buffer.toArray()); // [2, 1]
```

#### .pop(): T | undefined
Returns and removes last value of `RingBuffer<T>`:
```typescript
const buffer: RingBuffer<number> = RingBuffer.fromArray<number>([1, 2, 3]);
console.log(buffer.length); // 3
console.log(buffer.toArray()); // [1, 2, 3]

console.log(buffer.pop()); // 3
console.log(buffer.length); // 2
console.log(buffer.toArray()); // [1, 2]

console.log(buffer.pop()); // 2
console.log(buffer.length); // 1
console.log(buffer.toArray()); // [1]

console.log(buffer.pop()); // 1
console.log(buffer.length); // 0
console.log(buffer.toArray()); // []
```

#### .shift(): T | undefined
Returns and removes first value of `RingBuffer<T>`:
```typescript
const buffer: RingBuffer<number> = RingBuffer.fromArray<number>([1, 2, 3]);
console.log(buffer.length); // 3
console.log(buffer.toArray()); // [1, 2, 3]

console.log(buffer.shift()); // 1
console.log(buffer.length); // 2
console.log(buffer.toArray()); // [2, 3]

console.log(buffer.shift()); // 2
console.log(buffer.length); // 1
console.log(buffer.toArray()); // [3]

console.log(buffer.shift()); // 3
console.log(buffer.length); // 0
console.log(buffer.toArray()); // []
```

#### .flush(): Array&lt;T&gt;
Returns and removes content of `RingBuffer<T>` as `Array<T>`:
```typescript
const buffer: RingBuffer<number> = RingBuffer.fromArray<number>([1, 2, 3]);
console.log(buffer.length); // 3
console.log(buffer.toArray()); // [1, 2, 3]

console.log(buffer.flush()); // [1, 2, 3]
console.log(buffer.length); // 0
console.log(buffer.toArray()); // []
```

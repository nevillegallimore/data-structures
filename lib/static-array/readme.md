# StaticArray
Statically sized array, using `get` and `set` to access/modify items in the array and a set of both conventional and functional methods.

#### StaticArray&lt;T = any&gt;
Instantiates an empty `StaticArray<T>` of given `length`:
```typescript
const array: StaticArray<number> = new StaticArray<number>(3);
console.log(array.length); // 3
```

#### .fromArray&lt;T = any&gt;(values: Array&lt;T&gt;): StaticArray&lt;T&gt;
Instantiates a new `StaticArray<T>` based on the values provided from `Array<T>`:
```typescript
const array: StaticArray<number> = StaticArray.fromArray<number>([1, 2, 3]);
console.log(array.toArray()); // [1, 2, 3]
```

#### .toArray(): StaticArray&lt;T&gt;
Returns `StaticArray<T>`'s content as `Array<T>`:
```typescript
const array: Array<T> = StaticArray
    .fromArray<number>([1, 2, 3])
    .toArray();
console.log(array); // [1, 2, 3]
```

#### .get(index: number): T | undefined
Returns value of item of `StaticArray<T>` at provided `index` or undefined if item's value is not set or `index` is invalid:
```typescript
const array: StaticArray<number> = StaticArray.fromArray([1, 2, 3]);
console.log(array.get(0)); // 1
```

#### .set(index: number, value: T): void
Sets value of `StaticArray<T>` at provided `index` to provided `value` if provided valid index.
```typescript
const array: StaticArray<number> = new StaticArray<number>(3);
array.set(0, 1);
console.log(array.get(0)); // 1
```

#### .has(value: T): boolean
Returns true if `StaticArray<T>` contains provided `value`, otherwise returns false.
```typescript
const array: StaticArray<number> = StaticArray.fromArray([1, 2, 3]);
console.log(array.has(2)); // true
console.log(array.has(4)); // false
```

#### .fill(value: T, start?: number, end?: number): void
Fills items of `StaticArray<T>` from provided `start` or beginning of the array to provided `end` or end of the array with the provided `value`:
```typescript
const array: StaticArray<number> = new StaticArray<number>(5);
array.fill(1);
console.log(array.toArray()); // [1, 1, 1, 1, 1]

const array: StaticArray<number> = new StaticArray<number>(5);
array.fill(1, 1);
console.log(array.toArray()); // [undefined, 1, 1, 1, 1]

const array: StaticArray<number> = new StaticArray<number>(5);
array.fill(1, undefined, 4);
console.log(array.toArray()); // [1, 1, 1, 1, undefined]

const array: StaticArray<number> = new StaticArray<number>(5);
array.fill(1, 1, 4);
console.log(array.toArray()); // [undefined, 1, 1, 1, undefined]
```

#### find(predicate: Predicate&lt;T&gt;): T | undefined
Returns value of first item of `StaticArray<T>` that satisfies provided `predicate`. If no item satisfies `predicate` the method returns `undefined`.
```typescript
const array: StaticArray<number> = StaticArray.fromArray([1, 2, 3]);

const value: number | undefined = array.find((value: T, index: number, array: Array<number>): boolean => {
    return value === 2;
});
console.log(value); // 2

const value: number | undefined = array.find((value: T) => {
    return value === 4;
});
console.log(value); // undefined
```

#### findIndex(predicate: Predicate&lt;T&gt;): number
Return index of first item of `StaticArray<T>` that satisfies provided `predicate`. If no item satisfies `predicate` the method returns `-1`.
```typescript
const array: StaticArray<number> = StaticArray.fromArray([1, 2, 3]);

const index: number = array.findIndex((value: number, index: number, array: Array<number>): boolean => {
    return value === 2;
});
console.log(index); // 1

const index: number = array.findIndex((value: number) => { 
    return value === 4;
});
console.log(index); // -1
```

#### .some(predicate: Predicate&lt;T&gt;): boolean
Returns `true` given any item of `StaticArray<T>` satisfies provided `predicate`. Otherwise, returns `false`. When called on an empty `StaticArray<T>`, the method returns `false`.
```typescript
const array: StaticArray<number> = StaticArray.fromArray([1, 2, 3]);

const result: boolean = array.some((value: number) => {
    return value === 2;
});
console.log(result); // true

const result: boolean = array.some((value: number) => {
    return value === 4;
});
console.log(result); // false
```

#### .every(predicate: Predicate&lt;T&gt;): boolean
Returns `true` given every item of `StaticArray<T>` satisfies provided `predicate`. Otherwise, returns `false`. When called on an empty `StaticArray<T>`, the method returns `true`.
```typescript
const array: StaticArray<number> = StaticArray.fromArray([1, 2, 3]);

const result: boolean = array.some((value: number) => {
    return value <= 3;
});
console.log(result); // true

const result: boolean = array.some((value: number) => {
    return value <= 2;
});
console.log(result); // false
```

#### .forEach(iterator: Iterator&lt;T&gt;): void
Calls provided `iterator` function with each item of `StaticArray<T>`. The iterator is called with the item's `value` and `index` and the static array `array`, cast as Array<T>.
```typescript
const array: StaticArray<number> = StaticArray.fromArray([1, 2, 3]);

array.forEach((value: number, index: number, array: Array<number>) => {
    console.log(value, index, array);
});

// This snippet will print the following:
// 1, 0, [1, 2, 3]
// 2, 1, [1, 2, 3]
// 3, 2, [1, 2, 3]
```

#### .map&lt;U&gt;(transformer: Transformer&lt;T, U&gt;): StaticArray&lt;U&gt;
Maps each item of type T of `StaticArray<T>` based on the provided `transformer` to an item of type U and returns the new items as a new `StaticArray<U>`.
```typescript
const numbers: StaticArray<number> = StaticArray.fromArray([1, 2, 3]);
const strings: StaticArray<string> = numbers.map((value: number, index: number, array: Array<T>) => {
    switch (value) {
        case 1:
            return 'One';
        case 2:
            return 'Two';
        case 3:
            return 'Three';
        default:
            throw new Error('Yikes!');
    }
});
console.log(strings.toArray()); // ["One", "Two", "Three"]
```

#### .filter(predicate: Predicate&lt;T&gt;): StaticArray&lt;T&gt;
Filters `StaticArray<T>` by provided `predicate` function, included only the items which satisfy `predicate` and returning them as a new `StaticArray<T>`.

```typescript
const array: StaticArray<number> = StaticArray.fromArray([1, 2, 3, 4]);
const evens: StaticArray<number> = array.filter((value: number, index: number, array: Array<number>) => {
    return value % 2 === 0;
});
console.log(evens); // [2, 4]
```

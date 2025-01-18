import type { Iterator, Predicate, Reducer, Transformer } from './types.js';

export class StaticArray<T = any> {
    private data: Array<T>;
    public length: number;

    constructor(length: number) {
        this.length = length;
        this.data = new Array<T>(length);
    }

    static fromArray<T>(values: T[]): StaticArray<T> {
        const array: StaticArray<T> = new StaticArray<T>(values.length);
        for (let i = 0; i < values.length; i++) {
            array.set(i, values[i]);
        }
        return array;
    }

    toArray(): Array<T> {
        return this.data;
    }

    get(index: number): T | undefined {
        return this.data[index];
    }

    set(index: number, value: T): void {
        if (index >= 0 && index < this.length) {
            this.data[index] = value;
        }
    }

    has(value: T): boolean {
        for (let i = 0; i < this.length; i++) {
            if (this.data[i] === value) return true;
        }
        return false;
    }

    fill(value: T, start: number = 0, end: number = this.length): void {
        for (let i = start; i < Math.min(end, this.length); i++) {
            this.data[i] = value;
        }
    }

    find(predicate: Predicate<T>): T | undefined {
        for (let i = 0; i < this.length; i++) {
            if (predicate(this.data[i], i, this.toArray())) return this.data[i];
        }
    }

    findIndex(predicate: Predicate<T>): number {
        for (let i = 0; i < this.length; i++) {
            if (predicate(this.data[i], i, this.toArray())) return i;
        }
        return -1;
    }

    some(predicate: Predicate<T>): boolean {
        for (let i = 0; i < this.length; i++) {
            if (predicate(this.data[i], i, this.toArray())) return true;
        }
        return false;
    }

    every(predicate: Predicate<T>): boolean {
        for (let i = 0; i < this.length; i++) {
            if (!predicate(this.data[i], i, this.toArray())) return false;
        }
        return true;
    }

    forEach(iterator: Iterator<T>): void {
        for (let i = 0; i < this.length; i++) {
            iterator(this.data[i], i, this.toArray());
        }
    }

    map<U>(transformer: Transformer<T, U>): StaticArray<U> {
        let result: StaticArray<U> = new StaticArray<U>(this.length);
        for (let i = 0; i < this.length; i++) {
            result.set(i, transformer(this.data[i], i, this.toArray()));
        }
        return result;
    }

    filter(predicate: Predicate<T>): StaticArray<T> {
        let array: Array<T> = [];
        for (let i = 0; i < this.length; i++) {
            if (predicate(this.data[i], i, this.toArray())) {
                array.push(this.data[i]);
            }
        }
        return StaticArray.fromArray(array);
    }

    reduce<U>(reducer: Reducer<T, U>, initValue: U): U {
        let accumulator = initValue;
        for (let i = 0; i < this.length; i++) {
            accumulator = reducer(accumulator, this.data[i], i, this.toArray());
        }
        return accumulator;
    }
}

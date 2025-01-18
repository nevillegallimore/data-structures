import { Iterator, Predicate, Reducer, Transformer } from '../types.js';

export class DynamicArray<T> {
    private data: Array<T>;
    private capacity: number;
    public length: number;

    constructor() {
        this.capacity = 2;
        this.length = 0;
        this.data = new Array<T>(this.capacity);
    }

    private guardCapacity() {
        if (this.length + 1 <= this.capacity) return;

        this.capacity *= 2;
        const data: Array<T> = new Array<T>(this.capacity);
        for (let i = 0; i < this.length; i++) {
            data[i] = this.data[i];
        }
    }

    static fromArray<T>(values: T[]): DynamicArray<T> {
        const result: DynamicArray<T> = new DynamicArray<T>();
        for (let i = 0; i < values.length; i++) {
            result.push(values[i]);
        }
        return result;
    }

    toArray(): Array<T> {
        return [...this.data];
    }

    get(index: number): T | undefined {
        if (index < 0 || index >= this.length) return undefined;
        return this.data[index];
    }

    set(index: number, value: T): void {
        if (index < 0 || index >= this.length) return;
        this.data[index] = value;
    }

    push(value: T): void {
        this.guardCapacity();
        this.data[this.length] = value;
        this.length += 1;
    }

    unshift(value: T): void {
        this.guardCapacity();
        for (let i = this.length; i > 0; i--) {
            this.data[i] = this.data[i - 1];
        }
        this.data[0] = value;
        this.length += 1;
    }

    pop(): T | undefined {
        if (this.length <= 0) return undefined;
        this.length -= 1;
        const result: T = this.data[this.length];
        this.data.splice(this.length, 1);
        return result;
    }

    shift(): T | undefined {
        if (this.length <= 0) return undefined;
        this.length -= 1;
        const result: T = this.data[0];
        for (let i = 0; i < this.length; i++) {
            this.data[i] = this.data[i + 1];
        }
        this.data.splice(this.length, 1);
        return result;
    }

    has(value: T) {
        for (let i = 0; i < this.length; i++) {
            if (this.data[i] === value) return true;
        }
        return false;
    }

    fill(value: T, start: number = 0, end: number = this.length): void {
        for (let i = start; i < Math.min(end, this.length); i++) {
            this.set(i, value);
        }
    }

    find(predicate: Predicate<T>): T | undefined {
        for (let i = 0; i < this.length; i++) {
            if (predicate(this.data[i], i, this.toArray())) return this.data[i];
        }
        return undefined;
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

    map<U>(transformer: Transformer<T, U>): DynamicArray<U> {
        const result: DynamicArray<U> = new DynamicArray<U>();
        for (let i = 0; i < this.length; i++) {
            result.push(transformer(this.data[i], i, this.toArray()));
        }
        return result;
    }

    filter(predicate: Predicate<T>): DynamicArray<T> {
        const result: DynamicArray<T> = new DynamicArray<T>();
        for (let i = 0; i < this.length; i++) {
            if (predicate(this.data[i], i, this.toArray())) {
                result.push(this.data[i]);
            }
        }
        return result;
    }

    reduce<U>(reducer: Reducer<T, U>, initValue: U | undefined): U {
        let accumulator: U | undefined = initValue;
        for (let i = 0; i < this.length; i++) {
            accumulator = reducer(accumulator, this.data[i], i, this.toArray());
        }
        return accumulator as U;
    }
}

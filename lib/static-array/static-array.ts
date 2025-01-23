import type { Iterator, Predicate, Reducer, Transformer } from '../types.js';

export class StaticArray<T = any> {
    private data: Array<T>;
    public length: number;

    constructor(length: number) {
        this.length = length;
        this.data = new Array<T>(length);
    }

    public static fromArray<T = any>(values: T[]): StaticArray<T> {
        const result: StaticArray<T> = new StaticArray<T>(values.length);
        for (let i = 0; i < values.length; i++) {
            result.set(i, values[i]);
        }
        return result;
    }

    public toArray(): Array<T> {
        return [...this.data];
    }

    public get(index: number): T | undefined {
        return this.data[index];
    }

    public set(index: number, value: T): void {
        if (index >= 0 && index < this.length) {
            this.data[index] = value;
        }
    }

    public has(value: T): boolean {
        for (let i = 0; i < this.length; i++) {
            if (this.data[i] === value) return true;
        }
        return false;
    }

    public fill(value: T, start: number = 0, end: number = this.length): void {
        for (let i = start; i < Math.min(end, this.length); i++) {
            this.data[i] = value;
        }
    }

    public find(predicate: Predicate<T>): T | undefined {
        for (let i = 0; i < this.length; i++) {
            if (predicate(this.data[i], i, this.toArray())) return this.data[i];
        }
    }

    public findIndex(predicate: Predicate<T>): number {
        for (let i = 0; i < this.length; i++) {
            if (predicate(this.data[i], i, this.toArray())) return i;
        }
        return -1;
    }

    public some(predicate: Predicate<T>): boolean {
        for (let i = 0; i < this.length; i++) {
            if (predicate(this.data[i], i, this.toArray())) return true;
        }
        return false;
    }

    public every(predicate: Predicate<T>): boolean {
        for (let i = 0; i < this.length; i++) {
            if (!predicate(this.data[i], i, this.toArray())) return false;
        }
        return true;
    }

    public forEach(iterator: Iterator<T>): void {
        for (let i = 0; i < this.length; i++) {
            iterator(this.data[i], i, this.toArray());
        }
    }

    public map<U>(transformer: Transformer<T, U>): StaticArray<U> {
        let result: StaticArray<U> = new StaticArray<U>(this.length);
        for (let i = 0; i < this.length; i++) {
            result.set(i, transformer(this.data[i], i, this.toArray()));
        }
        return result;
    }

    public filter(predicate: Predicate<T>): StaticArray<T> {
        let array: Array<T> = [];
        for (let i = 0; i < this.length; i++) {
            if (predicate(this.data[i], i, this.toArray())) {
                array.push(this.data[i]);
            }
        }
        return StaticArray.fromArray(array);
    }

    public reduce<U>(reducer: Reducer<T, U>, initValue: U | undefined): U {
        let accumulator: U | undefined = initValue;
        for (let i = 0; i < this.length; i++) {
            accumulator = reducer(accumulator, this.data[i], i, this.toArray());
        }
        return accumulator as U;
    }
}

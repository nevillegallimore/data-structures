export class StaticArray<T = any> {
    private data: Array<T>;
    private length: number;

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

    find(predicate: (value: T, index: number, array: StaticArray<T>) => boolean): T | undefined {
        for (let i = 0; i < this.length; i++) {
            if (predicate(this.data[i], i, this)) return this.data[i];
        }
    }

    findIndex(predicate: (value: T, index: number, array: StaticArray<T>) => boolean): number {
        for (let i = 0; i < this.length; i++) {
            if (predicate(this.data[i], i, this)) return i;
        }
        return -1;
    }

    some(predicate: (value: T, index: number, array: StaticArray<T>) => boolean): boolean {
        for (let i = 0; i < this.length; i++) {
            if (predicate(this.data[i], i, this)) return true;
        }
        return false;
    }

    every(predicate: (value: T, index: number, array: StaticArray<T>) => boolean): boolean {
        for (let i = 0; i < this.length; i++) {
            if (!predicate(this.data[i], i, this)) return false;
        }
        return true;
    }

    forEach(callbackFn: (value: T, index: number, array: StaticArray<T>) => void): void {
        for (let i = 0; i < this.length; i++) {
            callbackFn(this.data[i], i, this);
        }
    }

    map<U>(callbackFn: (value: T, index: number, array: StaticArray<T>) => U): StaticArray<U> {
        let result: StaticArray<U> = new StaticArray<U>(this.length);
        for (let i = 0; i < this.length; i++) {
            result.set(i, callbackFn(this.data[i], i, this));
        }
        return result;
    }

    filter(predicate: (value: T, index: number, array: StaticArray<T>) => boolean): StaticArray<T> {
        let array: Array<T> = [];
        for (let i = 0; i < this.length; i++) {
            if (predicate(this.data[i], i, this)) {
                array.push(this.data[i]);
            }
        }
        return StaticArray.fromArray(array);
    }

    reduce<U>(
        callbackFn: (accumulator: U, value: T, index: number, array: StaticArray<T>) => U,
        initValue: U,
    ): U {
        let accumulator = initValue;
        for (let i = 0; i < this.length; i++) {
            accumulator = callbackFn(accumulator, this.data[i], i, this);
        }
        return accumulator;
    }
}

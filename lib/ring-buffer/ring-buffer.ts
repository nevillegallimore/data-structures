import { StaticArray } from '../static-array/static-array.js';

export class RingBuffer<T = any> {
    private data: StaticArray<T>;
    private head: number;
    private tail: number;
    private isFull: boolean;
    public readonly capacity: number;

    constructor(capacity: number) {
        this.isFull = false;
        this.capacity = capacity;
        this.data = new StaticArray<T>(this.capacity);
        this.head = Math.floor(this.capacity / 3);
        this.tail = this.head;
    }

    static fromArray<T = any>(values: Array<T>, capacity?: number): RingBuffer<T> {
        const buffer: RingBuffer<T> = new RingBuffer<T>(capacity || values.length);
        for (let i = 0; i < values.length; i++) {
            buffer.push(values[i]);
        }
        return buffer;
    }

    public get length(): number {
        return this.head === this.tail
            ? this.isFull ? this.capacity : 0
            : this.head <= this.tail
            ? this.tail - this.head
            : (this.capacity - this.head) + this.tail;
    }

    public toArray(): Array<T> {
        const array: Array<T> = new Array<T>(this.length);
        for (let i = 0; i < this.length; i++) {
            const idx: number = (this.head + i) % this.capacity;
            array[i] = this.data.get(idx) as T;
        }
        return array;
    }

    public push(value: T): void {
        this.guardCapacity();
        this.data.set(this.tail, value);
        this.incrementTail();
    }

    public unshift(value: T): void {
        this.guardCapacity();
        this.decrementHead();
        this.data.set(this.head, value);
    }

    public pop(): T | undefined {
        if (this.length === 0) return undefined;
        this.decrementTail();
        return this.data.get(this.tail);
    }

    public shift(): T | undefined {
        if (this.length === 0) return undefined;
        const value: T | undefined = this.data.get(this.head);
        this.incrementHead();
        return value;
    }

    public flush(): Array<T> {
        const array: Array<T> = [];
        while (this.length > 0) {
            array.push(this.shift() as T);
        }
        return array;
    }

    private getNextIndex = (index: number): number => {
        return (index + 1) % this.capacity;
    };

    private getPrevIndex = (index: number): number => {
        return index === 0 ? this.capacity - 1 : index - 1;
    };

    private incrementTail = () => {
        this.tail = this.getNextIndex(this.tail);
        this.isFull = this.tail === this.head;
    };

    private decrementTail = () => {
        this.tail = this.getPrevIndex(this.tail);
        this.isFull = false;
    };

    private incrementHead = () => {
        this.head = this.getNextIndex(this.head);
        this.isFull = false;
    };

    private decrementHead = () => {
        this.head = this.getPrevIndex(this.head);
        this.isFull = this.head === this.tail;
    };

    private guardCapacity(): void {
        if (this.length + 1 > this.capacity) {
            throw new RangeError('Buffer Overflow: Attempted to add into RingBuffer at capacity');
        }
    }
}

import { LinkedList } from '../linked-list/linked-list.js';

export class Queue<T> {
    private list: LinkedList<T>;

    constructor() {
        this.list = new LinkedList<T>();
    }

    static fromArray<T>(values: Array<T>): Queue<T> {
        const queue: Queue<T> = new Queue<T>();
        for (let i = 0; i < values.length; i++) {
            queue.enqueue(values[i]);
        }
        return queue;
    }

    public get length(): number {
        return this.list.length;
    }

    public toArray(): Array<T> {
        return this.list.toArray();
    }

    public peek(): T | undefined {
        return this.list.get(0);
    }

    public dequeue(): T | undefined {
        return this.list.removeHead();
    }

    public enqueue(value: T): void {
        this.list.insertTail(value);
    }
}
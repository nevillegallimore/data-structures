import { LinkedList } from '../linked-list/linked-list.js';

export class Stack<T> {
    private list: LinkedList<T>;

    constructor() {
        this.list = new LinkedList<T>();
    }

    static fromArray<T>(values: Array<T>): Stack<T> {
        const stack: Stack<T> = new Stack<T>();
        for (let i = 0; i < values.length; i++) {
            stack.push(values[i]);
        }
        return stack;
    }

    public get length(): number {
        return this.list.length;
    }

    public toArray(): Array<T> {
        return this.list.toArray();
    }

    public peek(): T | undefined {
        return this.list.get(this.list.length - 1);
    }

    public pop(): T | undefined {
        return this.list.removeTail();
    }

    public push(value: T): void {
        this.list.insertTail(value);
    }
}
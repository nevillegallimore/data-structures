import { Comparer, Iterator, Predicate, Reducer, Transformer } from "../types.js";
import { defaultComparer } from "../utils.js";

export interface Node<T> {
    value: T;
    prev?: Node<T>;
    next?: Node<T>;
}

export class LinkedList<T = any> {
    private head?: Node<T>;
    private tail?: Node<T>;
    public length: number;

    constructor() {
        this.length = 0;
    }

    static fromArray<T>(values: Array<T>): LinkedList<T> {
        const list: LinkedList<T> = new LinkedList<T>();
        for (let i = 0; i < values.length; i++) {
            list.insertTail(values[i]);
        }
        return list;
    }

    toArray(): Array<T> {
        let array: Array<T> = [];
        let node: Node<T> | undefined = this.head;
        while (node) {
            array.push(node.value);
            node = node.next;
        }
        return array;
    }

    toReversedArray(): Array<T> {
        let array: Array<T> = [];
        let node: Node<T> | undefined = this.tail;
        while (node) {
            array.push(node.value);
            node = node.prev;
        }
        return array;
    }

    get(index: number): T | undefined {
        if (!this.head || index < 0 || index >= this.length) return undefined;

        let counter: number = 0;
        let node: Node<T> = this.head as Node<T>;
        while (counter < index) {
            node = node.next as Node<T>;
            counter += 1;
        }

        return node.value;
    }

    set(index: number, value: T): void {
        if (!this.head || index < 0 || index >= this.length) return;

        let counter: number = 0;
        let node: Node<T> = this.head as Node<T>;
        while (counter < index) {
            node = node.next as Node<T>;
            counter += 1;
        }

        node.value = value;
    }

    has(value: T): boolean {
        let node: Node<T> | undefined = this.head;
        while (node) {
            if (node.value === value) return true;
            node = node.next;
        }

        return false;
    }

    insertHead(value: T): void {
        const node: Node<T> = { value };
        this.length += 1;

        if (!this.head) {
            this.head = node;
            this.tail = node;
            return;
        }

        this.head.prev = node;
        node.next = this.head;
        this.head = node;
    }

    insertTail(value: T): void {
        const node: Node<T> = { value };
        this.length += 1;

        if (!this.tail) {
            this.head = node;
            this.tail = node;
            return;
        }

        this.tail.next = node;
        node.prev = this.tail;
        this.tail = node;
    }

    insert(index: number = this.length, value: T): void {
        if (index === 0) return this.insertHead(value);
        if (index === this.length) return this.insertTail(value);

        // Attempted to insert into list at invalid index
        if (index < 0 || index > this.length) return;

        let counter: number = 0;
        let prev: Node<T> = this.head as Node<T>;
        while (counter + 1 < index) {
            prev = prev.next as Node<T>;
            counter += 1;
        }

        const curr: Node<T> = { value };
        this.length += 1;
        curr.next = prev.next;
        curr.prev = prev;
        prev.next = curr;
    }

    removeHead(): T | undefined {
        if (!this.head) return undefined;

        const node: Node<T> = this.head;
        if (this.head === this.tail) {
            this.head = undefined;
            this.tail = undefined;
            this.length -= 1;
            return node.value;
        }

        this.head = node.next as Node<T>;
        this.head.prev = undefined;
        this.length -= 1;
        return node.value;
    }

    removeTail(): T | undefined {
        if (!this.tail) return undefined;

        const node: Node<T> = this.tail;
        if (this.tail === this.head) {
            this.head = undefined;
            this.tail = undefined;
            this.length -= 1;
            return node.value;
        }

        this.tail = node.prev as Node<T>;
        this.tail.next = undefined;
        this.length -= 1;
        return node.value;
    }

    remove(index: number): T | undefined {
        if (index === 0) return this.removeHead();
        if (index === this.length - 1) return this.removeTail();
        if (index < 0 || index >= this.length) return undefined;

        let node: Node<T> = this.head as Node<T>;
        let counter: number = 0;
        while (counter < index) {
            node = node.next as Node<T>;
            counter += 1;
        }

        const prev: Node<T> = node.prev as Node<T>;
        const next: Node<T> = node.next as Node<T>;
        prev.next = next;
        next.prev = prev;
        this.length -= 1;

        return node.value;
    }

    find(predicate: Predicate<T>): T | undefined {
        let node: Node<T> | undefined = this.head;
        let index: number = 0;
        while (node) {
            if (predicate(node.value, index, this.toArray())) return node.value;
            node = node.next;
            index += 1;
        }

        return undefined;
    }

    findIndex(predicate: Predicate<T>): number {
        let node: Node<T> | undefined = this.head;
        let index: number = 0;
        while (node) {
            if (predicate(node.value, index, this.toArray())) return index;
            node = node.next;
            index += 1;
        }

        return -1;
    }

    some(predicate: Predicate<T>): boolean {
        let node: Node<T> | undefined = this.head;
        let index: number = 0;
        while (node) {
            if (predicate(node.value, index, this.toArray())) return true;
            node = node.next;
            index += 1;
        }

        return false;
    }

    every(predicate: Predicate<T>): boolean {
        let node: Node<T> | undefined = this.head;
        let index: number = 0;
        while (node) {
            if (!predicate(node.value, index, this.toArray())) return false;
            node = node.next;
            index += 1;
        }

        return true;
    }

    filter(predicate: Predicate<T>): LinkedList<T> {
        const list: LinkedList<T> = new LinkedList<T>();
        let node: Node<T> | undefined = this.head;
        let index: number = 0;
        while (node) {
            if (predicate(node.value, index, this.toArray())) {
                list.insertTail(node.value);
            }
            node = node.next;
            index += 1;
        }
        return list;
    }

    forEach(iterator: Iterator<T>): void {
        const array: Array<T> = this.toArray();
        let node: Node<T> | undefined = this.head;
        let index: number = 0;
        while (node) {
            iterator(node.value, index, array);
            node = node.next;
            index += 1;
        }
    }

    map<U>(transformer: Transformer<T, U>): LinkedList<U> {
        const array = this.toArray();
        const list: LinkedList<U> = new LinkedList<U>();
        let node: Node<T> | undefined = this.head;
        let index: number = 0;
        while (node) {
            list.insertTail(transformer(node.value, index, array));
            node = node.next;
            index += 1;
        }
        return list;
    }

    reduce<U>(reducer: Reducer<T, U>, initValue: U | undefined): U {
        let accumulator: U | undefined = initValue;

        const array: Array<T> = this.toArray();
        let node: Node<T> | undefined = this.head;
        let index: number = 0;
        while (node) {
            accumulator = reducer(accumulator, node.value, index, array);
            node = node.next;
            index += 1;
        }

        return accumulator as U;
    }

    sort(comparer: Comparer<T> = defaultComparer): void {
        if (this.length < 2) return;

        let lidx: number;
        let ridx: number = this.length - 1;
        let lhs: Node<T>;
        let rhs: Node<T>;

        while (ridx > 0) {
            lidx = 0;
            while (lidx < ridx) {
                // @ts-ignore next line
                lhs = lidx === 0 ? this.head as Node<T> : lhs.next as Node<T>;
                rhs = lhs.next as Node<T>;

                if (comparer(lhs.value, rhs.value) > 0) {
                    if (this.head === lhs) {
                        this.head = rhs;
                        rhs.prev = undefined;
                        lhs.prev = rhs;
                        lhs.next = rhs.next;
                        rhs.next = lhs;
                    } else {
                        const prev: Node<T> = lhs.prev as Node<T>;
                        prev.next = rhs;
                        rhs.prev = prev;
                        lhs.prev = rhs;
                        lhs.next = rhs.next;
                        rhs.next = lhs;
                    }

                    if (lhs.next) {
                        lhs.next.prev = lhs;
                    }

                    if (this.tail === rhs) {
                        this.tail = lhs;
                    }

                    lhs = rhs;
                }
                lidx += 1;
            }

            ridx -= 1;
        }
    }

    sorted(comparer: Comparer<T> = defaultComparer): LinkedList<T> {
        const list: LinkedList<T> = LinkedList.fromArray<T>(this.toArray());
        list.sort(comparer);
        return list;
    }
}

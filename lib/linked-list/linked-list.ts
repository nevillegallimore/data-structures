export interface Node<T> {
    value: T;
    prev?: Node<T>;
    next?: Node<T>;
}

export class LinkedList<T> {
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
        if (!this.head || index < 0 || index >= this.length) return undefined;

        let counter: number = 0;
        let node: Node<T> = this.head as Node<T>;
        while (counter < index) {
            node = node.next as Node<T>;
            counter += 1;
        }

        node.value = value;
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
}

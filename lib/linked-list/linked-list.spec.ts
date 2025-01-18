import { assert, describe, it } from 'vitest';
import { LinkedList } from './linked-list.ts';

describe(`LinkedList<T>`, () => {
    it(`should instantiate LinkedList`, () => {
        const list: LinkedList<number> = new LinkedList<number>();
        assert.isTrue(list instanceof LinkedList);
    });

    it(`should instantiate LinkedList from array`, () => {
        const list: LinkedList<number> = LinkedList.fromArray([1, 2, 3]);
        assert.isTrue(list instanceof LinkedList);
    });

    it(`should return length as expected`, () => {
        const list: LinkedList<number> = new LinkedList<number>();
        assert.deepEqual(list.length, 0);

        list.append(1);
        assert.deepEqual(list.length, 1);

        list.append(2);
        assert.deepEqual(list.length, 2);

        list.append(3);
        assert.deepEqual(list.length, 3);
    });

    describe(`toArray(): Array<T>`, () => {
        it(`should return linked list items as array`, () => {
            const list: LinkedList<number> = LinkedList.fromArray([1, 2, 3]);
            assert.deepEqual(list.toArray(), [1, 2, 3]);
        });
    });

    describe(`get(index: number): T | undefined`, () => {
        it(`should return value given valid index`, () => {
            const list: LinkedList<number> = LinkedList.fromArray([1, 2, 3]);
            assert.deepEqual(list.get(0), 1);
            assert.deepEqual(list.get(1), 2);
            assert.deepEqual(list.get(2), 3);
        });

        it(`should return undefined given invalid index`, () => {
            const list: LinkedList<number> = LinkedList.fromArray([1, 2, 3]);
            assert.isUndefined(list.get(-1));
            assert.isUndefined(list.get(3));
        });

        it(`should return undefined given empty list`, () => {
            const list: LinkedList<number> = new LinkedList<number>();
            assert.isUndefined(list.get(0));
        });
    });

    describe(`set(index: number, value: T): void`, () => {
        it(`should set value of item given valid index`, () => {
            const list: LinkedList<number> = LinkedList.fromArray([1, 2, 3]);
            assert.deepEqual(list.get(1), 2);
            list.set(1, 1337);
            assert.deepEqual(list.get(1), 1337);
        });

        it(`should noop for invalid index`, () => {
            const list: LinkedList<number> = LinkedList.fromArray([1, 2, 3]);
            assert.isUndefined(list.get(3));
            list.set(3, 1337);
            assert.isUndefined(list.get(3));
        });
    });

    describe(`prepend(value: T): void`, () => {
        it(`should prepend item to list`, () => {
            const list: LinkedList<number> = LinkedList.fromArray([1, 2, 3]);
            assert.deepEqual(list.length, 3);
            assert.deepEqual(list.get(0), 1);

            list.prepend(0);
            assert.deepEqual(list.length, 4);
            assert.deepEqual(list.get(0), 0);
        });

        it(`should initialize list given empty list`, () => {
            const list: LinkedList<number> = new LinkedList<number>();
            assert.deepEqual(list.length, 0);

            list.prepend(1);
            assert.deepEqual(list.length, 1);
            assert.deepEqual(list.get(0), 1);
        });
    });

    describe(`append(value: T): void`, () => {
        it(`should append item to list`, () => {
            const list: LinkedList<number> = LinkedList.fromArray([1, 2, 3]);
            assert.deepEqual(list.length, 3);
            assert.deepEqual(list.get(list.length - 1), 3);

            list.append(4);
            assert.deepEqual(list.length, 4);
            assert.deepEqual(list.get(list.length - 1), 4);
        });

        it(`should initialize list given empty list`, () => {
            const list: LinkedList<number> = new LinkedList<number>();
            assert.deepEqual(list.length, 0);

            list.append(1);
            assert.deepEqual(list.length, 1);
            assert.deepEqual(list.get(0), 1);
        });
    });

    describe(`insert(index: number, value: T): void`, () => {
        it(`should prepend item given index === 0`, () => {
            const list: LinkedList<number> = LinkedList.fromArray([1, 2, 3]);
            assert.deepEqual(list.length, 3);
            assert.deepEqual(list.get(0), 1);

            list.insert(0, 0);
            assert.deepEqual(list.length, 4);
            assert.deepEqual(list.get(0), 0);
        });

        it(`should append item given index === length`, () => {
            const list: LinkedList<number> = LinkedList.fromArray([1, 2, 3]);
            assert.deepEqual(list.length, 3);
            assert.deepEqual(list.get(list.length - 1), 3);

            list.insert(list.length, 4);
            assert.deepEqual(list.length, 4);
            assert.deepEqual(list.get(list.length - 1), 4);
        });

        it(`should insert item between items with index - 1 and index given valid index`, () => {
            const list: LinkedList<number> = LinkedList.fromArray([1, 2, 3]);
            assert.deepEqual(list.length, 3);
            assert.deepEqual(list.get(1), 2);
            assert.deepEqual(list.get(2), 3);

            list.insert(2, 1337);
            assert.deepEqual(list.length, 4);
            assert.deepEqual(list.get(1), 2);
            assert.deepEqual(list.get(2), 1337);
            assert.deepEqual(list.get(3), 3);
        });

        it(`should noop given invalid index`, () => {
            const list: LinkedList<number> = LinkedList.fromArray([1, 2, 3]);
            assert.deepEqual(list.length, 3);

            list.insert(-1, 1337);
            assert.deepEqual(list.length, 3);

            list.insert(list.length + 1, 1337);
            assert.deepEqual(list.length, 3);
        });
    });
});

import { assert, describe, it } from 'vitest';
import { Queue } from './queue.ts';

describe(`Queue<T>`, () => {
    it(`should instantiate Queue`, () => {
        const queue: Queue<number> = new Queue<number>();
        assert.isTrue(queue instanceof Queue);
    });

    it(`should instantiate Queue from array`, () => {
        const queue: Queue<number> = Queue.fromArray([1, 2, 3]);
        assert.isTrue(queue instanceof Queue);
        assert.deepEqual(queue.toArray(), [1, 2, 3]);
    });

    it(`should return appropriate length`, () => {
        const queue: Queue<number> = new Queue<number>();
        assert.deepEqual(queue.length, 0);
        queue.enqueue(1);
        assert.deepEqual(queue.length, 1);
        queue.enqueue(2);
        assert.deepEqual(queue.length, 2);
        queue.enqueue(3);
        assert.deepEqual(queue.length, 3);
    });

    describe(`toArray(): Array<T>`, () => {
        it(`should return queue as an array`, () => {
            const queue: Queue<number> = Queue.fromArray([1, 2, 3]);
            const result: Array<number> = queue.toArray();
            assert.isTrue(Array.isArray(result));
            assert.deepEqual(result, [1, 2, 3]);
        });

        it(`should return empty array given empty stck`, () => {
            const queue: Queue<number> = new Queue<number>();
            assert.deepEqual(queue.length, 0);
            const result: Array<number> = queue.toArray();
            assert.deepEqual(result.length, 0);
        });
    });

    describe(`peek(): T | undefined`, () => {
        it(`should return top-most element of the queue`, () => {
            const queue: Queue<number> = Queue.fromArray<number>([1, 2, 3]);
            assert.deepEqual(queue.peek(), 1);
            queue.dequeue();
            assert.deepEqual(queue.peek(), 2);
            queue.dequeue();
            assert.deepEqual(queue.peek(), 3);
        });

        it(`should not modify the queue`, () => {
            const queue: Queue<number> = Queue.fromArray<number>([1, 2, 3]);
            assert.deepEqual(queue.length, 3);
            assert.deepEqual(queue.peek(), 1);
            assert.deepEqual(queue.length, 3);
            assert.deepEqual(queue.peek(), 1);
        });

        it(`should return undefined given empty queue`, () => {
            const queue: Queue<number> = new Queue<number>();
            assert.deepEqual(queue.length, 0);
            assert.isUndefined(queue.peek());
        });
    });

    describe(`dequeue(): T | undefined`, () => {
        it(`should return and remove first element of the queue`, () => {
            const queue: Queue<number> = Queue.fromArray<number>([1, 2, 3]);
            assert.deepEqual(queue.length, 3);
            assert.deepEqual(queue.dequeue(), 1);
            assert.deepEqual(queue.length, 2);
            assert.deepEqual(queue.dequeue(), 2);
            assert.deepEqual(queue.length, 1);
            assert.deepEqual(queue.dequeue(), 3);
            assert.deepEqual(queue.length, 0);
        });

        it(`should return undefined given empty queue`, () => {
            const queue: Queue<number> = new Queue<number>();
            assert.deepEqual(queue.length, 0);
            assert.isUndefined(queue.dequeue());
        });
    });

    describe(`push(value: T): void`, () => {
        it(`should add value as last item to the queue`, () => {
            const queue: Queue<number> = new Queue<number>();
            assert.deepEqual(queue.length, 0);
            queue.enqueue(1337);
            assert.deepEqual(queue.length, 1);
            assert.deepEqual(queue.peek(), 1337);
            queue.enqueue(1338);
            assert.deepEqual(queue.length, 2);
            assert.deepEqual(queue.peek(), 1337);
        });
    });
});

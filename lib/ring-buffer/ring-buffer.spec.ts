import { assert, describe, it } from 'vitest';
import { RingBuffer } from './ring-buffer.ts';

describe(`RingBuffer<T>`, () => {
    it(`should instantiate RingBuffer<T>`, () => {
        const buffer: RingBuffer<number> = new RingBuffer<number>(10);
        assert.isTrue(buffer instanceof RingBuffer);
    });

    it(`should return expected length`, () => {
        const buffer: RingBuffer<number> = new RingBuffer<number>(10);
        assert.deepEqual(buffer.length, 0);
    });

    it(`should return expected capacity`, () => {
        const buffer: RingBuffer<number> = new RingBuffer<number>(10);
        assert.deepEqual(buffer.capacity, 10);
    });

    describe(`fromArray(value: Array<T>): RingBuffer<T>`, () => {
        it(`should instantiate RingBuffer<T> based on provided Array<T> with length of the provided array`, () => {
            const buffer: RingBuffer<number> = RingBuffer.fromArray<number>([1, 2, 3, 4, 5]);
            assert.isTrue(buffer instanceof RingBuffer);
            assert.deepEqual(buffer.length, 5);
            assert.deepEqual(buffer.capacity, 5);
        });

        it(`should instantiate RingBuffer<T> based on provided Array<T> with provided length`, () => {
            const buffer: RingBuffer<number> = RingBuffer.fromArray<number>([1, 2, 3, 4, 5], 10);
            assert.isTrue(buffer instanceof RingBuffer);
            assert.deepEqual(buffer.length, 5);
            assert.deepEqual(buffer.capacity, 10);
        });
    });

    describe(`toArray(): Array<T>`, () => {
        it(`should return ring buffer as Array<T>`, () => {
            const buffer: RingBuffer<number> = RingBuffer.fromArray([1, 2, 3]);
            assert.deepEqual(buffer.toArray(), [1, 2, 3]);
        });

        it(`should return empty array given empty ring buffer`, () => {
            const buffer: RingBuffer<number> = new RingBuffer<number>(10);
            assert.deepEqual(buffer.toArray(), []);
        });
    });

    describe(`push(value: T): void`, () => {
        it(`should add item with provided value to the end of the buffer`, () => {
            const buffer: RingBuffer<number> = new RingBuffer<number>(10);
            assert.deepEqual(buffer.length, 0);

            buffer.push(1);
            assert.deepEqual(buffer.length, 1);
            assert.deepEqual(buffer.toArray(), [1]);

            buffer.push(2);
            assert.deepEqual(buffer.length, 2);
            assert.deepEqual(buffer.toArray(), [1, 2]);

            buffer.push(3);
            assert.deepEqual(buffer.length, 3);
            assert.deepEqual(buffer.toArray(), [1, 2, 3]);
        });

        it(`should throw range error given buffer at capacity`, () => {
            const buffer: RingBuffer<number> = RingBuffer.fromArray([1, 2, 3]);
            assert.deepEqual(buffer.length, 3);
            assert.deepEqual(buffer.capacity, 3);
            assert.throws(() => {
                    buffer.push(4);
                },
                RangeError,
                `Buffer Overflow: Attempted to add into RingBuffer at capacity`,
            );
        });
    });

    describe(`unshift(value: T): void`, () => {
        it(`should add item with provided value to the end of the buffer`, () => {
            const buffer: RingBuffer<number> = new RingBuffer<number>(10);
            assert.deepEqual(buffer.length, 0);

            buffer.unshift(1);
            assert.deepEqual(buffer.length, 1);
            assert.deepEqual(buffer.toArray(), [1]);

            buffer.unshift(2);
            assert.deepEqual(buffer.length, 2);
            assert.deepEqual(buffer.toArray(), [2, 1]);

            buffer.unshift(3);
            assert.deepEqual(buffer.length, 3);
            assert.deepEqual(buffer.toArray(), [3, 2, 1]);
        });

        it(`should throw overflow error given buffer at capacity`, () => {
            const buffer: RingBuffer<number> = RingBuffer.fromArray([1, 2, 3]);
            assert.deepEqual(buffer.length, 3);
            assert.deepEqual(buffer.capacity, 3);
            assert.throws(() => {
                    buffer.unshift(4);
                },
                RangeError,
                `Buffer Overflow: Attempted to add into RingBuffer at capacity`,
            );
        });
    });

    describe(`pop(): T | undefined`, () => {
        it(`should return and remove last value of the buffer`, () => {
            const buffer: RingBuffer<number> = RingBuffer.fromArray([1, 2, 3]);
            assert.deepEqual(buffer.length, 3);
            assert.deepEqual(buffer.pop(), 3);

            assert.deepEqual(buffer.length, 2);
            assert.deepEqual(buffer.pop(), 2);

            assert.deepEqual(buffer.length, 1);
            assert.deepEqual(buffer.pop(), 1);
        });

        it(`should return undefined given empty buffer`, () => {
            const buffer: RingBuffer<number> = new RingBuffer<number>(10);
            assert.deepEqual(buffer.length, 0);
            assert.isUndefined(buffer.pop());
        });
    });

    describe(`shift(): T | undefined`, () => {
        it(`should return and remove first value of the buffer`, () => {
            const buffer: RingBuffer<number> = RingBuffer.fromArray([1, 2, 3]);
            assert.deepEqual(buffer.length, 3);
            assert.deepEqual(buffer.shift(), 1);

            assert.deepEqual(buffer.length, 2);
            assert.deepEqual(buffer.shift(), 2);

            assert.deepEqual(buffer.length, 1);
            assert.deepEqual(buffer.shift(), 3);
        });

        it(`should return undefined given empty buffer`, () => {
            const buffer: RingBuffer<number> = new RingBuffer<number>(10);
            assert.deepEqual(buffer.length, 0);
            assert.isUndefined(buffer.shift());
        });
    });

    describe(`flush(): Array<T>`, () => {
        it(`should return and remove all items currently in the buffer`, () => {
            const buffer: RingBuffer<number> = RingBuffer.fromArray([1, 2, 3]);
            assert.deepEqual(buffer.length, 3);
            assert.deepEqual(buffer.flush(), [1, 2, 3]);
            assert.deepEqual(buffer.length, 0);
        });

        it(`should return empty array given empty buffer`, () => {
            const buffer: RingBuffer<number> = new RingBuffer<number>(10);
            assert.deepEqual(buffer.length, 0);
            assert.deepEqual(buffer.flush(), []);
        });
    });
});
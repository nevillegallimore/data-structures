import { assert, describe, it } from 'vitest';
import { Stack } from './stack.ts';

describe(`Stack<T>`, () => {
    it(`should instantiate Stack`, () => {
        const stack: Stack<number> = new Stack<number>();
        assert.isTrue(stack instanceof Stack);
    });

    it(`should instantiate Stack from array`, () => {
        const stack: Stack<number> = Stack.fromArray([1, 2, 3]);
        assert.isTrue(stack instanceof Stack);
        assert.deepEqual(stack.toArray(), [1, 2, 3]);
    });

    it(`should return appropriate length`, () => {
        const stack: Stack<number> = new Stack<number>();
        assert.deepEqual(stack.length, 0);
        stack.push(1);
        assert.deepEqual(stack.length, 1);
        stack.push(2);
        assert.deepEqual(stack.length, 2);
        stack.push(3);
        assert.deepEqual(stack.length, 3);
    });

    describe(`toArray(): Array<T>`, () => {
        it(`should return stack as an array`, () => {
            const stack: Stack<number> = Stack.fromArray([1, 2, 3]);
            const result: Array<number> = stack.toArray();
            assert.isTrue(Array.isArray(result));
            assert.deepEqual(result, [1, 2, 3]);
        });

        it(`should return empty array given empty stck`, () => {
            const stack: Stack<number> = new Stack<number>();
            assert.deepEqual(stack.length, 0);
            const result: Array<number> = stack.toArray();
            assert.deepEqual(result.length, 0);
        });
    });

    describe(`peek(): T | undefined`, () => {
        it(`should return top-most element of the stack`, () => {
            const stack: Stack<number> = Stack.fromArray<number>([1, 2, 3]);
            assert.deepEqual(stack.peek(), 3);
            stack.pop();
            assert.deepEqual(stack.peek(), 2);
            stack.pop();
            assert.deepEqual(stack.peek(), 1);
        });

        it(`should not modify the stack`, () => {
            const stack: Stack<number> = Stack.fromArray<number>([1, 2, 3]);
            assert.deepEqual(stack.length, 3);
            assert.deepEqual(stack.peek(), 3);
            assert.deepEqual(stack.length, 3);
            assert.deepEqual(stack.peek(), 3);
        });

        it(`should return undefined given empty stack`, () => {
            const stack: Stack<number> = new Stack<number>();
            assert.deepEqual(stack.length, 0);
            assert.isUndefined(stack.peek());
        });
    });

    describe(`pop(): T | undefined`, () => {
        it(`should return and remove top-most element of the stack`, () => {
            const stack: Stack<number> = Stack.fromArray<number>([1, 2, 3]);
            assert.deepEqual(stack.length, 3);
            assert.deepEqual(stack.pop(), 3);
            assert.deepEqual(stack.length, 2);
            assert.deepEqual(stack.pop(), 2);
            assert.deepEqual(stack.length, 1);
            assert.deepEqual(stack.pop(), 1);
            assert.deepEqual(stack.length, 0);
        });

        it(`should return undefined given empty stack`, () => {
            const stack: Stack<number> = new Stack<number>();
            assert.deepEqual(stack.length, 0);
            assert.isUndefined(stack.pop());
        });
    });

    describe(`push(value: T): void`, () => {
        it(`should add value as top-most item to the stack`, () => {
            const stack: Stack<number> = new Stack<number>();
            assert.deepEqual(stack.length, 0);
            stack.push(1337);
            assert.deepEqual(stack.length, 1);
            assert.deepEqual(stack.peek(), 1337);
            stack.push(1338);
            assert.deepEqual(stack.length, 2);
            assert.deepEqual(stack.peek(), 1338);
        });
    });
});

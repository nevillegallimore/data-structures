import { assert, describe, it } from 'vitest';
import { StaticArray } from './static-array.ts';

describe('StaticArray<T>', () => {
    it(`should instantiate a StaticArray`, () => {
        const array: StaticArray<number> = new StaticArray<number>(3);
        assert.isTrue(array instanceof StaticArray);
    });

    it(`should instantiate a StaticArray from Array`, () => {
        const array: StaticArray<number> = StaticArray.fromArray([1, 2, 3]);
        assert.isTrue(array instanceof StaticArray);
    });

    describe(`get(index: number): T | undefined`, () => {
        it(`should return value given existing index with value`, () => {
            const array: StaticArray<number> = StaticArray.fromArray([1, 2, 3]);
            assert.equal(array.get(0), 1);
            assert.equal(array.get(1), 2);
            assert.equal(array.get(2), 3);
        });

        it(`should return undefined given existing index with no value`, () => {
            const array: StaticArray<number> = new StaticArray<number>(3);
            array.set(0, 1);
            array.set(1, 2);
            assert.equal(array.get(2), undefined);
        });

        it(`should return undefined given non-existing index`, () => {
            const array: StaticArray<number> = StaticArray.fromArray([1, 2, 3]);
            assert.equal(array.get(4), undefined);
        });
    });

    describe(`set(index: number, value: T): void`, () => {
        it(`should set value given existing index`, () => {
            const array: StaticArray<number> = StaticArray.fromArray([1, 2, 3]);
            array.set(0, 1337);
            assert.equal(array.get(0), 1337);
        });

        it(`should not set value given invalid index`, () => {
            const array: StaticArray<number> = StaticArray.fromArray([1, 2, 3]);
            array.set(-1, 1337);
            assert.equal(array.get(-1), undefined);

            array.set(4, 1337);
            assert.equal(array.get(4), undefined);
        });
    });

    describe(`has(value: T): boolean`, () => {
        it(`should return true given existing value`, () => {
            const array: StaticArray<number> = StaticArray.fromArray([1, 2, 3]);
            assert.isTrue(array.has(3));
        });

        it(`should return false given non-existing value`, () => {
            const array: StaticArray<number> = StaticArray.fromArray([1, 2, 3]);
            assert.isFalse(array.has(4));
        });
    });

    describe(`fill(value: T, start: number, end: number)`, () => {
        it(`should fill entire array if called without start and end`, () => {
            const array: StaticArray<number> = new StaticArray<number>(5);
            array.fill(69);
            assert.equal(array.get(0), 69);
            assert.equal(array.get(1), 69);
            assert.equal(array.get(2), 69);
            assert.equal(array.get(3), 69);
            assert.equal(array.get(4), 69);
        });

        it(`should fill array from starting index given start and no end`, () => {
            const array: StaticArray<number> = new StaticArray<number>(5);
            array.fill(69, 2);
            assert.equal(array.get(0), undefined);
            assert.equal(array.get(1), undefined);
            assert.equal(array.get(2), 69);
            assert.equal(array.get(3), 69);
            assert.equal(array.get(4), 69);
        });

        it(`should fill array from starting index to end index given start and end`, () => {
            const array: StaticArray<number> = new StaticArray<number>(5);
            array.fill(69, 2, 4);
            assert.equal(array.get(0), undefined);
            assert.equal(array.get(1), undefined);
            assert.equal(array.get(2), 69);
            assert.equal(array.get(3), 69);
            assert.equal(array.get(4), undefined);
        });

        it(`should fill array from start to ending index given undefined start index`, () => {
            const array: StaticArray<number> = new StaticArray<number>(5);
            array.fill(69, undefined, 4);
            assert.equal(array.get(0), 69);
            assert.equal(array.get(1), 69);
            assert.equal(array.get(2), 69);
            assert.equal(array.get(3), 69);
            assert.equal(array.get(4), undefined);
        });

        it(`should ignore end exceeding the length of the static array`, () => {
            const array: StaticArray<number> = new StaticArray<number>(5);
            array.fill(69, 2, 99);
            assert.equal(array.get(0), undefined);
            assert.equal(array.get(1), undefined);
            assert.equal(array.get(2), 69);
            assert.equal(array.get(3), 69);
            assert.equal(array.get(4), 69);
            assert.equal(array.get(5), undefined);
        });
    });
});

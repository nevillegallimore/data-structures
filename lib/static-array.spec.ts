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
            assert.deepEqual(array.get(0), 1);
            assert.deepEqual(array.get(1), 2);
            assert.deepEqual(array.get(2), 3);
        });

        it(`should return undefined given existing index with no value`, () => {
            const array: StaticArray<number> = new StaticArray<number>(3);
            array.set(0, 1);
            array.set(1, 2);
            assert.deepEqual(array.get(2), undefined);
        });

        it(`should return undefined given non-existing index`, () => {
            const array: StaticArray<number> = StaticArray.fromArray([1, 2, 3]);
            assert.deepEqual(array.get(4), undefined);
        });
    });

    describe(`set(index: number, value: T): void`, () => {
        it(`should set value given existing index`, () => {
            const array: StaticArray<number> = StaticArray.fromArray([1, 2, 3]);
            array.set(0, 1337);
            assert.deepEqual(array.get(0), 1337);
        });

        it(`should not set value given invalid index`, () => {
            const array: StaticArray<number> = StaticArray.fromArray([1, 2, 3]);
            array.set(-1, 1337);
            assert.deepEqual(array.get(-1), undefined);

            array.set(4, 1337);
            assert.deepEqual(array.get(4), undefined);
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
            assert.deepEqual(array.get(0), 69);
            assert.deepEqual(array.get(1), 69);
            assert.deepEqual(array.get(2), 69);
            assert.deepEqual(array.get(3), 69);
            assert.deepEqual(array.get(4), 69);
        });

        it(`should fill array from starting index given start and no end`, () => {
            const array: StaticArray<number> = new StaticArray<number>(5);
            array.fill(69, 2);
            assert.deepEqual(array.get(0), undefined);
            assert.deepEqual(array.get(1), undefined);
            assert.deepEqual(array.get(2), 69);
            assert.deepEqual(array.get(3), 69);
            assert.deepEqual(array.get(4), 69);
        });

        it(`should fill array from starting index to end index given start and end`, () => {
            const array: StaticArray<number> = new StaticArray<number>(5);
            array.fill(69, 2, 4);
            assert.deepEqual(array.get(0), undefined);
            assert.deepEqual(array.get(1), undefined);
            assert.deepEqual(array.get(2), 69);
            assert.deepEqual(array.get(3), 69);
            assert.deepEqual(array.get(4), undefined);
        });

        it(`should fill array from start to ending index given undefined start index`, () => {
            const array: StaticArray<number> = new StaticArray<number>(5);
            array.fill(69, undefined, 4);
            assert.deepEqual(array.get(0), 69);
            assert.deepEqual(array.get(1), 69);
            assert.deepEqual(array.get(2), 69);
            assert.deepEqual(array.get(3), 69);
            assert.deepEqual(array.get(4), undefined);
        });

        it(`should ignore end exceeding the length of the static array`, () => {
            const array: StaticArray<number> = new StaticArray<number>(5);
            array.fill(69, 2, 99);
            assert.deepEqual(array.get(0), undefined);
            assert.deepEqual(array.get(1), undefined);
            assert.deepEqual(array.get(2), 69);
            assert.deepEqual(array.get(3), 69);
            assert.deepEqual(array.get(4), 69);
            assert.deepEqual(array.get(5), undefined);
        });
    });

    describe(`find(predicate: Predicate<T>): T | undefined`, () => {
        it(`should return first instance of value given existing value`, () => {
            const array: StaticArray<number> = StaticArray.fromArray([1, 2, 3]);
            const result: number | undefined = array.find((value: number) => {
                return value === 2;
            });
            assert.isDefined(result);
            assert.deepEqual(result, 2);
        });

        it(`should return undefined for value given non-existing value`, () => {
            const array: StaticArray<number> = StaticArray.fromArray([1, 2, 3]);
            const result: number | undefined = array.find((value: number) => {
                return value === 4;
            });
            assert.isUndefined(result);
        });
    });

    describe(`findIndex(predicate: Predicate<T>): T | undefined`, () => {
        it(`should return index for value given existing value`, () => {
            const array: StaticArray<number> = StaticArray.fromArray([1, 2, 3]);
            const result: number | undefined = array.findIndex((value: number) => {
                return value === 2;
            });
            assert.deepEqual(result, 1);
        });

        it(`should return -1 for value given non-existing value`, () => {
            const array: StaticArray<number> = StaticArray.fromArray([1, 2, 3]);
            const result: number | undefined = array.findIndex((value: number) => {
                return value === 4;
            });
            assert.deepEqual(result, -1);
        });
    });

    describe(`some(predicate: Predicate<T>): boolean`, () => {
        it(`should return true given existing value`, () => {
            const array: StaticArray<number> = StaticArray.fromArray([1, 2, 3]);
            const result: boolean = array.some((value: number) => {
                return value === 2;
            });
            assert.isTrue(result);
        });

        it(`should return false given non-existing value`, () => {
            const array: StaticArray<number> = StaticArray.fromArray([1, 2, 3]);
            const result: boolean = array.some((value: number) => {
                return value === 4;
            });
            assert.isFalse(result);
        });
    });

    describe(`every(predicate: Predicate<T>): boolean`, () => {
        it(`should return true given all values satisfy predicate`, () => {
            const array: StaticArray<number> = StaticArray.fromArray([1, 2, 3]);
            const result: boolean = array.every((value: number) => {
                return value < 4;
            });
            assert.isTrue(result);
        });

        it(`should return true given one or more values don't satisfy predicate`, () => {
            const array: StaticArray<number> = StaticArray.fromArray([1, 2, 3]);
            const result: boolean = array.every((value: number) => {
                return value < 3;
            });
            assert.isFalse(result);
        });
    });

    describe(`forEach(callbackFn: IteratorCallback<T>): void`, () => {
        it(`should call callbackFn with value, index and array for each value`, () => {
            const values: number[] = [];
            const indices: number[] = [];
            const arrays: any[] = [];

            const array: StaticArray<number> = StaticArray.fromArray([1, 2, 3]);
            array.forEach((value: number, index: number, staticArray: StaticArray<number>) => {
                values.push(value);
                indices.push(index);
                arrays.push(staticArray);
            });

            for (let i = 0; i < 3; i++) {
                assert.deepEqual(values[i], i + 1);
                assert.deepEqual(indices[i], i);
                assert.isTrue(arrays[i] instanceof StaticArray);
            }
        });
    });

    describe(`map<U>(callbackFn: IteratorCallback<T, U>): StaticArray<U>`, () => {
        it(`should map values as expected`, () => {
            const array: StaticArray<number> = StaticArray.fromArray([1, 2, 3]);
            const result: StaticArray<string | undefined> = array.map<string | undefined>((value: number) => {
                switch (value) {
                    case 1:
                        return 'One';
                    case 2:
                        return 'Two';
                    case 3:
                        return 'Three';
                    default:
                        return undefined;
                }
            });
            assert.isTrue(result instanceof StaticArray)
            assert.deepEqual(result.get(0), 'One');
            assert.deepEqual(result.get(1), 'Two');
            assert.deepEqual(result.get(2), 'Three');
        });
    });

    describe(`filter(predicate: Predicate<T>): StaticArray<T>`, () => {
        it(`should filter values as expected`, () => {
            const array: StaticArray<number> = StaticArray.fromArray([1, 2, 3, 4]);
            const result: StaticArray<number> = array.filter((value: number) => {
                return value % 2 === 0;
            });
            assert.isTrue(result instanceof StaticArray);
            assert.deepEqual(result.length, 2);
            assert.deepEqual(result.get(0), 2);
            assert.deepEqual(result.get(1), 4);
        });
    });

    describe(`reduce<U>(reducer: Reducer<U, T>, initValue: U): U`, () => {
        it(`should reduce values as expected`, () => {
            const array: StaticArray<number> = StaticArray.fromArray([1, 2, 3]);
            const result: number = array.reduce<number>((accumulator: number, value: number) => {
                return accumulator + value;
            }, 0);
            assert.deepEqual(result, 6);
        });
    });
});

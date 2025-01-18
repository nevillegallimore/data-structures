import { assert, describe, it } from 'vitest';
import { DynamicArray } from './dynamic-array.ts';

describe(`DynamicArray<T>`, () => {
    it(`should instantiate a DynamicArray`, () => {
        const array: DynamicArray<number> = new DynamicArray<number>();
        assert.isTrue(array instanceof DynamicArray);
    });

    it(`should instantiate a DynamicArray from Array`, () => {
        const array: DynamicArray<number> = DynamicArray.fromArray([1, 2, 3]);
        assert.isTrue(array instanceof DynamicArray);
    });

    it(`should return dynamic length`, () => {
        const array: DynamicArray<number> = new DynamicArray<number>();
        assert.deepEqual(array.length, 0);

        array.push(1);
        assert.deepEqual(array.length, 1);

        array.push(2);
        assert.deepEqual(array.length, 2);

        array.push(3);
        assert.deepEqual(array.length, 3);
    });

    describe(`get(index: number): T | undefined`, () => {
        it(`should return value given index with existing value`, () => {
            const array: DynamicArray<number> = DynamicArray.fromArray([1, 2, 3]);
            assert.deepEqual(array.get(0), 1);
            assert.deepEqual(array.get(1), 2);
            assert.deepEqual(array.get(2), 3);
        });

        it(`should return undefined given out of bounds index`, () => {
            const array: DynamicArray<number> = DynamicArray.fromArray([1, 2, 3]);
            assert.isUndefined(array.get(-1));
            assert.isUndefined(array.get(3));
        });
    });

    describe(`set(index: number): void`, () => {
        it('should set value given valid index (0 <= index < length', () => {
            const array: DynamicArray<number> = DynamicArray.fromArray([1, 2, 3]);
            assert.deepEqual(array.get(0), 1);

            array.set(0, 1337);
            assert.deepEqual(array.get(0), 1337);
        });

        it(`should not set value given invalid index`, () => {
            const array: DynamicArray<number> = DynamicArray.fromArray([1, 2, 3]);
            assert.isUndefined(array.get(-1));
            assert.isUndefined(array.get(3));

            array.set(-1, 1337);
            assert.isUndefined(array.get(-1));

            array.set(4, 1337);
            assert.isUndefined(array.get(3));
        });
    });

    describe('push(value: T): void', () => {
        it(`should append value to the end of the array`, () => {
            const array: DynamicArray<number> = DynamicArray.fromArray([1, 2, 3]);
            assert.deepEqual(array.length, 3);

            array.push(4);
            assert.deepEqual(array.length, 4);
            assert.deepEqual(array.get(3), 4);
        });
    });

    describe('unshift(value: T): void', () => {
        it(`should prepend value to the beginning of the array`, () => {
            const array: DynamicArray<number> = DynamicArray.fromArray([1, 2, 3]);
            assert.deepEqual(array.length, 3);
            assert.deepEqual(array.get(0), 1);

            array.unshift(0);
            assert.deepEqual(array.length, 4);
            assert.deepEqual(array.get(0), 0);
            assert.deepEqual(array.get(1), 1);
        });
    });

    describe('pop(): T | undefined', () => {
        it(`should return and remove the last item of the array`, () => {
            const array: DynamicArray<number> = DynamicArray.fromArray([1, 2, 3]);
            assert.deepEqual(array.length, 3);
            assert.deepEqual(array.get(array.length - 1), 3);

            const result: number | undefined = array.pop();
            assert.deepEqual(result, 3);

            assert.deepEqual(array.length, 2);
            assert.deepEqual(array.get(array.length - 1), 2);
        });

        it(`should return undefined given empty list`, () => {
            const array: DynamicArray<number> = new DynamicArray<number>();
            assert.deepEqual(array.length, 0);

            const result: number | undefined = array.pop();
            assert.isUndefined(result);

            assert.deepEqual(array.length, 0);
        });
    });

    describe('unshift(): T | undefined', () => {
        it(`should return and remove the first item of the array`, () => {
            const array: DynamicArray<number> = DynamicArray.fromArray([1, 2, 3]);
            assert.deepEqual(array.length, 3);
            assert.deepEqual(array.get(0), 1);

            const result: number | undefined = array.shift();
            assert.deepEqual(result, 1);

            assert.deepEqual(array.length, 2);
            assert.deepEqual(array.get(0), 2);
        });

        it(`should return undefined given empty list`, () => {
            const array: DynamicArray<number> = new DynamicArray<number>();
            assert.deepEqual(array.length, 0);

            const result: number | undefined = array.shift();
            assert.isUndefined(result);

            assert.deepEqual(array.length, 0);
        });
    });

    describe(`has(value: T): boolean`, () => {
        it(`should return true given existing value`, () => {
            const array: DynamicArray<number> = DynamicArray.fromArray([1, 2, 3]);
            assert.isTrue(array.has(3));
        });

        it(`should return false given non-existing value`, () => {
            const array: DynamicArray<number> = DynamicArray.fromArray([1, 2, 3]);
            assert.isFalse(array.has(4));
        });
    });

    describe(`fill(value: T, start: number, end: number): void`, () => {
        it(`should fill array up to length if called without start and end`, () => {
            const array: DynamicArray<number> = DynamicArray.fromArray([1, 2, 3]);
            array.fill(1337);
            assert.deepEqual(array.toArray(), [1337, 1337, 1337]);
        });

        it(`should fill array from start up to length if called without end`, () => {
            const array: DynamicArray<number> = DynamicArray.fromArray([1, 2, 3]);
            array.fill(1337, 1);
            assert.deepEqual(array.toArray(), [1, 1337, 1337]);
        });

        it(`should fill array up to end if called with undefined start and defined end`, () => {
            const array: DynamicArray<number> = DynamicArray.fromArray([1, 2, 3]);
            array.fill(1337, undefined, 1);
            assert.deepEqual(array.toArray(), [1337, 2, 3]);
        });

        it(`should ignore end and fill up to length if called with end greater or equal to length`, () => {
            const array: DynamicArray<number> = DynamicArray.fromArray([1, 2, 3]);
            array.fill(1337, 1, 4);
            assert.deepEqual(array.toArray(), [1, 1337, 1337]);
        });
    });

    describe(`find(predicate: Predicate<T>): T | undefined`, () => {
        it(`should return value of first item that satisfies predicate`, () => {
            const array: DynamicArray<number> = DynamicArray.fromArray([1, 2, 3]);
            const result: number | undefined = array.find((value: number): boolean => {
                return value === 2;
            });
            assert.isDefined(result);
            assert.deepEqual(result, 2);
        });

        it(`should return undefined if no item satisfies predicate`, () => {
            const array: DynamicArray<number> = DynamicArray.fromArray([1, 2, 3]);
            const result: number | undefined = array.find((value: number): boolean => {
                return value === 4;
            });
            assert.isUndefined(result);
        });
    });

    describe(`findIndex(predicate: Predicate<T>): number`, () => {
        it(`should return index of first item that satisfies predicate`, () => {
            const array: DynamicArray<number> = DynamicArray.fromArray([1, 2, 3]);
            const result: number = array.findIndex((value: number): boolean => {
                return value === 2;
            });
            assert.deepEqual(result, 1);
        });

        it(`should return -1 if no item satisfies predicate`, () => {
            const array: DynamicArray<number> = DynamicArray.fromArray([1, 2, 3]);
            const result: number = array.findIndex((value: number): boolean => {
                return value === 4;
            });
            assert.deepEqual(result, -1);
        });
    });

    describe(`some(predicate: Predicate<T>): boolean`, () => {
        it(`should return true if any item of the array satisfies predicate`, () => {
            const array: DynamicArray<number> = DynamicArray.fromArray([1, 2, 3]);
            const result: boolean = array.some((value: number) => {
                return value <= 2;
            });
            assert.isTrue(result);
        });

        it(`should return false if no item of the array satisfies predicate`, () => {
            const array: DynamicArray<number> = DynamicArray.fromArray([1, 2, 3]);
            const result: boolean = array.some((value: number) => {
                return value <= 0;
            });
            assert.isFalse(result);
        });
    });

    describe(`every(predicate: Predicate<T>): boolean`, () => {
        it(`should return true if every item of the array satisfies predicate`, () => {
            const array: DynamicArray<number> = DynamicArray.fromArray([1, 2, 3]);
            const result: boolean = array.every((value: number) => {
                return value <= 4;
            });
            assert.isTrue(result);
        });

        it(`should return false if no item of the array satisfies predicate`, () => {
            const array: DynamicArray<number> = DynamicArray.fromArray([1, 2, 3]);
            const result: boolean = array.every((value: number) => {
                return value <= 2;
            });
            assert.isFalse(result);
        });
    });

    describe(`forEach(iterator: Iterator<T>): void`, () => {
        it(`should call iterator for each item in the array with expected parameters`, () => {
            const values: number[] = [];
            const indices: number[] = [];
            const arrays: number[][] = [];

            const array: DynamicArray<number> = DynamicArray.fromArray([1, 2, 3]);
            array.forEach((value: number, index: number, array: number[]) => {
                values.push(value);
                indices.push(index);
                arrays.push(array);
            });

            for (let i = 0; i < array.length; i++) {
                assert.deepEqual(values[i], i + 1);
                assert.deepEqual(indices[i], i);
                assert.deepEqual(arrays[i], [1, 2, 3]);
            }
        });
    });

    describe(`map<U>(transformer: Transformer<T>): DynamicArray<U>`, () => {
        it(`should map values as expected`, () => {
            const array: DynamicArray<number> = DynamicArray.fromArray([1, 2, 3]);
            const result: DynamicArray<string | undefined> = array.map((value: number): string | undefined => {
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

            assert.isTrue(result instanceof DynamicArray);
            assert.deepEqual(result.get(0), 'One');
            assert.deepEqual(result.get(1), 'Two');
            assert.deepEqual(result.get(2), 'Three');
        });
    });

    describe(`filter(predicate: Predicate<T>): DynamicArray<T>`, () => {
        it(`should return array of items that satisfy predicate`, () => {
            const array: DynamicArray<number> = DynamicArray.fromArray([1, 2, 3, 4]);
            const result: DynamicArray<number> = array.filter((value: number): boolean => {
                return value % 2 === 0;
            });
            assert.isTrue(result instanceof DynamicArray);
            assert.deepEqual(result.length, 2);
            assert.deepEqual(result.get(0), 2);
            assert.deepEqual(result.get(1), 4);
        });
    });

    describe(`reducer<U>(reducer: Reducer<T, U>, initValue: U): U`, () => {
        it(`should reduce values as expected`, () => {
            const array: DynamicArray<number> = DynamicArray.fromArray([1, 2, 3]);
            const result: number = array.reduce<number>((accumulator: number | undefined, value: number) => {
                return accumulator ? accumulator + value : value;
            }, 0);
            assert.deepEqual(result, 6);
        });
    });
});

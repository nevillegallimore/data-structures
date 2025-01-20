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

        list.insertTail(1);
        assert.deepEqual(list.length, 1);

        list.insertTail(2);
        assert.deepEqual(list.length, 2);

        list.insertTail(3);
        assert.deepEqual(list.length, 3);
    });

    describe(`toArray(): Array<T>`, () => {
        it(`should return linked list items as array`, () => {
            const list: LinkedList<number> = LinkedList.fromArray([1, 2, 3]);
            assert.deepEqual(list.toArray(), [1, 2, 3]);
        });
    });

    describe(`toReversedArray(): Array<T>`, () => {
        it(`should return linked list items as array in reverse order`, () => {
            const list: LinkedList<number> = LinkedList.fromArray([1, 2, 3]);
            assert.deepEqual(list.toReversedArray(), [3, 2, 1]);
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

    describe(`has(value: T): boolean`, () => {
        it(`should return true given list contains node with value`, () => {
            const list: LinkedList<number> = LinkedList.fromArray([1, 2, 3]);
            assert.isTrue(list.has(1));
            assert.isTrue(list.has(2));
            assert.isTrue(list.has(3));
        });

        it(`should return false given list does not contain node with value`, () => {
            const list: LinkedList<number> = LinkedList.fromArray([1, 2, 3]);
            assert.isFalse(list.has(4));
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

    describe(`insertHead(value: T): void`, () => {
        it(`should prepend item to list`, () => {
            const list: LinkedList<number> = LinkedList.fromArray([1, 2, 3]);
            assert.deepEqual(list.length, 3);
            assert.deepEqual(list.get(0), 1);

            list.insertHead(0);
            assert.deepEqual(list.length, 4);
            assert.deepEqual(list.get(0), 0);
        });

        it(`should initialize list given empty list`, () => {
            const list: LinkedList<number> = new LinkedList<number>();
            assert.deepEqual(list.length, 0);

            list.insertHead(1);
            assert.deepEqual(list.length, 1);
            assert.deepEqual(list.get(0), 1);
        });
    });

    describe(`insertTail(value: T): void`, () => {
        it(`should append item to list`, () => {
            const list: LinkedList<number> = LinkedList.fromArray([1, 2, 3]);
            assert.deepEqual(list.length, 3);
            assert.deepEqual(list.get(list.length - 1), 3);

            list.insertTail(4);
            assert.deepEqual(list.length, 4);
            assert.deepEqual(list.get(list.length - 1), 4);
        });

        it(`should initialize list given empty list`, () => {
            const list: LinkedList<number> = new LinkedList<number>();
            assert.deepEqual(list.length, 0);

            list.insertTail(1);
            assert.deepEqual(list.length, 1);
            assert.deepEqual(list.get(0), 1);
        });
    });

    describe(`remove(index: number): T | undefined`, () => {
        it(`should remove and return item at index given valid index`, () => {
            const list: LinkedList<number> = LinkedList.fromArray([1, 2, 3]);
            assert.deepEqual(list.length, 3);

            let result: number | undefined;

            result = list.remove(1);
            assert.deepEqual(result, 2);
            assert.deepEqual(list.length, 2);

            result = list.remove(list.length - 1);
            assert.deepEqual(result, 3);
            assert.deepEqual(list.length, 1);

            result = list.remove(0);
            assert.deepEqual(result, 1);
            assert.deepEqual(list.length, 0);
        });

        it(`should return undefined given invalid index`, () => {
            const list: LinkedList<number> = LinkedList.fromArray([1, 2, 3]);
            assert.deepEqual(list.length, 3);

            assert.isUndefined(list.remove(-1));
            assert.deepEqual(list.length, 3);

            assert.isUndefined(list.remove(3));
            assert.deepEqual(list.length, 3);
        });
    });

    describe(`removeHead(): T | undefined`, () => {
        it(`should remove and return first item given non-empty list`, () => {
            const list: LinkedList<number> = LinkedList.fromArray([1, 2, 3]);
            assert.deepEqual(list.length, 3);

            let result: number | undefined;

            result = list.removeHead();
            assert.deepEqual(result, 1);
            assert.deepEqual(list.length, 2);

            result = list.removeHead();
            assert.deepEqual(result, 2);
            assert.deepEqual(list.length, 1);

            result = list.removeHead();
            assert.deepEqual(result, 3);
            assert.deepEqual(list.length, 0);
        });

        it(`should return undefined given empty list`, () => {
            const list: LinkedList<number> = new LinkedList<number>();
            assert.isUndefined(list.removeHead());
        });
    });

    describe(`removeTail(): T | undefined`, () => {
        it(`should remove and return last item given non-empty list`, () => {
            const list: LinkedList<number> = LinkedList.fromArray([1, 2, 3]);
            assert.deepEqual(list.length, 3);

            let result: number | undefined;

            result = list.removeTail();
            assert.deepEqual(result, 3);
            assert.deepEqual(list.length, 2);

            result = list.removeTail();
            assert.deepEqual(result, 2);
            assert.deepEqual(list.length, 1);

            result = list.removeTail();
            assert.deepEqual(result, 1);
            assert.deepEqual(list.length, 0);
        });

        it(`should return undefined given empty list`, () => {
            const list: LinkedList<number> = new LinkedList<number>();
            assert.isUndefined(list.removeTail());
        });
    });

    describe('find(predicate: Predicate<T>): T | undefined', () => {
        it('should return value of first node that satisfies predicate', () => {
            const list: LinkedList<number> = LinkedList.fromArray([1, 2, 3]);
            const result: number | undefined = list.find((value: number) => {
                return value === 2;
            });
            assert.isDefined(result);
            assert.deepEqual(result, 2);
        });

        it('should return undefined given no node satisfies predicate', () => {
            const list: LinkedList<number> = LinkedList.fromArray([1, 2, 3]);
            const result: number | undefined = list.find((value: number) => {
                return value === 4;
            });
            assert.isUndefined(result);
        });
    });

    describe('findIndex(predicate: Predicate<T>): number', () => {
        it('should return index of first node that satisfies predicate', () => {
            const list: LinkedList<number> = LinkedList.fromArray([1, 2, 3]);
            const result: number | undefined = list.findIndex((value: number) => {
                return value === 2;
            });
            assert.deepEqual(result, 1);
        });

        it('should return -1 given no node satisfies predicate', () => {
            const list: LinkedList<number> = LinkedList.fromArray([1, 2, 3]);
            const result: number | undefined = list.findIndex((value: number) => {
                return value === 4;
            });
            assert.deepEqual(result, -1);
        });
    });

    describe('some(predicate: Predicate<T>): boolean', () => {
        it(`should return true if any node's value satisfies predicate`, () => {
            const list: LinkedList<number> = LinkedList.fromArray([1, 2, 3]);
            const result: boolean = list.some((value: number) => {
                return value === 2;
            });
            assert.isTrue(result);
        });

        it(`should return false if no node's value satisfies predicate`, () => {
            const list: LinkedList<number> = LinkedList.fromArray([1, 2, 3]);
            const result: boolean = list.some((value: number) => {
                return value === 4;
            });
            assert.isFalse(result);
        });

        it(`should return false given empty list`, () => {
            const list: LinkedList<number> = new LinkedList<number>();
            assert.deepEqual(list.length, 0);
            assert.isFalse(list.some(() => { return true; }));

        })
    });

    describe('every(predicate: Predicate<T>): boolean', () => {
        it(`should return true if every node's value satisfies predicate`, () => {
            const list: LinkedList<number> = LinkedList.fromArray([1, 2, 3]);
            const result: boolean = list.every((value: number) => {
                return value < 4;
            });
            assert.isTrue(result);
        });

        it(`should return false if any node's value does not satisfy predicate`, () => {
            const list: LinkedList<number> = LinkedList.fromArray([1, 2, 3]);
            const result: boolean = list.every((value: number) => {
                return value < 3;
            });
            assert.isFalse(result);
        });

        it(`should return true given empty list`, () => {
            const list: LinkedList<number> = new LinkedList<number>();
            assert.deepEqual(list.length, 0);
            assert.isTrue(list.every(() => { return true; }));
        });
    });

    describe(`filter(predicate: Predicate<T>): LinkedList<T>`, () => {
        it(`should filter list as expected`, () => {
            const list: LinkedList<number> = LinkedList.fromArray([1, 2, 3, 4]);
            assert.deepEqual(list.length, 4);

            const result: LinkedList<number> = list.filter((value: number) => {
                return value % 2 === 0;
            });
            assert.deepEqual(result.length, 2);
            assert.deepEqual(result.get(0), 2);
            assert.deepEqual(result.get(1), 4);
        });
    });

    describe(`forEach(iterator: Iterator<T>): void`, () => {
        it(`should call iterator for each node in the list`, () => {
            const values: Array<number> = [];
            const indices: Array<number> = [];
            const arrays: Array<number[]> = [];

            const list: LinkedList<number> = LinkedList.fromArray([1, 2, 3]);
            list.forEach((value: number, index: number, array: number[]): void => {
                values.push(value);
                indices.push(index);
                arrays.push(array);
            });

            assert.deepEqual(values, [1, 2, 3]);
            assert.deepEqual(indices, [0, 1, 2]);
            assert.deepEqual(arrays, [[1, 2, 3], [1, 2, 3], [1, 2, 3]]);
        });
    });

    describe(`map<U>(transformer: Transformer<T, U>): LinkedList<U>`, () => {
        it(`should map list as expected`, () => {
            const list: LinkedList<number> = LinkedList.fromArray([1, 2, 3]);
            assert.deepEqual(list.length, 3);

            const result: LinkedList<string | undefined> = list.map<string | undefined>((value: number) => {
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
            assert.deepEqual(result.length, 3);
            assert.deepEqual(result.toArray(), ['One', 'Two', 'Three']);
        });
    });

    describe(`reduce(reducer: Reducer<T, U>, initValue: U): U`, () => {
        it(`should reduce as expected`, () => {
            const list: LinkedList<number> = LinkedList.fromArray([1, 2, 3]);
            const result: number = list.reduce<number>((accumulator: number | undefined, value: number) => {
                return accumulator ? accumulator + value : value;
            }, 0);
            assert.deepEqual(result, 6);
        });
    });
});

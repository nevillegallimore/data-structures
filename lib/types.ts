export type Iterator<T> = (value: T, index: number, array: Array<T>) => void;
export type Predicate<T> = (value: T, index: number, array: Array<T>) => boolean;
export type Reducer<T, U> = (accumulator: U, value: T, index: number, array: Array<T>) => U;
export type Transformer<T, U> = (value: T, index: number, array: Array<T>) => U;

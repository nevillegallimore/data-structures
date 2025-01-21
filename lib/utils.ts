export const defaultComparer = <T>(lhs: T, rhs: T) => {
    return lhs < rhs ? -1 : lhs > rhs ? +1 : 0;
};
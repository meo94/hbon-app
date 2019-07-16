/*
const key = 'a.b';
const obj = {
    a: {
        b: 1
    }
};
*/
export const getValueByDotKey = (obj, key) => {
    const value = key.split('.').reduce((a, b) => a[b], obj);
    return value ? value : null;
}
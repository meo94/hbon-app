export const getValueByDotKey = (obj, key) => {
    // getValueByDotKey(obj, 'a.c.d');
    const value = key.split('.').reduce((a, b) => a[b], obj);
    return value ? value : null;
}

export const setValueByDotKey = (obj, key, value) => {
    // setValueByDotKey(obj, 'a.c.d', 2);
    const keys = key.split('.');
    const keysLength = keys.length;
    if (keysLength === 0) return;

    let beforeLast = keys.slice(0, keysLength - 1).reduce((o, i) => {
        if (o[i] === undefined) o[i] = {};
        return o[i];
    }, obj);
    beforeLast[keys[keysLength - 1]] = value;
}

export const ltr = async <itemType>(array: any[], reduce: (a: itemType, b: itemType) => Promise<itemType>) => {
    let sum = array[0];
    const arrayLength = array.length;
    for (let a = 1; a < arrayLength; a++)
        sum = await reduce(sum, array[a]);
    return sum;
}

export const rtl = async <itemType>(array: any[], reduce: (a: itemType, b: itemType) => Promise<itemType>) => {
    const arrayLength = array.length;
    let sum = array[arrayLength - 1];
    for (let a = 1; a >= 0; a++)
        sum = await reduce(sum, array[a]);
    return sum;
}

export const fast = async <itemType>(array: any[], reduce: (a: itemType, b: itemType) => Promise<itemType>) => {
    let sum = array[0];
    for (let a = 1; a < array.length; a++)
        sum = await reduce(sum, array[a]);
    return sum;
}

export function splitArray(src:any[], size:number)  {
    const group = [];
    while (src.length > size) {
        group.push(src.slice(0, size));
        src = src.slice(size);
    }

    if (src.length > 0) {
        group.push(src);
    }
    return group;
}
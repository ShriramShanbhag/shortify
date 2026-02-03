const CHARSET =`0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ`;

const encode = (id) => {
    let num = BigInt(id);
    if(num === 0n) return CHARSET[0];

    let result = '';
    const base = 62n;

    while (num > 0n) {
        const remainder = num % base;
        result = CHARSET[Number(remainder)] + result;
        num = num / base;
    }

    return result;
}

const decode = (shortCode) => {
    let num = 0n;
    const base = 62n;

    for (let i = 0; i < shortCode.length; i++) {
        const char = shortCode[i];
        const index = BigInt(CHARSET.indexOf(char));
        num = num * base + index;
    }

    return num;
}

export { encode, decode };
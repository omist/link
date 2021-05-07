export const uuid = () =>
    "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c => {
        const num = parseInt(c);
        return (num ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> num / 4).toString(16)
    });
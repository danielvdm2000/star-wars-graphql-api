export function isEmptyObject(obj: unknown) {
    if (typeof obj !== "object" || obj === null) return false;
    return Object.values(obj).every(v => v == null)
}
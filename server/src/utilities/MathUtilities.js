export function clamp(num, min, max) {
    return Math.min(Math.max(num, min), max);
}

export function lerp(min, max, t) {
    return clamp(min + Math.abs(max - min) / t, min, max);
}
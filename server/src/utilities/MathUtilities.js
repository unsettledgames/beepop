export function clamp(num, min, max) {
    return Math.min(Math.max(num, min), max);
}

export function lerp(min, max, t) {
    return min * (1 - t) + max * t;
}
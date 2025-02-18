

export const minute = 6;
/**
 * @param  {number} nr
 * @param  {number} minimum
 * @param  {number} maximum
 */
export function numberInRange(nr, minimum, maximum=nr) {
    return Math.max(minimum, Math.min(nr, maximum));
}
/**
 * @param  {number} eventRate
 * @param  {number} dt
 * @param  {Object} obj
 * @param  {Function} fn
 */
export function doByChance(eventRate, dt, obj, fn) {
    const eventChance = dt/eventRate;
    if (Math.random() < eventChance) {
        fn.call(obj);
    }
}
/**
 * @param  {number} time
 */
export function secondsSince(time) {
    return (Date.now() - time) / 1000;
}
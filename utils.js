

export const minute = 60;
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
    const eventChance = eventRate * dt;
    if (Math.random() < eventChance) {
        fn.call(obj);
    }
}
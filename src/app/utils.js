/**
 * Get random value between two numbers
 * @param {Number} min
 * @param {Number} max
 * @returns {Number}
 */
export function getRandomNum(min, max) {
  return Math.random() * (max - min) + min;
}

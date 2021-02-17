/**
 * Get random value between two numbers
 * @param {Number} min
 * @param {Number} max
 * @returns {Number}
 */
export function getRandomNum(min, max) {
  return Math.random() * (max - min) + min;
}

/**
 * Make css classname selector from string
 * @param {String} name classname
 * @returns {String}
 */
export function makeCssClassNameSelector(name) {
  return `.${name}`;
}

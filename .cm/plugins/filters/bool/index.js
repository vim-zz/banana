/**
 * Boolean converter filter for gitStream
 *
 * Converts input to boolean true only if:
 * - Input is boolean true
 * - Input is string "true" (case insensitive, whitespace trimmed)
 *
 * All other cases return false
 *
 * @param {*} input - Any input value
 * @returns {boolean} - true only for true boolean or "true" string, false otherwise
 */
module.exports = function (input) {
  // If input is already boolean true
  if (input === true) {
    return true;
  }

  // If input is a string, trim whitespace and check if it's "true" (case insensitive)
  if (typeof input === "string") {
    const trimmed = input.trim().toLowerCase();
    return trimmed === "true";
  }

  // All other cases return false
  return false;
};

/**
 * Regular expression for validating names.
 * @type {RegExp}
 */
const REGEX_NAME = /^[A-Za-zÀ-ÿ-]{2,}$/g;

/**
 * Regular expression for validating email addresses.
 * @type {RegExp}
 */
const REGEX_EMAIL = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/g;

/**
 * Regular expression for validating zip codes.
 * @type {RegExp}
 */
const REGEX_ZIP = /^[0-9]{5}$/g;

/**
 * Regular expression for validating dates in the format DD/MM/YYYY.
 * @type {RegExp}
 */
const REGEX_DATE = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;

/**
 * Minimum age required to be considered a major.
 * @type {number}
 */
const AGE_MAJOR = 18;

/**
 * Checks if the provided name is valid.
 *
 * @param {string} name - The name to be validated.
 * @return {boolean} - True if the name is valid, false otherwise.
 */
export function isValidName(name) {
  return !!name.match(REGEX_NAME);
}

/**
 * Checks if the provided email address is valid.
 *
 * @param {string} email - The email address to be validated.
 * @return {boolean} - True if the email is valid, false otherwise.
 */
export function isValidEmail(email) {
  return !!email.match(REGEX_EMAIL);
}

/**
 * Checks if the provided zip code is valid.
 *
 * @param {string|number} code - The zip code to be validated.
 * @return {boolean} - True if the zip code is valid, false otherwise.
 */
export function isValidZipCode(code) {
  return !!code.toString().match(REGEX_ZIP);
}

/**
 * Checks if the provided date is valid.
 *
 * @param {string} date - The date to be validated (in DD/MM/YYYY format).
 * @return {boolean} - True if the date is valid, false otherwise.
 */
export function isValidDate(date) {
  return !!date.match(REGEX_DATE);
}

/**
 * Checks if the provided age is above the minimum age required to be considered a major.
 *
 * @param {string|number} age - The age to be validated.
 * @return {boolean} - True if the age is above the minimum age, false otherwise.
 */
export function isMajor(age) {
  return age >= AGE_MAJOR;
}

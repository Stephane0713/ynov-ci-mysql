/**
 * Calculate a person's age in years.
 *
 * @param {object} p An object representing a person with a bith property
 * @returns {number} The age of the person
 */

export function calculateAge(p) {
  if (p === undefined) throw new Error("Missing parameter p");
  if (typeof p !== "object") throw new Error("Wrong type for parameter p");
  if (p.birth === undefined)
    throw new Error("Parameter p is missing a birth property");

  if (p.birth === undefined)
    throw new Error("Parameter p is missing a birth property");
  if (!(p.birth instanceof Date))
    throw new Error("Birth property isn't a Date object");
  if (p.birth.toString() === "Invalid Date") throw new Error("Date is invalid");
  if (p.birth > Date.now())
    throw new Error("Date should't be greater than today");

  let dateDiff = new Date(Date.now() - p.birth.getTime());
  return Math.abs(dateDiff.getUTCFullYear() - 1970);
}

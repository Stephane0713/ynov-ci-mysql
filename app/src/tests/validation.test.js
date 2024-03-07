import {
  isMajor,
  isValidDate,
  isValidEmail,
  isValidName,
  isValidZipCode,
} from "../helpers/validation";

describe("Validation tests suite", () => {
  describe("Name validation tests suite", () => {
    const validNames = ["Stéphane", "Juliette", "Jean-Pascal"];
    test.each(validNames)(`should return true for %p`, (name) => {
      const result = isValidName(name);

      expect(result).toBe(true);
    });

    const invalidNames = ["23yoçava?", "a", "Allo Coucou"];
    test.each(invalidNames)(`should return false for %p`, (name) => {
      const result = isValidName(name);

      expect(result).toBe(false);
    });
  });

  describe("Email validation tests suite", () => {
    const validEmails = ["stephane@dupre.fr", "micka@fitness.com"];
    test.each(validEmails)(`should return true for %p`, (email) => {
      const result = isValidEmail(email);

      expect(result).toBe(true);
    });

    const invalidEmails = [
      "23yoçava?",
      "stéphane@dupré.fr",
      "step hane@dupre.fr",
    ];
    test.each(invalidEmails)(`should return false for %p`, (email) => {
      const result = isValidEmail(email);

      expect(result).toBe(false);
    });
  });

  describe("Zip Code validation tests suite", () => {
    const validZipCodes = ["06600", "01234"];
    test.each(validZipCodes)("should return true for %p", (code) => {
      const result = isValidZipCode(code);

      expect(result).toBe(true);
    });

    const invalidZipCodes = ["060600", "aaaaa"];
    test.each(invalidZipCodes)("should return false for %p", (code) => {
      const result = isValidZipCode(code);

      expect(result).toBe(false);
    });
  });

  describe("Date validation tests suite", () => {
    const validDates = ["01/01/2022", "15/07/2023", "31/12/2024"];
    test.each(validDates)("should return true for %p", (date) => {
      const result = isValidDate(date);

      expect(result).toBe(true);
    });

    const invalidDates = ["32/01/2022", "15/13/2023", "31-12-2024", "01/01/22"];
    test.each(invalidDates)("should return false for %p", (date) => {
      const result = isValidDate(date);

      expect(result).toBe(false);
    });
  });

  describe("isMajor validation tests suite", () => {
    test.each(["18", "20", 21])("should return true for %p", (age) => {
      const result = isMajor(age);

      expect(result).toBe(true);
    });

    test.each(["17", "-15", -21, 12])("should return false for %p", (age) => {
      const result = isMajor(age);

      expect(result).toBe(false);
    });
  });
});

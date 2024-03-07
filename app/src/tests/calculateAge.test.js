import { calculateAge } from "../helpers/calculateAge";

describe("calculeAge Unit Test Suites", () => {
  it("should return a correct age", () => {
    const date = new Date();
    date.setFullYear(date.getFullYear() - 32);

    const loise = {
      birth: date,
    };

    expect(calculateAge(loise)).toEqual(32);
  });

  it('should throw "Missing parameter p"', () => {
    expect(() => calculateAge()).toThrow("Missing parameter p");
  });

  it('should throw "Wrong type for parameter p"', () => {
    expect(() => calculateAge("person")).toThrow("Wrong type for parameter p");
  });

  it('should throw "Parameter p is missing a birth property"', () => {
    expect(() => calculateAge({})).toThrow(
      "Parameter p is missing a birth property"
    );
  });

  it('should throw "Birth property isn\' a Date object"', () => {
    const person = { birth: "05/22/1989" };
    expect(() => calculateAge(person)).toThrow(
      "Birth property isn't a Date object"
    );
  });

  it('should throw "Date is invalid"', () => {
    const person = { birth: new Date("15/15/1515") };
    expect(() => calculateAge(person)).toThrow("Date is invalid");
  });

  it('should throw "Date should\'t be greater than today"', () => {
    const date = new Date();
    date.setFullYear(date.getFullYear() + 1);

    const person = { birth: date };
    expect(() => calculateAge(person)).toThrow(
      "Date should't be greater than today"
    );
  });
});

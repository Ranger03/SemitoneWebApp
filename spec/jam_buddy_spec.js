const { error } = require("../src/helper_objects");
const { JamBuddy } = require("../src/jam_buddy");

describe("JamBuddy class", () => {
  const jamBuddy = new JamBuddy();

  describe("randomizeCurrentNotes method", () => {
    it("should set currentNotes with defined elements", () => {
      jamBuddy.randomizeCurrentNotes();
      expect(jamBuddy.currentNotes).toBeDefined();
    });

    it("should set currentNotes to an array with two random notes", () => {
      jamBuddy.randomizeCurrentNotes();
      expect(jamBuddy.currentNotes.length).toBe(2);
    });

    it("should set currentNotes to an array with two random notes that are not identical", () => {
      jamBuddy.randomizeCurrentNotes();
      expect(jamBuddy.currentNotes[0] !== jamBuddy.currentNotes[1]).toBe(true);
    });

    it("should set currentNotes to an array with two random notes that are valid notes", () => {
      jamBuddy.randomizeCurrentNotes();
      expect(
        jamBuddy.currentNotes.every((note) => JamBuddy.notes.includes(note))
      ).toBe(true);
    });
  });

  describe("setCurrentNotes method", () => {
    it("should set currentNotes to the provided array of two notes", () => {
      const notes = ["A", "B"];
      jamBuddy.setCurrentNotes(notes);
      expect(jamBuddy.currentNotes).toEqual(notes);
    });

    it("should throw an error if the array contains two identical notes", () => {
      expect(() => jamBuddy.setCurrentNotes(["A", "A"])).toThrowError(
        error.sameNotes
      );
    });

    it("should throw an error when the notes array contains one element", () => {
      expect(() => jamBuddy.setCurrentNotes(["A"])).toThrowError(
        error.twoStringNotes
      );
    });

    it("should throw an error when the array contains invalid notes", () => {
      expect(() => jamBuddy.setCurrentNotes(["AB", "C-sharp"])).toThrowError(
        error.invalidNotes
      );
    });

    it("should throw an error when the array contains elements that are not a string", () => {
      expect(() => jamBuddy.setCurrentNotes([1, 2])).toThrowError(
        error.invalidNotes
      );
    });
  });

  describe("getCurrentNotes method", () => {
    it("should return the currentNotes", () => {
      const notes = ["C", "Db"];
      jamBuddy.setCurrentNotes(notes);
      expect(jamBuddy.getCurrentNotes()).toEqual(notes);
    });
  });

  describe("checkAnswer method", () => {
    it("should throw an error if the input is not between 0 and 12 inclusively", () => {
      expect(() => jamBuddy.checkAnswer(-3)).toThrowError(error.invalidInput);
    });

    it("should throw an error if the input is not a number", () => {
      expect(() => jamBuddy.checkAnswer("three")).toThrowError(
        error.invalidDateType
      );
    });

    it("should return zero for notes occupying the same spot counting clockwise", () => {
      jamBuddy.currentNotes = ["A#", "Bb"];
      expect(jamBuddy.checkAnswer(0)).toBe(true);
    });

    it("should return twelfth for notes occupying the same spot counting anticlockwise", () => {
      jamBuddy.currentNotes = ["G#", "Ab"];
      expect(jamBuddy.checkAnswer(12)).toBe(true);
    });

    it("should return false if the guess is incorrect", () => {
      jamBuddy.currentNotes = ["C", "D"];
      expect(jamBuddy.checkAnswer(1)).toBe(false);
    });
  });
});


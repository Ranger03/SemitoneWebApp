const error = {
  sameNotes: "Invalid input. Please provide two different notes.",
  invalidNotes: "Invalid input. Please provide valid notes.",
  twoStringNotes:
    "Invalid input. Please provide an array with two string notes.",
  invalidInput:
  "Invalid input. Enter a number between 0-12 inclusively",
  invalidDateType: "Invalid input: Input must be a number."
};
const gameMessages = {
  gameWon : "You have chosen a correct answer. Well done!",
  wrongAnswer: (counter)=> `Wrong answer! Please try again. Current attempts: ${counter}`
}

const notesArray = [
  "A",
  "A#",
  "B",
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
  "Bb",
  "Db",
  "Eb",
  "Gb",
  "Ab"
];

const flatNotes = {
  "Bb": 1,
  "Db": 4,
  "Eb": 6,
  "Gb": 9,
  "Ab":11
}

module.exports = { error, notesArray,flatNotes,gameMessages };

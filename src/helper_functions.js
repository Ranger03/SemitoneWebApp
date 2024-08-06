const { error, notesArray } = require("./helper_objects");

function notesArrayChecker(arrayOfNotes) {
  if (!Array.isArray(arrayOfNotes) || arrayOfNotes.length !== 2) {
    throw new Error(error.twoStringNotes);
  } else if (
    typeof arrayOfNotes[0] !== "string" ||
    typeof arrayOfNotes[1] !== "string"
  ) {
    throw new Error(error.invalidNotes);
  }
}
const setCurrentNotesChecker = (firstNote, secondNote) => {
  if (firstNote === secondNote) {
    throw new Error(error.sameNotes);
  } else if (notesArray.includes(firstNote && secondNote)) {
    return [firstNote, secondNote];
  } else {
    throw new Error(error.invalidNotes);
  }
};
const getRandomNote = () => Math.floor(Math.random() * notesArray.length);
const calculateNoteDistance = (startIndex, endIndex) =>
  (startIndex - endIndex + 12) % 12;

module.exports = {
  notesArrayChecker,
  getRandomNote,
  calculateNoteDistance,
  setCurrentNotesChecker,
};

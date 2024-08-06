const {
  notesArrayChecker,
  getRandomNote,
  calculateNoteDistance,
  setCurrentNotesChecker,
} = require("./helper_functions");
const { error, notesArray, flatNotes } = require("./helper_objects");

class JamBuddy {
  static notes = notesArray;
  constructor() {
    this.currentNotes;
  }

  randomizeCurrentNotes() {
    const indexOne = getRandomNote();
    let indexTwo;

    do {
      indexTwo = getRandomNote();
    } while (indexTwo === indexOne);

    this.currentNotes = [JamBuddy.notes[indexOne], JamBuddy.notes[indexTwo]];
  }

  setCurrentNotes(arrayOfNotes) {
    notesArrayChecker(arrayOfNotes);
    const [firstNote, secondNote] = arrayOfNotes;
    this.currentNotes = setCurrentNotesChecker(firstNote, secondNote);
  }

  getCurrentNotes() {
    return this.currentNotes;
  }

  checkAnswer(guess) {
    if (typeof guess !== "number") throw new Error(error.invalidDateType);
    if (guess < 0 || guess > 12) throw new Error(error.invalidInput);
    const [startNote, endNote] = this.currentNotes;
    const startIndex =
      JamBuddy.notes.indexOf(startNote) <= 11
        ? JamBuddy.notes.indexOf(startNote)
        : flatNotes[startNote];
    const endIndex =
      JamBuddy.notes.indexOf(endNote) <= 11
        ? JamBuddy.notes.indexOf(endNote)
        : flatNotes[endNote];
    const clockwiseDistance = calculateNoteDistance(endIndex, startIndex);
    const anticlockwiseDistance = calculateNoteDistance(startIndex, endIndex)
      ? calculateNoteDistance(startIndex, endIndex)
      : 12;

    return clockwiseDistance === guess || anticlockwiseDistance === guess;
  }
}

module.exports = { JamBuddy };

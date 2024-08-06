const displayNotes = document.getElementById("screen-results");
const buttonToSubmit = document.getElementById("submitButton");
const buttonToRefresh = document.getElementById("refreshButton");
const displayAnswer = document.getElementById("display-notes");
const giveUpButton = document.getElementById("giveUpButton")
const inputField = document.getElementById("answer");
const { calculateNoteDistance } = require("./helper_functions");
const { flatNotes } = require("./helper_objects");
const { JamBuddy } = require("./jam_buddy");

let counter = 0;
let streak = 0;
const buddy = new JamBuddy();
buddy.randomizeCurrentNotes();
displayNotes.textContent = `${buddy.getCurrentNotes()[0]} and ${
  buddy.getCurrentNotes()[1]
}`;

buttonToSubmit.onclick = () => {
  event.preventDefault();
  const answer = document.getElementById("answer").value;
  if (answer.trim() == "") return;
  if (answer < 0 || answer > 12) {
    document.getElementById("answer").value = "";
    alert("Invalid input. Enter a number between 0-12 inclusively");
  }

  const check = buddy.checkAnswer(Number(answer));
  if (check === true) {
    //buttonToSubmit.disabled = true;
    ///buttonToSubmit.style.pointerEvents = "none";
    giveUpButton.disabled = true;
    //giveUpButton.style.pointerEvents = "none";
    //inputField.readOnly = true;
    displayAnswer.textContent = `You have chosen a correct answer. Well done! Randomize to continue playing`;
  } else {
    counter += 1;
    displayAnswer.textContent = `Wrong answer! Please try again. Current attempts: ${counter} current streak: ${streak}`;
    document.getElementById("answer").value = "";
  }
};

buttonToRefresh.onclick = () => {
  window.location.reload();
  event.preventDefault();
};

giveUpButton.onclick = () => {
  //window.location.reload();
  let liveNote = buddy.getCurrentNotes()
  buttonToSubmit.disabled = true;
  buttonToSubmit.style.pointerEvents = "none";
  giveUpButton.style.pointerEvents = "none";
  inputField.readOnly = true;
  displayAnswer.textContent = `Press randomize to play again.`;
  displayNotes.innerHTML = [
    'A', 'A#', 'Bb', 'B', 'C', 'C#', 'Db', 'D', 'D#', 'Eb', 'E', 'F', 'F#', 'Gb', 'G', 'G#', 'Ab'
].map(note => {
    if (liveNote.includes(note)) {
        return ` <span class="highlight">${note}</span> `;
    } else {
        return ` ${note} `;
    }
}).join("  ")

let existingContent = displayNotes.innerHTML;
const [startNote, endNote] = buddy.getCurrentNotes();
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
displayNotes.innerHTML = `
    <div style="display: flex; flex-direction: column;">
    <img id="noteImage" src="NoteCircle.jpg" 
    alt="Note Circle" width="260" height="260" style="display: block; margin-left: 210px;">
        <div>${existingContent}</div>
        <div style="font-size: large;">
            ${liveNote[0]} index = ${startIndex} and 
            ${liveNote[1]} index = ${endIndex}. 
            Therefore, the distance between these two notes moving anticlockwise = ${clockwiseDistance} and clockwise = ${anticlockwiseDistance}.
        </div>
    </div>
`;
  event.preventDefault();
};
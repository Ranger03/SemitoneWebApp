const { JamBuddy } = require("./jam_buddy");
const { error, gameMessages } = require("../src/helper_objects");
const {
  displayNotes,
  buttonToSubmit,
  buttonToRefresh,
  displayAnswer,
  form,
} = require("./document_objects");

const htmlForm = form;
let counter = 0;
const buddy = new JamBuddy();

buddy.randomizeCurrentNotes();
displayNotes.textContent = buddy.getCurrentNotes();

const submitAnswer = () => {
  const answer = document.getElementById("answer").value;
  if (answer < 0 || answer > 12) {
    window.alert(error.invalidInput);
    return;
  }
  const check = buddy.checkAnswer(Number(answer));
  if (check === true) {
    counter = 0;
    window.alert(gameMessages.gameWon);
    return;
  } else {
    displayAnswer.textContent = gameMessages.wrongAnswer(1);
  }
};

const refresh = () => {
  buddy.randomizeCurrentNotes();
  displayNotes.textContent = buddy.getCurrentNotes();
  displayAnswer.textContent = gameMessages.wrongAnswer(0);
};
buttonToSubmit.onclick = submitAnswer;
buttonToRefresh.onclick = refresh;

htmlForm.addEventListener("submit", function (event) {
  event.preventDefault();
});

module.exports = {
  refresh,
  submitAnswer,
  buddy,
  counter,
};

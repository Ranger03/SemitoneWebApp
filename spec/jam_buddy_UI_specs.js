const { buddy } = require("../src");
const {
  displayAnswer,
  buttonToSubmit,
  buttonToRefresh,
  displayNotes,
} = require("../src/document_objects");
const { error, gameMessages } = require("../src/helper_objects");

describe("Semitone Game", () => {
  describe("Refresh button function", () => {
    let randomizeSpy;
    beforeEach(() => {
      randomizeSpy = spyOn(buddy, "randomizeCurrentNotes").and.callThrough();
      currentNotes = displayNotes.textContent;
    });
    it("should change the notes displayed in a div with an id of screen-results", () => {
      buttonToRefresh.click();
      expect(randomizeSpy).toHaveBeenCalledTimes(1);
    });
    it("should rest the counter value to zero when randomize button is pressed", () => {
      let getElementByIdSpy = spyOn(document, "getElementById");
      buddy.setCurrentNotes(["Gb", "D#"]);
      getElementByIdSpy.and.returnValue({
        value: 7,
      });
      buttonToSubmit.click();
      expect(displayAnswer.textContent).toBe(gameMessages.wrongAnswer(1));
      buttonToRefresh.click();
      expect(displayAnswer.textContent).toBe(gameMessages.wrongAnswer(0));
    });
  });

  describe("submit function", () => {
    let spyAlert, getElementByIdSpy;

    beforeEach(() => {
      displayNotes.textContent = ["A", "A#"];
      spyAlert = spyOn(window, "alert");
      getElementByIdSpy = spyOn(document, "getElementById");
    });

    afterEach(() => {
      if (getElementByIdSpy) {
        getElementByIdSpy.and.callThrough();
      }
      spyAlert.and.callThrough();
    });

    it("Should not call the checkAnswer function if there is no input", () => {
      const submitAnswerSpy = spyOn(buddy, "checkAnswer");
      buttonToSubmit.click;
      expect(submitAnswerSpy).toHaveBeenCalledTimes(0);
    });

    it('should call alert with "Invalid input" message when answer is above or below 12', () => {
      getElementByIdSpy.and.returnValue({
        value: "15",
      });
      buttonToSubmit.click();

      expect(spyAlert).toHaveBeenCalledWith(error.invalidInput);
      getElementByIdSpy.and.returnValue({
        value: "-1",
      });
      buttonToSubmit.click();
      expect(spyAlert).toHaveBeenCalledWith(error.invalidInput);
    });
    it("should display wrong answer message and increment counter", () => {
      buttonToRefresh.click();
      buddy.setCurrentNotes(["Gb", "D#"]);
      getElementByIdSpy.and.returnValue({
        value: 7,
      });
      buttonToSubmit.click();
      expect(displayAnswer.textContent).toBe(gameMessages.wrongAnswer(1));
    });

    it("should call alert with you have won message", () => {
      buddy.setCurrentNotes(["A", "A#"]);
      getElementByIdSpy.and.returnValue({
        value: 1,
      });
      buttonToSubmit.click();
      expect(spyAlert).toHaveBeenCalledWith(gameMessages.gameWon);
    });
  });
});

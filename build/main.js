/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/helper_functions.js":
/*!*********************************!*\
  !*** ./src/helper_functions.js ***!
  \*********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const { error, notesArray } = __webpack_require__(/*! ./helper_objects */ \"./src/helper_objects.js\");\r\n\r\nfunction notesArrayChecker(arrayOfNotes) {\r\n  if (!Array.isArray(arrayOfNotes) || arrayOfNotes.length !== 2) {\r\n    throw new Error(error.twoStringNotes);\r\n  } else if (\r\n    typeof arrayOfNotes[0] !== \"string\" ||\r\n    typeof arrayOfNotes[1] !== \"string\"\r\n  ) {\r\n    throw new Error(error.invalidNotes);\r\n  }\r\n}\r\nconst setCurrentNotesChecker = (firstNote, secondNote) => {\r\n  if (firstNote === secondNote) {\r\n    throw new Error(error.sameNotes);\r\n  } else if (notesArray.includes(firstNote && secondNote)) {\r\n    return [firstNote, secondNote];\r\n  } else {\r\n    throw new Error(error.invalidNotes);\r\n  }\r\n};\r\nconst getRandomNote = () => Math.floor(Math.random() * notesArray.length);\r\nconst calculateNoteDistance = (startIndex, endIndex) =>\r\n  (startIndex - endIndex + 12) % 12;\r\n\r\nmodule.exports = {\r\n  notesArrayChecker,\r\n  getRandomNote,\r\n  calculateNoteDistance,\r\n  setCurrentNotesChecker,\r\n};\r\n\n\n//# sourceURL=webpack://sakhile-kgaphola-199-semitone-difference-basic-algorithm-javascript/./src/helper_functions.js?");

/***/ }),

/***/ "./src/helper_objects.js":
/*!*******************************!*\
  !*** ./src/helper_objects.js ***!
  \*******************************/
/***/ ((module) => {

eval("const error = {\r\n  sameNotes: \"Invalid input. Please provide two different notes.\",\r\n  invalidNotes: \"Invalid input. Please provide valid notes.\",\r\n  twoStringNotes:\r\n    \"Invalid input. Please provide an array with two string notes.\",\r\n  invalidInput:\r\n  \"Invalid input. Enter a number between 0-12 inclusively\",\r\n  invalidDateType: \"Invalid input: Input must be a number.\"\r\n};\r\nconst gameMessages = {\r\n  gameWon : \"You have chosen a correct answer. Well done!\",\r\n  wrongAnswer: (counter)=> `Wrong answer! Please try again. Current attempts: ${counter}`\r\n}\r\n\r\nconst notesArray = [\r\n  \"A\",\r\n  \"A#\",\r\n  \"B\",\r\n  \"C\",\r\n  \"C#\",\r\n  \"D\",\r\n  \"D#\",\r\n  \"E\",\r\n  \"F\",\r\n  \"F#\",\r\n  \"G\",\r\n  \"G#\",\r\n  \"Bb\",\r\n  \"Db\",\r\n  \"Eb\",\r\n  \"Gb\",\r\n  \"Ab\"\r\n];\r\n\r\nconst flatNotes = {\r\n  \"Bb\": 1,\r\n  \"Db\": 4,\r\n  \"Eb\": 6,\r\n  \"Gb\": 9,\r\n  \"Ab\":11\r\n}\r\n\r\nmodule.exports = { error, notesArray,flatNotes,gameMessages };\r\n\n\n//# sourceURL=webpack://sakhile-kgaphola-199-semitone-difference-basic-algorithm-javascript/./src/helper_objects.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const displayNotes = document.getElementById(\"screen-results\");\r\nconst buttonToSubmit = document.getElementById(\"submitButton\");\r\nconst buttonToRefresh = document.getElementById(\"refreshButton\");\r\nconst displayAnswer = document.getElementById(\"display-notes\");\r\nconst giveUpButton = document.getElementById(\"giveUpButton\")\r\nconst inputField = document.getElementById(\"answer\");\r\nconst { calculateNoteDistance } = __webpack_require__(/*! ./helper_functions */ \"./src/helper_functions.js\");\r\nconst { flatNotes } = __webpack_require__(/*! ./helper_objects */ \"./src/helper_objects.js\");\r\nconst { JamBuddy } = __webpack_require__(/*! ./jam_buddy */ \"./src/jam_buddy.js\");\r\n\r\nlet counter = 0;\r\nconst buddy = new JamBuddy();\r\nbuddy.randomizeCurrentNotes();\r\ndisplayNotes.textContent = `${buddy.getCurrentNotes()[0]} and ${\r\n  buddy.getCurrentNotes()[1]\r\n}`;\r\n\r\nbuttonToSubmit.onclick = () => {\r\n  event.preventDefault();\r\n  const answer = document.getElementById(\"answer\").value;\r\n  if (answer.trim() == \"\") return;\r\n  if (answer < 0 || answer > 12) {\r\n    document.getElementById(\"answer\").value = \"\";\r\n    alert(\"Invalid input. Enter a number between 0-12 inclusively\");\r\n  }\r\n\r\n  const check = buddy.checkAnswer(Number(answer));\r\n  if (check === true) {\r\n    buttonToSubmit.disabled = true;\r\n    buttonToSubmit.style.pointerEvents = \"none\";\r\n    giveUpButton.disabled = true;\r\n    giveUpButton.style.pointerEvents = \"none\";\r\n    inputField.readOnly = true;\r\n    displayAnswer.textContent = `You have chosen a correct answer. Well done! Randomize to continue playing`;\r\n  } else {\r\n    counter += 1;\r\n    displayAnswer.textContent = `Wrong answer! Please try again. Current attempts: ${counter}`;\r\n    document.getElementById(\"answer\").value = \"\";\r\n  }\r\n};\r\n\r\nbuttonToRefresh.onclick = () => {\r\n  window.location.reload();\r\n  event.preventDefault();\r\n};\r\n\r\ngiveUpButton.onclick = () => {\r\n  //window.location.reload();\r\n  let liveNote = buddy.getCurrentNotes()\r\n  buttonToSubmit.disabled = true;\r\n  buttonToSubmit.style.pointerEvents = \"none\";\r\n  giveUpButton.style.pointerEvents = \"none\";\r\n  inputField.readOnly = true;\r\n  displayAnswer.textContent = `Press randomize to play again.`;\r\n  displayNotes.innerHTML = [\r\n    'A', 'A#', 'Bb', 'B', 'C', 'C#', 'Db', 'D', 'D#', 'Eb', 'E', 'F', 'F#', 'Gb', 'G', 'G#', 'Ab'\r\n].map(note => {\r\n    if (liveNote.includes(note)) {\r\n        return ` <span class=\"highlight\">${note}</span> `;\r\n    } else {\r\n        return ` ${note} `;\r\n    }\r\n}).join(\"  \")\r\n\r\nlet existingContent = displayNotes.innerHTML;\r\nconst [startNote, endNote] = buddy.getCurrentNotes();\r\nconst startIndex =\r\n  JamBuddy.notes.indexOf(startNote) <= 11\r\n    ? JamBuddy.notes.indexOf(startNote)\r\n    : flatNotes[startNote];\r\nconst endIndex =\r\n  JamBuddy.notes.indexOf(endNote) <= 11\r\n    ? JamBuddy.notes.indexOf(endNote)\r\n    : flatNotes[endNote];\r\nconst clockwiseDistance = calculateNoteDistance(endIndex, startIndex);\r\nconst anticlockwiseDistance = calculateNoteDistance(startIndex, endIndex)\r\ndisplayNotes.innerHTML = `\r\n    <div style=\"display: flex; flex-direction: column;\">\r\n    <img id=\"noteImage\" src=\"NoteCircle.jpg\" \r\n    alt=\"Note Circle\" width=\"260\" height=\"260\" style=\"display: block; margin-left: 210px;\">\r\n        <div>${existingContent}</div>\r\n        <div style=\"font-size: large;\">\r\n            ${liveNote[0]} index = ${startIndex} and \r\n            ${liveNote[1]} index = ${endIndex}. \r\n            Therefore, the distance between these two notes moving anticlockwise = ${clockwiseDistance} and clockwise = ${anticlockwiseDistance}.\r\n        </div>\r\n    </div>\r\n`;\r\n  event.preventDefault();\r\n};\n\n//# sourceURL=webpack://sakhile-kgaphola-199-semitone-difference-basic-algorithm-javascript/./src/index.js?");

/***/ }),

/***/ "./src/jam_buddy.js":
/*!**************************!*\
  !*** ./src/jam_buddy.js ***!
  \**************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const {\r\n  notesArrayChecker,\r\n  getRandomNote,\r\n  calculateNoteDistance,\r\n  setCurrentNotesChecker,\r\n} = __webpack_require__(/*! ./helper_functions */ \"./src/helper_functions.js\");\r\nconst { error, notesArray, flatNotes } = __webpack_require__(/*! ./helper_objects */ \"./src/helper_objects.js\");\r\n\r\nclass JamBuddy {\r\n  static notes = notesArray;\r\n  constructor() {\r\n    this.currentNotes;\r\n  }\r\n\r\n  randomizeCurrentNotes() {\r\n    const indexOne = getRandomNote();\r\n    let indexTwo;\r\n\r\n    do {\r\n      indexTwo = getRandomNote();\r\n    } while (indexTwo === indexOne);\r\n\r\n    this.currentNotes = [JamBuddy.notes[indexOne], JamBuddy.notes[indexTwo]];\r\n  }\r\n\r\n  setCurrentNotes(arrayOfNotes) {\r\n    notesArrayChecker(arrayOfNotes);\r\n    const [firstNote, secondNote] = arrayOfNotes;\r\n    this.currentNotes = setCurrentNotesChecker(firstNote, secondNote);\r\n  }\r\n\r\n  getCurrentNotes() {\r\n    return this.currentNotes;\r\n  }\r\n\r\n  checkAnswer(guess) {\r\n    if (typeof guess !== \"number\") throw new Error(error.invalidDateType);\r\n    if (guess < 0 || guess > 12) throw new Error(error.invalidInput);\r\n    const [startNote, endNote] = this.currentNotes;\r\n    const startIndex =\r\n      JamBuddy.notes.indexOf(startNote) <= 11\r\n        ? JamBuddy.notes.indexOf(startNote)\r\n        : flatNotes[startNote];\r\n    const endIndex =\r\n      JamBuddy.notes.indexOf(endNote) <= 11\r\n        ? JamBuddy.notes.indexOf(endNote)\r\n        : flatNotes[endNote];\r\n    const clockwiseDistance = calculateNoteDistance(endIndex, startIndex);\r\n    const anticlockwiseDistance = calculateNoteDistance(startIndex, endIndex)\r\n      ? calculateNoteDistance(startIndex, endIndex)\r\n      : 12;\r\n\r\n    return clockwiseDistance === guess || anticlockwiseDistance === guess;\r\n  }\r\n}\r\n\r\nmodule.exports = { JamBuddy };\r\n\n\n//# sourceURL=webpack://sakhile-kgaphola-199-semitone-difference-basic-algorithm-javascript/./src/jam_buddy.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;
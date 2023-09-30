"use strict";

// required dom elements:------------------>

//top nav bar items---------------------->
const inputTimer = document.querySelector(".input-timer");
const btnTimer = document.querySelector(".btn-timer");

// message section---------------------->
const right_or_wrong = document.querySelector(".right-or-wrong");
const output = document.querySelector(".output");

//main section items----------------------->
const inputFirstNumber = document.querySelector(".first-number");
const selectOperator = document.querySelector(".select-operator");
const inputSecondNumber = document.querySelector(".second-number");
const inputAnswer = document.querySelector(".answer");

// bottom nav bar buttons-------------------->
const btnAddition = document.querySelector(".btn-addition");
const btnSubtraction = document.querySelector(".btn-subtraction");
const btnMultiplication = document.querySelector(".btn-multiplication");
const btnDivide = document.querySelector(".btn-divide");
const btnMore = document.querySelector(".btn-more");

// modal windows-------------------------->
const modalWindow = document.querySelector(".modal-window");
const modalWindowContent = document.querySelector(".modal-window-content");

//general modal window elements----------------------->
const btnSaveLimitsData = document.querySelector(".save-limits-data");
const btnCancel = document.querySelector(".hide-modal-window");
const inputLowerFirst = document.querySelector(".lower-first");
const inputUpperFirst = document.querySelector(".upper-first");
const inputLowerSecond = document.querySelector(".lower-second");
const inputUpperSecond = document.querySelector(".upper-second");

// specific modal windows------------------->
const modalWindowContentAdditionData = document.querySelector(
  ".modal-window-content-additionData"
);
const modalWindowContentSubtractionData = document.querySelector(
  ".modal-window-content-subtractionData"
);
const modalWindowContentMultiplicationData = document.querySelector(
  ".modal-window-content-multiplicationData"
);
const modalWindowContentDivideData = document.querySelector(
  ".modal-window-content-divideData"
);

// specific elements of specific modal windows---------------------------->
const continiousAdditionProblems = document.querySelector(
  ".continious-addition-problems"
);
const learnTableMultiplicationCheckbox = document.querySelector(
  ".learn-table-multiplication-checkbox"
);
const learnTableMultiplicationNumber = document.querySelector(
  ".learn-table-multiplication-number"
);
const learnTableDivideCheckbox = document.querySelector(
  ".learn-table-divide-checkbox"
);
const learnTableDivideNumber = document.querySelector(
  ".learn-table-divide-number"
);

// variables to use in app-------------------->
let appRangeData = {
  lowerFirst: 10,
  upperFirst: 20,
  lowerSecond: 10,
  upperSecond: 20,
  timer: 6,
};

let x,
  y,
  operator = "+",
  timerRunning,
  timerSeconds,
  dataType = "additionData",
  result,
  continious_addition_problems = false;

// code starts here---------------->

// setting up the stage when the very first time application loads
readData();
displayRandomNumbers();

function readData() {
  if (localStorage.getItem(`${dataType}`)) {
    appRangeData = JSON.parse(localStorage.getItem(`${dataType}`));
  } else {
    console.log("no previous data using default appData for " + dataType);
  }
}

function displayRandomNumbers() {
  x =
    !continious_addition_problems && operator === "+"
      ? randomInt(appRangeData.lowerFirst, appRangeData.upperFirst)
      : result;
  y = randomInt(appRangeData.lowerSecond, appRangeData.upperSecond);

  operator === "-" && x < y ? ([x, y] = [y, x]) : null;
  operator === "/" ? (x *= y) : null;

  inputFirstNumber.value = x;
  inputSecondNumber.value = y;

  inputAnswer.focus();
  resultFunction();
}

function randomInt(lowerLimit, upperLimit) {
  const number =
    Math.trunc(Math.random() * (upperLimit - lowerLimit)) + lowerLimit;
  return number;
}

function resultFunction() {
  switch (operator) {
    case "+":
      result = x + y;
      break;
    case "-":
      result = x - y;
      break;
    case "*":
      result = x * y;
      break;
    case "/":
      result = x / y;
      break;
    default:
      console.log("error in operator division of resultFunction");
  }
}

function checkFunction(userInput) {
  if (userInput === result) {
    inputAnswer.value = "";
    right_or_wrong.textContent = "right!!!!!";
    output.textContent = `${x} ${operator} ${y} = ${result}`;
    displayRandomNumbers();
  } else {
    output.textContent = "";
    right_or_wrong.textContent = "not there yet!!! keep trying...";
  }
}

function operatorChange() {
  switch (operator) {
    case "+":
      dataType = "additionData";
      break;
    case "-":
      dataType = "subtractionData";
      break;
    case "*":
      dataType = "multiplicationData";
      break;
    case "/":
      dataType = "divideData";
      break;
    default:
      console.log("problem in switch of operator selection");
  }
}

function randomOperator() {
  switch (Math.floor(Math.random() * 4)) {
    case 0:
      operator = "+";
      break;
    case 1:
      operator = "-";
      break;
    case 2:
      operator = "*";
      break;
    case 3:
      operator = "/";
      break;
    default:
      console.log("problem in random operator");
  }
  selectOperator.value = operator;
  operatorChange();
  displayRandomNumbers();
}

function displayData() {
  inputLowerFirst.value = appRangeData.lowerFirst;
  inputUpperFirst.value = appRangeData.upperFirst;
  inputLowerSecond.value = appRangeData.lowerSecond;
  inputUpperSecond.value = appRangeData.upperSecond;
}

function bottomNavBarButtonPressed(newOperator) {
  inputFirstNumber.value = inputSecondNumber.value = "";
  hideAllModalWindows();
  inputAnswer.disabled = true;
  operator = newOperator;
  operatorChange();
  readData();
  displayData();
  modalWindow.style.display = "flex";
  modalWindowContent.style.display = "block";
  document.querySelector(`.modal-window-content-${dataType}`).style.display =
    "block";
}

function hideAllModalWindows() {
  modalWindow.style.display = "none";
  modalWindowContentAdditionData.style.display = "none";
  modalWindowContentSubtractionData.style.display = "none";
  modalWindowContentMultiplicationData.style.display = "none";
  modalWindowContentDivideData.style.display = "none";
  continiousAdditionProblems.checked = continious_addition_problems;
  inputAnswer.disabled = false;
}
function learnTable(number) {
  if (number) {
    appRangeData.lowerFirst = appRangeData.upperFirst = number;
    appRangeData.lowerSecond = 2;
    appRangeData.upperSecond = 9;
    inputLowerFirst.disabled =
      inputUpperFirst.disabled =
      inputLowerSecond.disabled =
      inputUpperSecond.disabled =
        true;
    inputLowerFirst.value =
      inputUpperFirst.value =
      inputLowerSecond.value =
      inputUpperSecond.value =
        "";
  } else {
    inputLowerFirst.disabled =
      inputUpperFirst.disabled =
      inputLowerSecond.disabled =
      inputUpperSecond.disabled =
        false;
    displayData();
  }
}

// giving javascript power to modify contents of the page---------------------------->

btnSaveLimitsData.addEventListener("click", () => {
  /* 
    1. get the numbers from DOM
    2. modify the numbers range object
    3. generate random numbers and display them and update first number and second number accordingly
    4. clear local storate of old data
    5. set new data
     */
  // reading data from DOM and modifying the appRangeData-------->

  appRangeData.lowerFirst = Number(inputLowerFirst.value);
  appRangeData.upperFirst = Number(inputUpperFirst.value);
  appRangeData.lowerSecond = Number(inputLowerSecond.value);
  appRangeData.upperSecond = Number(inputUpperSecond.value);

  //displaying random numbers according to the new range------------->
  //this signify that the range has been updated

  //clearing local storage------------->
  localStorage.removeItem(dataType);

  //setting new ranges in the local storage------------->
  localStorage.setItem(dataType, JSON.stringify(appRangeData));

  // closing the modal window-------------------->
  readData();

  right_or_wrong.textContent = "data saved";
  if (continiousAdditionProblems.checked) {
    continious_addition_problems = continiousAdditionProblems.checked;
    result = 0;
  }
  operatorChange();
  displayRandomNumbers();
  hideAllModalWindows();
});

inputAnswer.addEventListener("keyup", () =>
  checkFunction(Number(inputAnswer.value))
);

selectOperator.addEventListener("change", () => {
  operatorChange();
  displayRandomNumbers();
});

btnAddition.addEventListener("click", () => bottomNavBarButtonPressed("+"));
btnSubtraction.addEventListener("click", () => bottomNavBarButtonPressed("-"));
btnMultiplication.addEventListener("click", () =>
  bottomNavBarButtonPressed("*")
);
btnDivide.addEventListener("click", () => bottomNavBarButtonPressed("/"));

window.onclick = function (event) {
  if (event.target == modalWindow) {
    modalWindow.style.display = "none";
  }
};
btnCancel.addEventListener("click", () => {
  operator = selectOperator.value;
  operatorChange();
  displayRandomNumbers();
  hideAllModalWindows();
});

learnTableDivideCheckbox.addEventListener("change", function () {
  learnTable(this.checked ? Number(learnTableDivideNumber.value) : null);
});
learnTableMultiplicationCheckbox.addEventListener("change", function () {
  learnTable(
    this.checked ? Number(learnTableMultiplicationNumber.value) : null
  );
});

/* 
step 01: check if limits are already inserted in the web storage if available update variable
step 02: if not use default limits from js script and set it to DOM
step 03: generate random numbers and update DOM
step 04: checking the answer
step 05: changing the operator
step 06: using enter to submit
step 07: removing up and down arrow of number input
step 08: timer setup
step 09: make it live using git
step 10: right wrong panel
step 11: vibration added but not working
step 12: radio button/ checkbox for auto submit-> hide submit button and right wrong panel
step 13: hide set limits button while timer running // skipped
step 14: adding limits for all the operations
step 15: displaying summary below grid
step 16: mixed calculations
*/

/* marc 3 <preprations------------------->
step 01: make bottom nav bar with buttons addition subtraction multiplication divide more
step 02: make modal window and show it when the bottom navbar buttons are pressed
step 03: make separate modal window for every operation ???
step 04: bottom navigation bar is greyed out when the modal window is opened________ fix it...
step 05: addition bottom navbar button modal window and its normal functions
last step: animations
*/

"use strict";

// required dom elements:------------------>

//timer items---------------------->
const inputTimer = document.querySelector(".input-timer");

// message section---------------------->
const totalCalculations = document.querySelector(".total-calculations");
const right_or_wrong = document.querySelector(".right-or-wrong");
const btnRedLightGreenLight = document.querySelector(
  ".btn-red-light-green-light"
);
const output = document.querySelector(".output");

//main section items----------------------->
const inputFirstNumber = document.querySelector(".first-number");
const selectOperator = document.querySelector(".select-operator");
const inputSecondNumber = document.querySelector(".second-number");
const inputAnswer = document.querySelector(".answer");

// modal windows-------------------------->
const modalWindow = document.querySelector(".modal-window");
const modalWindowContent = document.querySelector(".modal-window-content");

//general modal window elements----------------------->
const btnCancel = document.querySelector(".hide-modal-window");
const inputLowerFirst = document.querySelector(".lower-first");
const inputUpperFirst = document.querySelector(".upper-first");
const inputLowerSecond = document.querySelector(".lower-second");
const inputUpperSecond = document.querySelector(".upper-second");

// specific modal windows------------------->
const modalWindowContentMoreData = document.querySelector(
  ".modal-window-content-more"
);

// specific elements of specific modal windows---------------------------->
const continiousAdditionProblemsCheckbox = document.querySelector(
  ".continious-addition-problems-checkbox"
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

const mixedCalculationCheckbox = document.querySelector(
  ".mixed-calculation-checkbox"
);

// summary modal windows-------------------------------->
const summaryModalWindow = document.querySelector(".modal-window-summary");
const btnCloseSummaryModalWindows = document.querySelector(
  ".close-summary-modal-window"
);
const summaryBoard = document.querySelector(".summary-board");

// numeric pad------------------------>
const numericPad = document.querySelectorAll(".numeric");
const backspace = document.querySelector(".backspace");
const submitBtn = document.querySelector(".submit");

// global variables to use in app-------------------->
let appRangeData = {
  lowerFirst: 10,
  upperFirst: 20,
  lowerSecond: 10,
  upperSecond: 20,
};

let x,
  y,
  operator = "+",
  clockRunning,
  timeInSeconds = 0,
  totalNumberOfOperations = 0,
  keysPressed = 0,
  totalDigits = 0,
  dataType = "additionData",
  result,
  continious_addition_problems = false,
  mixedCalculation = false,
  userInputString = "";

// code starts here---------------->

// setting up the stage when the first time webpage loads
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
    continious_addition_problems && operator === "+"
      ? result
      : randomInt(appRangeData.lowerFirst, appRangeData.upperFirst);
  y = randomInt(appRangeData.lowerSecond, appRangeData.upperSecond);

  operator === "-" && x < y ? ([x, y] = [y, x]) : null;
  operator === "/" ? (x *= y) : null;

  inputFirstNumber.value = x;
  inputSecondNumber.value = y;

  inputAnswer.focus();
  calculateAnswer();
}

function randomInt(lowerLimit, upperLimit) {
  const number =
    Math.trunc(Math.random() * (upperLimit - lowerLimit)) + lowerLimit;
  return number;
}

function calculateAnswer() {
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
      console.log("error in operator division of calculateAnswer");
  }
}

function checkUserInput(userInput) {
  if (userInput === result) {
    inputAnswer.value = "";
    right_or_wrong.textContent = "right!!!!!";
    btnRedLightGreenLight.style.animation =
      "bouncing-green ease-in 1000ms forwards";
    output.textContent = `${x} ${operator} ${y} = ${result}`;
    totalNumberOfOperations++;
    totalCalculations.textContent =
      "Total Calculations : " + totalNumberOfOperations;
    totalDigits += String(result).length;
    userInputString = "";
    mixedCalculation ? randomOperatorGenerator() : displayRandomNumbers();
  } else {
    output.textContent = "";
    right_or_wrong.textContent = " keep trying...";
    btnRedLightGreenLight.style.animation =
      "bouncing-red ease-in 2000ms infinite";
  }
}

function modifyDataType() {
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

function randomOperatorGenerator() {
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
  modifyDataType();
  readData();
  displayRandomNumbers();
}

function displayData() {
  inputLowerFirst.value = appRangeData.lowerFirst;
  inputUpperFirst.value = appRangeData.upperFirst;
  inputLowerSecond.value = appRangeData.lowerSecond;
  inputUpperSecond.value = appRangeData.upperSecond;
}

function bottomNavBarButtonPressed(newOperator) {
  modalWindow.style.animation = "slideInBottom 500ms";
  resetCheckboxesAndAppBooleans();
  inputFirstNumber.value = inputSecondNumber.value = "";
  operator = newOperator;
  modifyDataType();
  readData();
  displayData();
  modalWindow.style.display = "flex";
  modalWindowContent.style.display = "block";
  document.querySelector(`.modal-window-content-${dataType}`).style.display =
    "block";
}

function hideAllModalWindows() {
  modalWindow.style.display =
    document.querySelector(".modal-window-content-additionData").style.display =
    document.querySelector(
      ".modal-window-content-subtractionData"
    ).style.display =
    document.querySelector(
      ".modal-window-content-multiplicationData"
    ).style.display =
    document.querySelector(".modal-window-content-divideData").style.display =
    modalWindowContentMoreData.style.display =
      "none";
}

function saveAppRangeDataToLocalStorage() {
  // reading data from DOM and modifying the appRangeData-------->
  appRangeData.lowerFirst = Number(inputLowerFirst.value);
  appRangeData.upperFirst = Number(inputUpperFirst.value);
  appRangeData.lowerSecond = Number(inputLowerSecond.value);
  appRangeData.upperSecond = Number(inputUpperSecond.value);

  //clearing local storage------------->
  localStorage.removeItem(dataType);

  //setting new ranges in the local storage------------->
  localStorage.setItem(dataType, JSON.stringify(appRangeData));
}

function saveButtonTasks(passedOperator) {
  modalWindow.style.animation = "slideOutBottom 500ms";
  setTimeout(hideAllModalWindows, 500);
  passedOperator
    ? (selectOperator.value = operator = passedOperator)
    : randomOperatorGenerator();
  modifyDataType();
  displayRandomNumbers();
}
function resetCheckboxesAndAppBooleans() {
  continiousAdditionProblemsCheckbox.checked =
    mixedCalculationCheckbox.checked =
    continious_addition_problems =
    mixedCalculation =
    learnTableMultiplicationCheckbox.checked =
    learnTableDivideCheckbox.checked =
      false;
}

function closeSummaryModalWindow() {
  summaryModalWindow.style.display = "none";
  displayRandomNumbers();
  output.textContent = "";
  inputAnswer.value = "";
  totalDigits = totalNumberOfOperations = keysPressed = 0;
  totalCalculations.textContent = "Total Calculations : 0";
  userInputString = "";
}

function showSummary() {
  let efficiency, timeTakenPerOperation;
  if (totalNumberOfOperations === 0) {
    efficiency = "--";
    timeTakenPerOperation = "-- sec/calc";
  } else {
    efficiency = Number((totalDigits / keysPressed) * 100).toFixed(2);
    timeTakenPerOperation = `${Number(
      timeInSeconds / totalNumberOfOperations
    ).toFixed(2)} sec/calc`;
  }

  // setting question panel and message board empty
  inputFirstNumber.value = inputSecondNumber.value = "";
  right_or_wrong.textContent = "";
  btnRedLightGreenLight.style.animation = "bouncing-red ease-in 500ms 4";

  // showing summary modal window
  summaryModalWindow.style.display = "flex";
  summaryBoard.innerHTML = `<p>Total Time : ${toMMSS()}</p><hr>
                            <p>${totalNumberOfOperations} calculations in total</p><hr>
                            <p>Took ${timeTakenPerOperation}</p><hr>
                            <p>Efficiency : ${efficiency}</p>`;

  clearInterval(clockRunning);
  inputTimer.value = "00:00";
  clockRunning = null;
  timeInSeconds = 0;
}

function toMMSS() {
  let minutes = Math.floor(timeInSeconds / 60),
    seconds = timeInSeconds - minutes * 60;
  if (minutes < 10) minutes = "0" + minutes;
  if (seconds < 10) seconds = "0" + seconds;
  return minutes + ":" + seconds;
}

// giving javascript power to modify contents of the page---------------------------->

selectOperator.addEventListener("change", () => {
  operator = selectOperator.value;
  modifyDataType();
  readData();
  displayRandomNumbers();
});

// adding event listeners to bottom nav bar buttons--------------------------------->
document
  .querySelector(".btn-addition")
  .addEventListener("click", () => bottomNavBarButtonPressed("+"));
document
  .querySelector(".btn-subtraction")
  .addEventListener("click", () => bottomNavBarButtonPressed("-"));
document
  .querySelector(".btn-multiplication")
  .addEventListener("click", () => bottomNavBarButtonPressed("*"));
document
  .querySelector(".btn-divide")
  .addEventListener("click", () => bottomNavBarButtonPressed("/"));
document.querySelector(".btn-more").addEventListener("click", () => {
  modalWindow.style.animation = "slideInBottom 500ms";
  modalWindow.style.display = "flex";
  modalWindowContent.style.display = "none";
  modalWindowContentMoreData.style.display = "block";
  mixedCalculationCheckbox.checked = false;
  inputFirstNumber.value = inputSecondNumber.value = "";
  inputAnswer.disabled = true;
});

window.onclick = function (event) {
  if (event.target == modalWindow) btnCancel.click();
  if (event.target == summaryModalWindow) closeSummaryModalWindow();
};

btnCancel.addEventListener("click", () => {
  modalWindow.style.animation = "slideOutBottom 500ms";
  setTimeout(hideAllModalWindows, 500);
  operator = selectOperator.value;
  modifyDataType();
  readData();
  displayRandomNumbers();
});

document
  .querySelector(".btn-addition-save-data")
  .addEventListener("click", () => {
    continious_addition_problems
      ? (result = 0)
      : saveAppRangeDataToLocalStorage();
    saveButtonTasks("+");
  });

continiousAdditionProblemsCheckbox.addEventListener("change", function () {
  continious_addition_problems = this.checked;
  if (this.checked) {
    inputLowerFirst.value = inputUpperFirst.value = "";
    inputLowerFirst.disabled = inputUpperFirst.disabled = true;
  } else {
    displayData();
    inputLowerFirst.disabled = inputUpperFirst.disabled = false;
  }
});

document
  .querySelector(".btn-subtraction-save-data")
  .addEventListener("click", () => {
    saveAppRangeDataToLocalStorage();
    saveButtonTasks("-");
  });

document
  .querySelector(".btn-multiplication-save-data")
  .addEventListener("click", () => {
    if (learnTableMultiplicationCheckbox.checked) {
      appRangeData.lowerFirst = appRangeData.upperFirst = Number(
        learnTableMultiplicationNumber.value
      );
      appRangeData.lowerSecond = 2;
      appRangeData.upperSecond = 9;
    } else {
      saveAppRangeDataToLocalStorage();
    }
    saveButtonTasks("*");
  });

learnTableMultiplicationCheckbox.addEventListener("change", function () {
  if (this.checked) {
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
    learnTableMultiplicationNumber.disabled = false;
    learnTableMultiplicationNumber.focus();
  } else {
    inputLowerFirst.disabled =
      inputUpperFirst.disabled =
      inputLowerSecond.disabled =
      inputUpperSecond.disabled =
        false;
    displayData();
    learnTableMultiplicationNumber.disabled = true;
    learnTableMultiplicationNumber.value = "";
  }
});

document
  .querySelector(".btn-divide-save-data")
  .addEventListener("click", () => {
    if (learnTableDivideCheckbox.checked) {
      appRangeData.lowerSecond = appRangeData.upperSecond = Number(
        learnTableDivideNumber.value
      );
      appRangeData.lowerFirst = 2;
      appRangeData.upperFirst = 9;
    } else {
      saveAppRangeDataToLocalStorage();
    }
    saveButtonTasks("/");
  });

learnTableDivideCheckbox.addEventListener("change", function () {
  if (this.checked) {
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
    learnTableDivideNumber.disabled = false;
    learnTableDivideNumber.focus();
  } else {
    inputLowerFirst.disabled =
      inputUpperFirst.disabled =
      inputLowerSecond.disabled =
      inputUpperSecond.disabled =
        false;
    displayData();
    learnTableDivideNumber.disabled = true;
    learnTableDivideNumber.value = "";
  }
});

document.querySelector(".btn-more-save-data").addEventListener("click", () => {
  mixedCalculation = mixedCalculationCheckbox.checked ? true : false;
  saveButtonTasks();
});

btnCloseSummaryModalWindows.addEventListener("click", closeSummaryModalWindow);

for (let i = 0; i < numericPad.length; i++) {
  numericPad[i].addEventListener("click", function () {
    userInputString += this.textContent;
    inputAnswer.value = userInputString;
    checkUserInput(Number(userInputString));
    keysPressed++;
    if (!clockRunning) {
      clockRunning = setInterval(() => {
        ++timeInSeconds;
        inputTimer.value = toMMSS();
      }, 1000);
    }
  });
}
backspace.addEventListener("click", function () {
  userInputString = userInputString.slice(0, -1);
  inputAnswer.value = userInputString;
  checkUserInput(Number(userInputString));
});

submitBtn.addEventListener("click", showSummary);
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
✅ step 01: make bottom nav bar with buttons addition subtraction multiplication divide more
✅ step 02: make modal window and show it when the bottom navbar buttons are pressed
✅ step 03: make separate modal window for every operation
✅ step 04: bottom navigation bar is greyed out when the modal window is opened________ fix it...
✅ step 05: addition bottom navbar button modal window and its normal functions
________________________________________

✅ step 06: message board animations
step 07: color pallet
step 08: change icon according to color pallet
step 09: option for dark mode
✅ step 10: time bound operations
✅ a. creating timer
✅ b. when timer stops displaying modal showing number of operations completed in given timer time and operation per second and efficiency

✅ last step: animations
*/

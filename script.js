"use strict";

// required dom elements:------------------>

const inputTimer = document.querySelector(".input-timer");

const inputLowerFirst = document.querySelector(".lower-first");
const inputUpperFirst = document.querySelector(".upper-first");
const inputLowerSecond = document.querySelector(".lower-second");
const inputUpperSecond = document.querySelector(".upper-second");

const inputAnswer = document.querySelector(".answer");

const btnTimer = document.querySelector(".btn-timer");
const btnMenu = document.querySelector(".btn-menu");
const btnSetLimits = document.querySelector(".btn-set-limits");
const btnCheck = document.querySelector(".btn-check");

const selectOperator = document.querySelector(".select-operator");

const inputFirstNumber = document.querySelector(".first-number");
const inputSecondNumber = document.querySelector(".second-number");

const rightBoard = document.querySelector(".right");
const wrongBoard = document.querySelector(".wrong");

const checkboxAutoSubmit = document.querySelector("#auto-submit-answer");
const checkboxMixedCalculation = document.querySelector("#mixed-calculation");

const additionDataParagraph = document.querySelector(".additionData-paragraph");
const subtractionDataParagraph = document.querySelector(
  ".subtractionData-paragraph"
);
const multiplicationDataParagraph = document.querySelector(
  ".multiplicationData-paragraph"
);
const divideDataParagraph = document.querySelector(".divideData-paragraph");

// variables to use in app-------------------->
const appRangeData = {
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
  right = 0,
  wrong = 0,
  dataType = "additionData";

// code starts here---------------->

// setting up the stage for the very first time application loads
updateAllParagraphs();
localStorage.getItem("operator")
  ? (selectOperator.value = JSON.parse(localStorage.getItem("operator")))
  : null;
operatorChange();

function displayData() {
  inputLowerFirst.value = appRangeData.lowerFirst;
  inputUpperFirst.value = appRangeData.upperFirst;
  inputLowerSecond.value = appRangeData.lowerSecond;
  inputUpperSecond.value = appRangeData.upperSecond;
  inputTimer.value = appRangeData.timer;
}

function displayRandomNumbers() {
  x = randomInt(appRangeData.lowerFirst, appRangeData.upperFirst);
  y = randomInt(appRangeData.lowerSecond, appRangeData.upperSecond);

  x < y && operator === "-" ? ([x, y] = [y, x]) : null;

  operator === "/" ? (x *= y) : null;

  inputFirstNumber.value = x;
  inputSecondNumber.value = y;

  inputAnswer.focus();
}

function randomInt(lowerLimit, upperLimit) {
  const number =
    Math.trunc(Math.random() * (upperLimit - lowerLimit)) + lowerLimit;
  return number;
}

function resultFunction() {
  let result;
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
  return result;
}

function checkFunction(userInput) {
  if (userInput === resultFunction()) {
    inputAnswer.value = "";
    timerSeconds = appRangeData.timer;
    displayRandomNumbers();
    rightBoard.textContent = `✅ ${++right}`;
    checkboxAutoSubmit.checked ? null : boardColor(true);
    checkboxMixedCalculation.checked ? randomOperator() : null;
  } else {
    wrongBoard.textContent = `🚫 ${++wrong}`;
    inputAnswer.focus();
    navigator.vibrate(1000);
    checkboxAutoSubmit.checked ? null : boardColor(false);
  }
}

function timerFunction() {
  if (timerRunning) {
    // when timer is running
    clearInterval(timerRunning);
    btnTimer.className = "timerStopped";
    btnTimer.textContent = "Start";
    timerRunning = false;
    inputTimer.value = appRangeData.timer;
  } else {
    // when timer is not running
    timerSeconds = appRangeData.timer;
    timerRunning = setInterval(timerClockFunction, 1000);
    btnTimer.className = "timerRunning";
    btnTimer.textContent = "Stop";
    inputAnswer.focus();
  }
}

function timerClockFunction() {
  inputTimer.value = --timerSeconds;
  if (timerSeconds === 0) {
    checkFunction(Number(inputAnswer.value));
    timerSeconds = appRangeData.timer;
  }
}

function boardColor(flag) {
  if (flag) {
    rightBoard.style.backgroundColor = "green";
    setTimeout(() => (rightBoard.style.backgroundColor = null), 500);
  } else {
    wrongBoard.style.backgroundColor = "red";
    setTimeout(() => (wrongBoard.style.backgroundColor = null), 500);
  }
}

function readData() {
  if (localStorage.getItem(`${dataType}`)) {
    const clientSideRangeData = JSON.parse(localStorage.getItem(`${dataType}`));

    appRangeData.lowerFirst = clientSideRangeData.lowerFirst;
    appRangeData.upperFirst = clientSideRangeData.upperFirst;
    appRangeData.lowerSecond = clientSideRangeData.lowerSecond;
    appRangeData.upperSecond = clientSideRangeData.upperSecond;
    appRangeData.timer = clientSideRangeData.timer;

    updateSingleParagraph();
  } else {
    console.log("no previous data using default appData for " + dataType);
  }
}

function operatorChange() {
  operator = selectOperator.value;
  localStorage.setItem(`operator`, JSON.stringify(operator));
  switch (selectOperator.value) {
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
  console.log(dataType);
  readData();
  displayData();
  displayRandomNumbers();
}

function randomOperator() {
  console.log("random operator");
  const randomOperatorCode = Math.floor(Math.random() * 4);
  console.log(randomOperatorCode);
  switch (randomOperatorCode) {
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
}

function updateSingleParagraph() {
  document.querySelector(
    `.${dataType}-paragraph`
  ).textContent = `${dataType} first number range: (${appRangeData.lowerFirst} to ${appRangeData.upperFirst}) and second number range: (${appRangeData.lowerSecond}) to ${appRangeData.upperSecond}`;
}

function updateAllParagraphs() {
  const datas = [
    "additionData",
    "subtractionData",
    "multiplicationData",
    "divideData",
  ];
  for (const data of datas) {
    dataType = data;
    readData();
  }
}

// giving javascript power to modify contents of the page---------------------------->

btnSetLimits.addEventListener("click", () => {
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
  displayRandomNumbers();
  updateSingleParagraph();

  //clearing local storage------------->
  localStorage.removeItem(`${dataType}`);
  localStorage.removeItem(`operator`);

  //setting new ranges in the local storage------------->
  localStorage.setItem(`${dataType}`, JSON.stringify(appRangeData));
  localStorage.setItem(`operator`, JSON.stringify(operator));
});

btnCheck.addEventListener("click", () => {
  checkFunction(Number(inputAnswer.value));
});

inputAnswer.addEventListener("keyup", (event) => {
  event.key === "Enter" ? checkFunction(Number(inputAnswer.value)) : null;
  if (checkboxAutoSubmit.checked) {
    checkFunction(Number(inputAnswer.value));
  }
});

selectOperator.addEventListener("change", operatorChange);

btnTimer.addEventListener("click", timerFunction);

checkboxAutoSubmit.addEventListener("change", () => {
  if (checkboxAutoSubmit.checked) {
    btnCheck.style.display = "none";
    rightBoard.style.display = "none";
    wrongBoard.style.display = "none";
  } else {
    btnCheck.style.display = "inline-block";
    rightBoard.style.display = "inline-block";
    wrongBoard.style.display = "inline-block";
    displayRandomNumbers();
    wrong = 0;
    right = 0;
    rightBoard.textContent = `✅ ${right}`;
    wrongBoard.textContent = `🚫 ${wrong}`;
  }
});

checkboxMixedCalculation.addEventListener("change", () => {
  if (checkboxMixedCalculation.checked) {
    inputLowerFirst.style.display = "none";
    inputUpperFirst.style.display = "none";
    inputLowerSecond.style.display = "none";
    inputUpperSecond.style.display = "none";
  } else {
    inputLowerFirst.style.display = "inline-block";
    inputUpperFirst.style.display = "inline-block";
    inputLowerSecond.style.display = "inline-block";
    inputUpperSecond.style.display = "inline-block";
  }
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
second last: menu......
last step: animations
*/

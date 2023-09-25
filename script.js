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
  timerSeconds;

// code starts here---------------->

// setting up the stage for the very first time application loads

// checking if client side storage has any previous limits data

if (localStorage.getItem("data")) {
  const clientSideRangeData = JSON.parse(localStorage.getItem("data"));

  appRangeData.lowerFirst = clientSideRangeData.lowerFirst;
  appRangeData.upperFirst = clientSideRangeData.upperFirst;
  appRangeData.lowerSecond = clientSideRangeData.lowerSecond;
  appRangeData.upperSecond = clientSideRangeData.upperSecond;
  appRangeData.timer = clientSideRangeData.timer;
} else {
  console.log("no previous data");
}

displayData(appRangeData);
displayRandomNumbers();

function displayData(limitsData) {
  inputLowerFirst.value = limitsData.lowerFirst;
  inputUpperFirst.value = limitsData.upperFirst;
  inputLowerSecond.value = limitsData.lowerSecond;
  inputUpperSecond.value = limitsData.upperSecond;
  inputTimer.value = limitsData.timer;
}

function randomInt(lowerLimit, upperLimit) {
  const number =
    Math.trunc(Math.random() * (upperLimit - lowerLimit)) + lowerLimit;
  return number;
}

function displayRandomNumbers() {
  x = randomInt(appRangeData.lowerFirst, appRangeData.upperFirst);
  y = randomInt(appRangeData.lowerSecond, appRangeData.upperSecond);

  x < y && operator === "-" ? ([x, y] = [y, x]) : null;

  inputFirstNumber.value = x;
  inputSecondNumber.value = y;

  inputAnswer.focus();
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
    console.log("right");
    inputAnswer.value = "";
    timerSeconds = appRangeData.timer;
    displayRandomNumbers();
  } else {
    console.log("try again");
    inputAnswer.focus();
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

// giving javascript power to modify contents of the page---------------------------->

btnSetLimits.addEventListener("click", () => {
  /* 
    1. get the numbers from DOM
    2. modify the numbers range object
    3. generate random numbers and display them and update first number and second number accordingly
    4. clear local storate of old data
    5. set new data
     */
  // first & second-------->

  appRangeData.lowerFirst = Number(inputLowerFirst.value);
  appRangeData.upperFirst = Number(inputUpperFirst.value);
  appRangeData.lowerSecond = Number(inputLowerSecond.value);
  appRangeData.upperSecond = Number(inputUpperSecond.value);

  // displaying numbers---------------->
  displayData(appRangeData);
  displayRandomNumbers();

  //clearing local storage------------->
  localStorage.removeItem("data");

  //setting new ranges in the local storage------------->
  localStorage.setItem("data", JSON.stringify(appRangeData));
});

btnCheck.addEventListener("click", () => {
  checkFunction(Number(inputAnswer.value));
});

inputAnswer.addEventListener("keyup", (event) => {
  event.key === "Enter" ? checkFunction(Number(inputAnswer.value)) : null;
  checkFunction(Number(inputAnswer.value));
});

selectOperator.addEventListener("change", () => {
  operator = selectOperator.value;
  console.log(`operator is ${operator}`);
  displayRandomNumbers();
});

btnTimer.addEventListener("click", timerFunction);

/* 
step 1: check if limits are already inserted in the web storage if available update variable
step 2: if not use default limits from js script and set it to DOM
step 3: generate random numbers and update DOM
step 4: checking the answer
step 5: changing the operator
step 6: using enter to submit
step 7: removing up and down arrow of number input
step 8: timer setup
step 9: make it live using git
step 10: menu......
last step: animations
*/

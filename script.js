// global variables
let operator = "";
let currentValue = "";
let previousValue = "";

// html variables
let currentScreen = document.querySelector(".currentScreen");
let previousScreen = document.querySelector(".previousScreen");

let numbers = document.querySelectorAll(".number");
let operators = document.querySelectorAll(".operator");
let equal = document.querySelector(".equal");
let clear = document.querySelector(".clear");
let decimal = document.querySelector(".decimal");

// code
function handleNumbers(num) {
  if (currentValue.length <= 5) {
    currentValue += num;
  }
}

numbers.forEach((number) =>
  number.addEventListener("click", function (e) {
    handleNumbers(e.target.textContent);
    currentScreen.textContent = currentValue;
  })
);

function handleOperators(op) {
  operator = op;
  previousValue = currentValue;
  currentValue = "";
}

operators.forEach((op) =>
  op.addEventListener("click", function (e) {
    handleOperators(e.target.textContent);
    previousScreen.textContent = previousValue + " " + operator;
    currentScreen.textContent = currentValue;
  })
);

clear.addEventListener("click", function () {
  operator = "";
  currentValue = "";
  previousValue = "";
  currentScreen.textContent = currentValue;
  previousScreen.textContent = currentValue;
});

function handleDecimal() {
  if (!currentValue.includes(".")) {
    currentValue += ".";
  }
}

decimal.addEventListener("click", function () {
  handleDecimal();
  currentScreen.textContent = currentValue;
});

function calculate() {
  currentValue = Number(currentValue);
  previousValue = Number(previousValue);

  if (operator === "+") {
    previousValue += currentValue;
  } else if (operator === "-") {
    previousValue -= currentValue;
  } else if (operator === "*") {
    previousValue *= currentValue;
  } else {
    previousValue /= currentValue;
  }

  previousValue = roundNumber(previousValue);
  currentValue = currentValue.toString();
  previousValue = previousValue.toString();
}

equal.addEventListener("click", function () {
  if (currentValue != "" && previousValue != "") {
    calculate();
    previousScreen.textContent = "";
    currentScreen.textContent = previousValue;
  }
});

function roundNumber(num) {
  return Math.round(num * 1000) / 1000;
}

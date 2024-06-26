//Create functions for basic math operators.
const sum = (num1, num2) => num1 + num2;
const subtract = (num1, num2) => num1 - num2;
const multiplication = (num1, num2) => num1 * num2;
const division = (num1, num2) => num1 / num2; 
        
// Create the global variables to store the numbers, operators and functions for basic operators.
let firstNumber = null;
let secondNumber = null;
let store = "";
let operator = "";
const operators = ["+", "-", "*", "/"];
const operations = [sum, subtract, multiplication, division];

//Create function operate that calls a function to operate 2 numbers.
function operate(num1, num2, operator) {
    const operatorExist = operators.includes(operator);

    if (!isNaN(num1) && !isNaN(num2) && operatorExist) {
        for (let i = 0; i < 4; i++) {
            if (operator == operators[i]) {
                 return operations[i](num1, num2);
            }
        }
    }
}
 
const buttonNumbers = document.querySelectorAll(".number");
const displayContent = document.querySelector("input");
const buttonOperators = document.querySelectorAll(".operator");
const buttonEnter = document.querySelector("#enter");
const clearButton = document.querySelector("#clear");
const percentageButton = document.querySelector("#percentage");
const signButton = document.querySelector("#sign");

//Create a function to populate the display when clicking the number buttons and store it.
function toDisplay() {
    buttonNumbers.forEach(button => button.addEventListener("click", function(event) {

        //Clicking numbers after clicking ENTER, store is a NUMBER
        //and needs to be empty to add a NEW NUMBER.
        if (typeof store === "number") {
            store = "";
        }

        //Clicking numbers
        if (store.length < 13) {
        store += event.target.textContent;
        displayContent.value = store;          
        }   
    })) 
};

window.onload = function() {
    displayContent.value = "0";
}
toDisplay();

//When clicking an operator.
buttonOperators.forEach(button => button.addEventListener("click", function(event) {

    //Clicking an operator when it is not the first button clicked.
    if (store !== "") {
        // ==> 3 + 5 +
        if (firstNumber != null) {
            secondNumber = Number(store);
            const result = operate(firstNumber, secondNumber, operator);
            const adjustedResult = adjustNumberLength(result);
            displayContent.value = adjustedResult; 
            firstNumber = result;
            secondNumber = 0;
            store = "";           
        }
        // ==> 3 + 
        else {
            firstNumber = Number(store);
            store = "";   
        }
        operator = event.target.textContent;
    }
}));

//Store the second number when clicking "=".
//When clicking ENTER.
buttonEnter.addEventListener("click", function() {

    //Pressing ENTER having already pressed and stored a first number:
    // ==> 5 + (...) =
    if (firstNumber != null) {

        //Pressing ENTER after pressing a second number (number in store). 
        //Ideal case ==> 5 + 3 =
        if (store != "") {
            secondNumber = Number(store);

            //Handling the case where the divisor is zero.
            if (secondNumber === 0 && operator == "/") {
                clearCalculator();
                displayContent.value = "OOPS!";
                return;
            }

            const result = operate(firstNumber, secondNumber, operator);
            const adjustedResult = adjustNumberLength(result);
            displayContent.value = adjustedResult;
            store = result;
            firstNumber = null; 
            secondNumber = null;
        }
        //Pressing ENTER after pressing an operator (no number stored)
        // MALFORMED EXPRESSION ==> 5 + =
        else {
            clearCalculator();
            displayContent.value = "OOPS!"
        }
    }

    //When pressing ENTER after a number without an operator (no number in store)
    // Keep the same number in display, but restart state. => 5 =
    else {
        store = "";
    }
    operator = "";
});

//When clicking AC to restart the calculator state.
clearButton.addEventListener("click", clearCalculator);

function clearCalculator() {
    store = "";
    operator = "";
    firstNumber = null;
    secondNumber = null;
    displayContent.value = 0;
};

//Create a function that checks and/or adjust a number to fit the display screen 
//with maximum 12 characters.
function adjustNumberLength(number) {
    const numberString = number.toString();
    const numberLength = numberString.length;

    if (numberLength <= 13) {
        return number;
    }
    else {
        // 12.345678901234 => 12.3456789012
        if(number < 1e13 && number > -1e12) {
            const index = numberString.indexOf(".");
             return number.toFixed(13 - index);
        } 
        // 123456789012345 => 1.234567e+14
        else if (number >= 1e13) {
            return number.toExponential(7);
        }
        // -12345678901234 => -1.23456e+14
        else {
            return number.toExponential(6);
        }
    } 
};

//When clicking percentage %
percentageButton.addEventListener("click", function() {
    const number = Number(displayContent.value);
    const result = number / 100;
    displayContent.value = result;
    store = result;
    operator = "";
});

//When clicking sign +/-
signButton.addEventListener("click", function() {
    const number = Number(displayContent.value);
    const result = number * -1;
    store = result;
    displayContent.value = store;   
});

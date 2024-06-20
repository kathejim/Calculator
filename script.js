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
// 
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
        console.log("firstNumber: " + firstNumber);
        console.log("secondNumber: " + secondNumber);
        console.log("store: " + store);
        console.log("operator :" + operator);

        //Condition when comes from ENTER, store is a number
        //and needs to be empty.
        if (typeof store === "number") {
            store = "";
        }

        if (store.length < 13) {
        store += event.target.textContent;
        displayContent.value = store;          
        }   
    }))
    console.log("firstNumber: " + firstNumber);
    console.log("secondNumber: " + secondNumber);
    console.log("store: " + store);
    console.log("operator :" + operator);   
};

window.onload = function() {
    displayContent.value = "0";
}
toDisplay();

//Store the first number when clicking an operator.
buttonOperators.forEach(button => button.addEventListener("click", function(event) {
    console.log("firstNumber: " + firstNumber);
    console.log("secondNumber: " + secondNumber);
    console.log("store: " + store);
    console.log("operator :" + operator);

    //Pressing an operator when it is not the first button pressed.
    if (store != "") {
        if (firstNumber != null) {
            secondNumber = Number(store);
            const result = operate(firstNumber, secondNumber, operator);
            const adjustedResult = adjustNumberLength(result);
            displayContent.value = adjustedResult; 
            firstNumber = result;
            secondNumber = 0;
            store = "";

            console.log("firstNumber: " + firstNumber);
            console.log("secondNumber: " + secondNumber);
            console.log("store: " + store);
            console.log("operator :" + operator);
            console.log("result: " + result);
            
        }
        else {
            firstNumber = Number(store);
            store = "";
            console.log("firstNumber: " + firstNumber);
            console.log("secondNumber: " + secondNumber);
            console.log("store: " + store);
            console.log("operator :" + operator);        
        }
        operator = event.target.textContent;
        console.log("operator :" + operator);
    }
}));

//Store the second number when clicking "=".
buttonEnter.addEventListener("click", function() {
    console.log("firstNumber: " + firstNumber);
    console.log("secondNumber: " + secondNumber);
    console.log("store: " + store);
    console.log("operator :" + operator);
    //Pressing ENTER having already pressed and stored a first number:
    // ==> 5 + (...) =
    if (firstNumber != null) {

        //Pressing ENTER after pressing a second number (number in store). 
        //Ideal case ==> 5 + 3 =
        if (store != "") {
            secondNumber = Number(store);

            //Handling the case where the denominator is zero.
            if (secondNumber === 0) {
                clearCalculator();
                displayContent.value = "OOPS!";
                return;
            }
            console.log("firstNumber: " + firstNumber);
            console.log("secondNumber: " + secondNumber);
            console.log("store: " + store);
            console.log("operator :" + operator);

            const result = operate(firstNumber, secondNumber, operator);
            const adjustedResult = adjustNumberLength(result);
            displayContent.value = adjustedResult;
            store = result;
            firstNumber = null; 
            secondNumber = null;
            console.log("firstNumber: " + firstNumber);
            console.log("secondNumber: " + secondNumber);
            console.log("store: " + store);
            console.log("operator :" + operator);
            console.log("result: " + result);
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

    // After pressing ENTER i have the display (result) in my store (NUMBER), no operator
    //no numbers. Ready to be used in 2 situations:

    //1. Pressing operator: first number = store(result)  --> press number (continues)
    //2. Pressing a number: 


});

//Add a clear button to restart
//Add a clear button to restart
clearButton.addEventListener("click", clearCalculator);

//Create a function to clear the calculator state
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

//Button percentage
percentageButton.addEventListener("click", function() {
    const number = Number(displayContent.value);
    const result = number / 100;
    displayContent.value = result;
    store = result;
    operator = "";
});

signButton.addEventListener("click", function() {
    const number = Number(displayContent.value);
    const result = number * -1;
    store = result;
    displayContent.value = store;   
});

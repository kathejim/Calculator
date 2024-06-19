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

//Create a function to populate the display when clicking the number buttons and store it.
function toDisplay() {
    buttonNumbers.forEach(button => button.addEventListener("click", function(event) {
        console.log("firstNumber: " + firstNumber);
        console.log("secondNumber: " + secondNumber);
        console.log("store: " + store);
        console.log("operator :" + operator);
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
    displayContent.value = 0;
}
toDisplay();

//Store the first number when clicking an operator.
buttonOperators.forEach(button => button.addEventListener("click", function(event) {
    console.log("firstNumber: " + firstNumber);
    console.log("secondNumber: " + secondNumber);
    console.log("store: " + store);
    console.log("operator :" + operator);
    if (firstNumber > 0) {
        secondNumber = Number(store);
        const result = operate(firstNumber, secondNumber, operator);
        displayContent.value = result;
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
}));

//Store the second number when clicking "=".
buttonEnter.addEventListener("click", function() {
    console.log("firstNumber: " + firstNumber);
    console.log("secondNumber: " + secondNumber);
    console.log("store: " + store);
    console.log("operator :" + operator);
    if (firstNumber > 0) {
    secondNumber = Number(store);
    console.log("firstNumber: " + firstNumber);
    console.log("secondNumber: " + secondNumber);
    console.log("store: " + store);
    console.log("operator :" + operator);

    const result = operate(firstNumber, secondNumber, operator);
    displayContent.value = result;
    store = result;
    firstNumber = null;
    secondNumber = null;
    console.log("firstNumber: " + firstNumber);
    console.log("secondNumber: " + secondNumber);
    console.log("store: " + store);
    console.log("operator :" + operator);
    console.log("result: " + result);
    }
});

//Add a clear button to restart

clearButton.addEventListener("click", function() {
    store = "";
    operator = "";
    firstNumber = null;
    secondNumber = null;
    displayContent.value = 0;
});


//Create functions for basic math operators.

const sum = (num1, num2) => num1 + num2;
const subtract = (num1, num2) => num1 - num2;
const multiplication = (num1, num2) => num1 * num2;
const division = (num1, num2) => num1 / num2;

// Create 3 variables for basic operators.
let firstNumber;
let secondNumber;
const operators = ["+", "-", "*", "/"];
const operations = [sum, subtract, multiplication, division];

//Create function operate that calls a function to operate 2 numbers.
function operate(num1, num2, operator) {

    const operatorExist = operators.includes(operator);
    if ((num1 = Number) && (num2 = Number) && operatorExist == true) {
        for (let i = 0; i < 4; i++) {
            if (operator == operators[i]) {
                 return operations[i](num1, num2);
            }
        }
    }
}
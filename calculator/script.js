// Basic math functions
function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) {
        return "Error: Division by zero";
    }
    return a / b;
}

// Variables for calculator operation
let firstNumber = '';
let operator = '';
let secondNumber = '';

// Function to append to display
function appendToDisplay(value) {
    document.getElementById('display').value += value;
    if (operator === '') {
        firstNumber += value;
    } else {
        secondNumber += value;
    }
}

// Function to clear display
function clearDisplay() {
    document.getElementById('display').value = '';
    firstNumber = '';
    operator = '';
    secondNumber = '';
}

// Function to perform calculation
function calculate() {
    if (firstNumber === '' || operator === '' || secondNumber === '') {
        return; // Prevent calculation if not all inputs are provided
    }
    
    const a = parseFloat(firstNumber);
    const b = parseFloat(secondNumber);
    const result = operate(operator, a, b);

    // Round long decimal results
    const displayResult = typeof result === 'number' ? Math.round(result * 1000000) / 1000000 : result;

    document.getElementById('display').value = displayResult;
    firstNumber = displayResult.toString();
    operator = '';
    secondNumber = '';
}

function operate(operator, a, b) {
    switch(operator) {
        case '+': return add(a, b);
        case '-': return subtract(a, b);
        case '*': return multiply(a, b);
        case '/': return divide(a, b);
        default: return "Error: Invalid operator";
    }
}

// Add backspace function
function backspace() {
    const display = document.getElementById('display');
    display.value = display.value.slice(0, -1);
    if (operator === '') {
        firstNumber = firstNumber.slice(0, -1);
    } else {
        secondNumber = secondNumber.slice(0, -1);
    }
    if (display.value === '') {
        display.value = '0';
    }
}

// Function to set the operator
function setOperator(op) {
    if (firstNumber !== '') {
        operator = op;
        document.getElementById('display').value += op;
    }
}

// Add keyboard support
document.addEventListener('keydown', handleKeyPress);

function handleKeyPress(e) {
    if (e.key >= '0' && e.key <= '9') appendToDisplay(e.key);
    if (e.key === '.') appendToDisplay('.');
    if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') setOperator(e.key);
    if (e.key === 'Enter' || e.key === '=') calculate();
    if (e.key === 'Backspace') backspace();
    if (e.key === 'Escape') clearDisplay();
    if (e.key === '%') percentage();
    // Note: There's no standard key for +/-, so we don't add it to keyboard support
}

// Function to toggle the sign of the current number
function toggleSign() {
    const display = document.getElementById('display');
    if (operator === '') {
        firstNumber = (-parseFloat(firstNumber)).toString();
        display.value = firstNumber;
    } else {
        secondNumber = (-parseFloat(secondNumber)).toString();
        display.value = firstNumber + operator + secondNumber;
    }
}

// Function to calculate percentage
function percentage() {
    const display = document.getElementById('display');
    if (operator === '') {
        firstNumber = (parseFloat(firstNumber) / 100).toString();
        display.value = firstNumber;
    } else {
        secondNumber = (parseFloat(secondNumber) / 100).toString();
        display.value = firstNumber + operator + secondNumber;
    }
}

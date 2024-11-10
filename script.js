let operand1 = '';
let operator = '';
let operand2 = '';
let displayValue = '0';
let waitingForOperand = false;

const display = document.querySelector('.display');

const buttons = document.querySelectorAll('button');

buttons.forEach((button) => {
    button.addEventListener('click', () => {
        if (button.value === 'clear') {
          clearDisplay();
        }
        else {
          inputOperation(button.value);
        }
    });
});

function updateDisplay() {
  display.textContent = displayValue;
}

function inputOperation(value) {
  // if number
  if (!isNaN(value)) {
      inputDigit(value);
  }
  // if operator
  else if (['+', '-', '*', '/'].includes(value)) {
      handleOperator(value);
  }
  // if =
  else if (value === '=') {
      calculateResult();
  }
}

// Handle number input
function inputDigit(digit) {
  if (waitingForOperand) {
    displayValue = digit;
    updateDisplay();
    waitingForOperand = false;
  }
  else {
    if (displayValue === '0') {
      displayValue = digit;
      updateDisplay();
    }
    else {
      displayValue += digit;
      updateDisplay();
    }
  }
}

function handleOperator(nextOperator) {
  const inputValue = parseInt(displayValue);

  if (operand1 === '') {
    operand1 = inputValue;
  }
  else if (operator !== '') {
    operand2 = inputValue;
    const res = operate(operator, operand1, operand2);
    displayValue = `${parseInt(res)}`;
    updateDisplay();
    operand1 = res;
  }
  operator = nextOperator;
  waitingForOperand = true;
}

function calculateResult() {
  if (operator !== '' && operand1 !== '') {
    operand2 = parseInt(displayValue);
    const res = operate(operator, operand1, operand2);
    if (res !== null) {
      displayValue = `${res}`;
      operand1 = '';
      operator = '';
      operand2 = '';
      waitingForOperand = true;
      updateDisplay();
    }
  }
}

function clearDisplay() {
  clear();
  updateDisplay();
}

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
    return a / b;
}

function operate(operator, a, b) {
    a = Number(a);
    b = Number(b);
    switch(operator) {
        case '+':
          return add(a, b);
        case '-':
          return subtract(a, b);
        case '*':
          return multiply(a, b);
        case '/':
          if (b === 0) {
            alert('Cannot divide by 0, undefined.')
            return null;
          }
          else {
            return divide(a, b);
          }
        default:
            return null;
      }
}

function clear() {
  displayValue = '0';
  operand1 = '';
  operator = '';
  waitingForOperand = false;
}

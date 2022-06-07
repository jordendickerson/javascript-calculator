const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const outputBox = document.querySelector('#output');
const equalsButton = document.getElementById('=');
const clearButton = document.getElementById('CLR');

let displayText = '';
let operand1 = 0;
let operand2 = 0;
let operator;

// operating functions
function add(x,y) {
	return x+y;
};

function subtract(x,y) {
	return x-y;
};

function multiply(x,y) {
    return x * y;
}

function divide(x,y) {
    return x / y;
}

function operate(operand1, operand2, operator){
    if (operator === '+'){
        return add(parseInt(operand1), parseInt(operand2));
    }else if (operator === '-'){
        return subtract(parseInt(operand1), parseInt(operand2));
    }else if (operator === 'x'){
        return multiply(parseInt(operand1), parseInt(operand2));
    }else if (operator === '/'){
        return divide(parseInt(operand1), parseInt(operand2));
    }
}

//NUMBER BUTTONS
numberButtons.forEach(button => button.addEventListener('click', () => {
    if (displayText.length < 12){
        // change the display text to the id of the button and display it on the output
        displayText += button.id;
        outputBox.textContent = displayText;
    }else{
        return;
    }
    
}));

//OPERATORS
operatorButtons.forEach(button => button.addEventListener('click', () => {
    //change operand1 to an int and set the operator
    operand1 = parseInt(displayText);
    operator = button.id;
    displayText = '';
    outputBox.textContent = displayText;
}));

//EQUALS FUNCTION
equalsButton.addEventListener('click', () => {
    operand2 = displayText;
    let result = operate(operand1, operand2, operator);
    outputBox.textContent = result;
    operator = '';
});

//CLEAR FUNCTION
clearButton.addEventListener('click', () => {
    if (operator == undefined){
        operand1 = '';
        outputBox.textContent = '0';
        displayText = '';
    }else {
        operand2 = '';
        outputBox.textContent = '0';
        displayText = '';
    }
});

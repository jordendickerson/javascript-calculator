const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const outputBox = document.querySelector('#output');
const equalsButton = document.getElementById('=');

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
        return add(operand1, operand2);
    }else if (operator === '-'){
        return subtract(operand1, operand2);
    }else if (operator === 'x'){
        return multiply(operand1, operand2);
    }else if (operator === '/'){
        return divide(operand1, operand2);
    }
}

//add event listeners to number buttons
numberButtons.forEach(button => button.addEventListener('click', () => {
    if (displayText.length < 12){
        // change the display text to the id of the button and display it on the output
        displayText += button.id;
        outputBox.textContent = displayText;
    }else{
        return;
    }
    
}));

//add event listeners to operators
operatorButtons.forEach(button => button.addEventListener('click', () => {
    //change operand1 to an int and set the operator
    operand1 = parseInt(displayText);
    operator = button.id;
}));
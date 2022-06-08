let resetNextInput = false;

const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const outputBox = document.querySelector('#output');
const equalsButton = document.getElementById('=');
const clearButton = document.getElementById('CLR');
const debugDiv = document.querySelector('.debug-div');

let displayText = '';
let operand1;
let operand2;
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
        return add(Number(operand1), Number(operand2));
    }else if (operator === '-'){
        return subtract(Number(operand1), Number(operand2));
    }else if (operator === 'x'){
        return multiply(Number(operand1), Number(operand2));
    }else if (operator === '/'){
        return divide(Number(operand1), Number(operand2));
    }else{
        return null;
    }
}

function evaluate (){
    operand2 = parseInt(displayText);
    let result = operate(operand1, operand2, operator);
    outputBox.textContent = result;
    operand1 = result;
}


//NUMBER BUTTONS
numberButtons.forEach(button => button.addEventListener('click', () => {
    if (displayText.length < 12){
        if (resetNextInput){
            displayText = '';
            resetNextInput = false;
        }
        // change the display text to the id of the button and display it on the output
        displayText += button.id;
        outputBox.textContent = displayText;
    }else{
        return;
    }
    
}));

//OPERATORS
operatorButtons.forEach(button => button.addEventListener('click', () => {
    //if operand1 and operator are defined, operate and place in operand1
    if (operand1 !== undefined && operator !== undefined){
        let result = operate(operand1, Number(outputBox.textContent), operator);
        outputBox.textContent = result;
    }
    //set operator
    operator = button.id;
    //change operand1 to an int
    operand1 = Number(outputBox.textContent);
    resetNextInput = true;
}));

//EQUALS FUNCTION
equalsButton.addEventListener('click', () => {
    if (operand1 === undefined){
        operand1 = outputBox.textContent;
    }else if (operator !== undefined){
        operand2 = outputBox.textContent;
    }
    if (operand1 !== undefined && operand2 !== undefined){
        evaluate();
    }
});

//CLEAR FUNCTION
clearButton.addEventListener('click', () => {
    operand1 = undefined;
    operand2 = undefined;
    operator = undefined;
    displayText = '';
    outputBox.textContent = '';
});

function updateDebugger (){
    debugDiv.textContent = 'Operand 1: ' + operand1 + ', Operand 2: ' + operand2 + ', Operator: '+ operator;
}

setInterval(updateDebugger, 500);

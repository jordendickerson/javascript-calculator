let resetNextInput = false;
let equalsPressed = false;

const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const outputBox = document.querySelector('#output');
const equalsButton = document.getElementById('=');
const clearButton = document.getElementById('CLR');
const decimalButton = document.getElementById('.');
const deleteButton = document.getElementById('delete');
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
        return Math.round(add(Number(operand1), Number(operand2)) * 100) / 100;
    }else if (operator === '-'){
        return Math.round(subtract(Number(operand1), Number(operand2)) * 100) / 100;
    }else if (operator === 'x'){
        return Math.round(multiply(Number(operand1), Number(operand2)) * 100) / 100;
    }else if (operator === '/'){
        if (operand2 == 0){
            alert("YOU CANNOT DIVIDE BY 0!\nYOUR OPERATION WILL NOW BE CLEARED!");
            clear();
            return
        }else{
            return Math.round(divide(Number(operand1), Number(operand2)) * 100) / 100;
        }
    }else{
        return null;
    }
}

function evaluate (){
    operand2 = Number(displayText);
    let result = operate(operand1, operand2, operator);
    outputBox.textContent = result;
    operand1 = result;
}

function clear(){
    operand1 = undefined;
    operand2 = undefined;
    operator = undefined;
    displayText = '';
    outputBox.textContent = '';
}

function addDigit(button) {
    //clear if equals has been pressed
    if (equalsPressed){
        clear();
    }
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
}


//NUMBER BUTTONS
numberButtons.forEach(button => button.addEventListener('click', () => {
    addDigit(button);
}));

//OPERATORS
operatorButtons.forEach(button => button.addEventListener('click', () => {
    // clear if equals has been pressed
    if (equalsPressed){
        clear();
    }
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
        operand1 = Number(outputBox.textContent);
    }else if (operator !== undefined){
        operand2 = Number(outputBox.textContent);
    }
    if (operand1 !== undefined && operand2 !== undefined){
        evaluate();
    }
    if(operand1 !== undefined && operand2 !== undefined){
        equalsPressed = true;
    }
    
});

//CLEAR FUNCTION
clearButton.addEventListener('click', () => {
    clear();
});

//DECIMAL BUTTON
decimalButton.addEventListener('click', () => {
    hasDecimal = (outputBox.textContent).includes(".");
    if (!hasDecimal){
        addDigit(decimalButton);
    }
});

//DELETE BUTTON
deleteButton.addEventListener('click', () => {
    if (outputBox.textContent != 0){
        displayText = outputBox.textContent;
        let outputArray = displayText.split('');
        outputArray.pop();
        let outputText = outputArray.join('');
        outputBox.textContent = outputText;
    }
    if (outputBox.textContent === ''){
        displayText = '';
        outputBox.textContent = displayText;
    }
    
});

function updateDebugger (){
    debugDiv.textContent = 'Operand 1: ' + operand1 + ', Operand 2: ' + operand2 + ', Operator: '+ operator;
}

function updateOperator(){
    if (operator !== undefined){
        operatorButtons.forEach(button => {
            if (button.id === operator){
                button.style.color = "white";
            }else{
                button.style.color = "black";
            }
        }); 
    }
    
}

setInterval(updateOperator, 50);

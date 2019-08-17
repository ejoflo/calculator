let screen = document.querySelector('#scrn');
let result = null;
let resultString = '';
let operatorSymbol = null;
let equalPressed = false;

function getUserInput () {   // listens for user input
  let calcButton = document.querySelectorAll('button');

  calcButton.forEach(function(button) {
    button.addEventListener('click', () => {

      if (equalPressed == true && !isNaN(button.textContent) || button.textContent == 'C') {   // clear the screen
        clearScreen(button.textContent);
      
      } else if (!isNaN(button.textContent) || button.textContent == '.') {   // display digits on screen
        showOnScreen(button.textContent);  
      
      } else if (button.textContent == '⌫' || button.textContent == '=') {   // perform a utility function
        runUtility(button.textContent);

      } else {   // perform an operation
        operate(button.textContent);
        operatorSymbol = button.textContent;      
      }
    });  
  });
}

function showOnScreen(digit) {   
  screen.setAttribute('style', 'color: white');

  if ((digit == 0) && (screen.textContent == 0)) {   // prevents users from inputting zeroes
    screen.textContent = 0;
  
  } else if (screen.textContent.length > 10) {   // prevents user from inputting more than 10 digits

  // } else if (screen.textContent.indexOf('.') != -1) {   // prevents users from inputting more than one decimal
  
  } else if (screen.textContent.split('.').length-1 > 1) {   // prevents users from inputting more than one decimal
    screen.textContent = screen.textContent.slice(0, -1);

console.log('after decimal: ' + screen.textContent);

  } else if ((screen.textContent == 0) && (digit != 0)) {   // displays the first non-zero number
    screen.textContent = '';
    screen.textContent += digit;

  } else {   // draw digits onto calculator screen
    screen.textContent += digit;
  }
}

function operate(operator) {   // perform calculations
  switch (operator) {
      
    case '+':
      if (result == null) {
        result = +screen.textContent;

      } else if ((operatorSymbol != '+') && (operatorSymbol != null)) {   // use a different operator
        operate(operatorSymbol);
        
      } else if ((operatorSymbol == '+') && (screen.textContent == '')) {   // prevents multiple operator presses
        screen.textContent = '';

      } else if (operatorSymbol == '+') {
        add(screen.textContent);
      
      } else if ((equalPressed == true) && (operatorSymbol == null)) {
        operatorSymbol = '+';
        equalPressed = false;
      }
      screen.textContent = '';
      break;

    case '-':
      if (result == null) {
        result = +screen.textContent;
      
      } else if ((operatorSymbol != '-') && (operatorSymbol != null)) {   // use a different operator
        operate(operatorSymbol);
      
      } else if ((operatorSymbol == '-') && (screen.textContent == '')) {   // prevents multiple operator presses
        screen.textContent = '';

      } else if (operatorSymbol == '-') {
        subtract(screen.textContent);
      
      } else if ((equalPressed == true) && (operatorSymbol == null)) {
        operatorSymbol = '-';
        equalPressed = false;
      }
      screen.textContent = '';
      break;

    case '×':
      if (result == null) {
        result = +screen.textContent;

      } else if ((operatorSymbol != '×') && (operatorSymbol != null)) {   // use a different operator
        operate(operatorSymbol);

      } else if ((operatorSymbol == '×') && (screen.textContent == '')) {   // prevents multiple operator presses
        screen.textContent = '';

      } else if (operatorSymbol == '×') {
        multiply(screen.textContent);

      } else if ((equalPressed == true) && (operatorSymbol == null)) {
        operatorSymbol = '×';
        equalPressed = false;
      }
      screen.textContent = '';
      break;

    case '÷':
      if (result == null) {
        result = +screen.textContent;

      } else if ((operatorSymbol != '÷') && (operatorSymbol != null)) {   // use a different operator
        operate(operatorSymbol);

      } else if ((operatorSymbol == '÷') && (screen.textContent == '')) {   // prevents multiple operator presses
        screen.textContent = '';

      } else if (operatorSymbol == '÷') {
        divide(screen.textContent);
      
      } else if ((equalPressed == true) && (operatorSymbol == null)) {
        operatorSymbol = '÷';
        equalPressed = false;
      }
      screen.textContent = '';
      break;

    default:
      break;
    }
}

function add(number) {   // add calculation
   result += +number;
}

function subtract(number) {   // subtract calculation
   result -= +number;
}

function multiply(number) {   // multiply calculation
   result *= +number;
}

function divide(number) {   // divide calculation
  if (number != '0') {
    result = result / +number;

  } else {
    alert("Can't divide by nothing.");
    clearScreen('C');
  }
}

function clearScreen(utilityButton) {   // clear the screen and reset values
  switch (utilityButton) {

    case 'C':
      screen.textContent = 0;
      result = null;
      operatorSymbol = null;
      equalPressed = false;
      break;

    default:
      screen.textContent = '';
      result = null;
      operatorSymbol = null;
      equalPressed = false;
      screen.textContent = utilityButton;
      break;
  }
  screen.setAttribute('style', 'color: white');
}

function runUtility(utilityButton) {   // clear, backspace, and equals utilities
  switch (utilityButton) {

    case '⌫':
      if ((screen.textContent != '') && (equalPressed != true)) {
        screen.textContent = screen.textContent.slice(0, -1);
      } 
      break;
      
    case '=':
      finalResult(operatorSymbol);
      break;

    default:
      break;
  }
}

function finalResult(opSymbol) {   // perform final calculations
  screen.setAttribute('style', 'color: yellow');
  
  switch (opSymbol) {
  
    case '+':
      resultString = +result + +screen.textContent;
      if ((String(resultString).length) >= 7) {   // check to see if number is over 10 digits
        resultString = Number(resultString);
        screen.textContent = resultString.toPrecision(7);
      } else {
        screen.textContent = resultString;
      }
      result = +screen.textContent;
      operatorSymbol = null;
      equalPressed = true;
      break;

    case '-':
      resultString = +result - +screen.textContent;
      if ((String(resultString).length) >= 7) {   // check to see if number is over 10 digits
        resultString = Number(resultString);
        screen.textContent = resultString.toPrecision(7);
      } else {
        screen.textContent = resultString;
      }
      result = +screen.textContent;
      operatorSymbol = null;
      equalPressed = true;
      break;

    case '×':
      resultString = +result * +screen.textContent;
      if ((String(resultString).length) >= 7) {   // check to see if number is over 10 digits
        resultString = Number(resultString);
        screen.textContent = resultString.toPrecision(7);
      } else {
        screen.textContent = resultString;
      }
      result = +screen.textContent;
      operatorSymbol = null;
      equalPressed = true;
      break;
      
    case '÷':
      if (+screen.textContent == 0) {   // protect from dividing by zero
        screen.textContent = 'NOPE';
      } else {
        resultString = +result / +screen.textContent;
        if ((String(resultString).length) >= 7) {   // check to see if number will overflow display
          resultString = Number(resultString);
          screen.textContent = resultString.toPrecision(7);
        } else {
          screen.textContent = resultString;
        }
      }
      result = +screen.textContent;
      operatorSymbol = null;
      equalPressed = true;
      break;
  }
}

getUserInput();   // run the calculator 
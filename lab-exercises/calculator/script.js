let currentExpression = '';
let historyExpression = '';

const displayResult = document.getElementById('result');
const displayHistory = document.getElementById('history');

function appendValue(value) {
    if (displayResult.innerText === 'Error') {
        clearDisplay();
    }
    
    // Reset if we just calculated something and typing a new number
    if (historyExpression.includes('=') && !isNaN(value)) {
        clearDisplay();
    } else if (historyExpression.includes('=') && isNaN(value)) {
        // If typing an operator after equals, continue with previous result
        historyExpression = '';
    }

    if (currentExpression === '0' && value !== '.') {
        currentExpression = value;
    } else {
        currentExpression += value;
    }
    updateDisplay();
}

function clearDisplay() {
    currentExpression = '0';
    historyExpression = '';
    updateDisplay();
}

function deleteLast() {
    if (displayResult.innerText === 'Error' || historyExpression.includes('=')) {
        clearDisplay();
        return;
    }
    
    if (currentExpression.length > 1) {
        currentExpression = currentExpression.slice(0, -1);
    } else {
        currentExpression = '0';
    }
    updateDisplay();
}

function calculate(func) {
    if (displayResult.innerText === 'Error') clearDisplay();
    if (historyExpression.includes('=')) {
        historyExpression = '';
    }

    try {
        let value = eval(currentExpression);
        let result;

        switch (func) {
            case 'sin':
                result = Math.sin(value * Math.PI / 180); // Assume degrees
                historyExpression = `sin(${value})`;
                break;
            case 'cos':
                result = Math.cos(value * Math.PI / 180);
                historyExpression = `cos(${value})`;
                break;
            case 'tan':
                result = Math.tan(value * Math.PI / 180);
                historyExpression = `tan(${value})`;
                break;
            case 'log':
                result = Math.log10(value);
                historyExpression = `log(${value})`;
                break;
            case 'ln':
                result = Math.log(value);
                historyExpression = `ln(${value})`;
                break;
            case 'sqrt':
                result = Math.sqrt(value);
                historyExpression = `√(${value})`;
                break;
            case 'square':
                result = Math.pow(value, 2);
                historyExpression = `sqr(${value})`;
                break;
            case 'power':
                currentExpression += '**';
                updateDisplay();
                return;
            case 'inv':
                result = 1 / value;
                historyExpression = `1/(${value})`;
                break;
            case 'fact':
                result = factorial(value);
                historyExpression = `fact(${value})`;
                break;
            case 'exp':
                result = Math.exp(value);
                historyExpression = `exp(${value})`;
                break;
            case 'percent':
                result = value / 100;
                historyExpression = `${value}%`;
                break;
            case 'pi':
                if (currentExpression === '0' || currentExpression === '') {
                    currentExpression = Math.PI.toString();
                } else {
                    currentExpression += '*' + Math.PI;
                }
                updateDisplay();
                return;
            case 'e':
                if (currentExpression === '0' || currentExpression === '') {
                    currentExpression = Math.E.toString();
                } else {
                    currentExpression += '*' + Math.E;
                }
                updateDisplay();
                return;
        }

        // Format result to avoid floating point issues
        result = parseFloat(result.toPrecision(12));
        currentExpression = result.toString();
        historyExpression += ' =';
        updateDisplay();
        
    } catch (e) {
        currentExpression = 'Error';
        updateDisplay();
    }
}

function factorial(n) {
    if (n < 0) return NaN;
    if (n === 0 || n === 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}

function evaluateExpression() {
    if (displayResult.innerText === 'Error') {
        clearDisplay();
        return;
    }
    
    try {
        // Replace ^ with ** for eval if user typed it, though we use ** directly
        let expr = currentExpression;
        historyExpression = expr + ' =';
        
        let result = eval(expr);
        
        // Handle infinity or NaN
        if (!isFinite(result) || isNaN(result)) {
            throw new Error('Invalid Math');
        }
        
        // Format to avoid trailing long decimals
        result = parseFloat(result.toPrecision(12));
        currentExpression = result.toString();
        
        updateDisplay();
    } catch (error) {
        currentExpression = 'Error';
        updateDisplay();
    }
}

function updateDisplay() {
    displayResult.innerText = currentExpression;
    displayHistory.innerText = historyExpression;
    
    // Resize text if too long
    if (currentExpression.length > 12) {
        displayResult.style.fontSize = '1.5rem';
    } else if (currentExpression.length > 8) {
        displayResult.style.fontSize = '2rem';
    } else {
        displayResult.style.fontSize = '2.5rem';
    }
}

// Keyboard support
document.addEventListener('keydown', function(event) {
    const key = event.key;
    
    if (/[0-9.]/.test(key)) {
        appendValue(key);
    } else if (['+', '-', '*', '/'].includes(key)) {
        appendValue(key);
    } else if (key === 'Enter' || key === '=') {
        event.preventDefault();
        evaluateExpression();
    } else if (key === 'Backspace') {
        deleteLast();
    } else if (key === 'Escape' || key === 'c' || key === 'C') {
        clearDisplay();
    } else if (key === '(' || key === ')') {
        appendValue(key);
    } else if (key === '^') {
        appendValue('**');
    }
});

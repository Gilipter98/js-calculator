let operator = '';
let previousValue = '';
let currentValue = '';

document.addEventListener("DOMContentLoaded", function(){
    let clear = document.querySelector("#clear");
    let equal = document.querySelector("#equal");
    let decimal = document.querySelector("#decimal");

    let numbers = document.querySelectorAll("#number");
    let operators = document.querySelectorAll("#operator");

    let previousScreen = document.querySelector(".previous");
    let currentScreen = document.querySelector(".current");

    numbers.forEach((number) => number.addEventListener("click", function(e){
        handleNumber(e.target.textContent)
        currentScreen.textContent = currentValue;
    }))

    operators.forEach((op) => op.addEventListener("click", function(e){
        handleOperator(e.target.textContent)
        previousScreen.textContent = previousValue + " " + operator;
        currentScreen.textContent = currentValue;
    }))

    clear.addEventListener("click", function(){
        previousValue = '';
        currentValue = '';
        operator = '';
        previousScreen.textContent = previousValue;
        currentScreen.textContent = currentValue;
    })

    equal.addEventListener("click", function(){
        calculate()
        previousScreen.textContent = '';
        if(previousValue.length <= 5){
            currentScreen.textContent = previousValue;
        }else {
            currentScreen.textContent = previousValue.slice(0.5) + '...';
        }
        
    })
})

function handleNumber(num) {
   if(currentValue.length <= 5) { 
    currentValue += num;
}
}

function handleOperator(op) {
    operator = op;
    previousValue = currentValue;
    currentValue = '';

}

function calculate() {
    currentValue = Number(currentValue);
    previousValue = Number(previousValue);

    if(operator === "+") {
        previousValue += currentValue;
    }else if(operator === "-") {
        previousValue -= currentValue;
    }else if(operator === "x") {
        previousValue *= currentValue;
    }else {
        previousValue /= currentValue;
    }

    previousValue = roundNumber(previousValue);
    previousValue = previousValue.toString();
    currentValue = currentValue.toString();
}

function roundNumber(num) {
    return Math.round(num * 1000) / 1000;
}
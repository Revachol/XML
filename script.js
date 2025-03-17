// файл script.js
window.onload = function(){ 

    const toggleSwitch = document.querySelector('.theme-slider input[type="checkbox"]'); 
    
    function switchTheme(e) { 
        if (e.target.checked) { 
            document.documentElement.setAttribute('theme', 'dark'); 
        } 
        else { 
            document.documentElement.setAttribute('theme', 'light'); 
        } 
    } 
    toggleSwitch.addEventListener('change', switchTheme, false);


    let a = ''
    let b = ''
    let expressionResult = ''
    let selectedOperation = null
    
    // окно вывода результата
    outputElement = document.getElementById("result")
    
    // список объектов кнопок циферблата (id которых начинается с btn_digit_)
    digitButtons = document.querySelectorAll('[id ^= "btn_digit_"]')

    function onDigitButtonClicked(digit) {
        if (!selectedOperation) {
            if ((digit != '.') || (digit == '.' && !a.includes(digit))) { 
                a += digit
            }
            outputElement.innerHTML = a
        } else {
            if ((digit != '.') || (digit == '.' && !b.includes(digit))) { 
                b += digit
                outputElement.innerHTML = b        
            }
        }
    }
    
    // устанавка колбек-функций на кнопки циферблата по событию нажатия
    digitButtons.forEach(button => {
        button.onclick = function() {
            const digitValue = button.innerHTML
            onDigitButtonClicked(digitValue)
        }
    });
    
    // установка колбек-функций для кнопок операций
    document.getElementById("btn_op_mult").onclick = function() { 
        if (a === '') return
        selectedOperation = 'x'
    }
    document.getElementById("btn_op_plus").onclick = function() { 
        if (a === '') return
        selectedOperation = '+'
    }
    document.getElementById("btn_op_minus").onclick = function() { 
        if (a === '') return
        selectedOperation = '-'
    }
    document.getElementById("btn_op_div").onclick = function() { 
        if (a === '') return
        selectedOperation = '/'
    }
    document.getElementById("btn_op_percent").onclick = function() { 
        if (a === '') return
        selectedOperation = '%'
    }
    document.getElementById("btn_op_square").onclick = function() { 
        expressionResult = (+a) * a
        a = expressionResult.toString()
        b = ''
        selectedOperation = null
    
        outputElement.innerHTML = a
    }

    function factorial(n){
        if(n==0){
            return 1;
        }else{
            return n * factorial(n-1);
        }
    }

    document.getElementById("btn_op_square").onclick = function() { 
        expressionResult = (+a) * a
        a = expressionResult.toString()
        b = ''
        selectedOperation = null
    
        outputElement.innerHTML = a
    }

    document.getElementById("btn_op_root").onclick = function() { 
        expressionResult = Math.sqrt(a)
        a = expressionResult.toString()
        b = ''
        selectedOperation = null
    
        outputElement.innerHTML = a
    }

    document.getElementById("btn_op_backspace").onclick = function () {
        if (b !== '') {
            b = b.slice(0, -1);
            outputElement.innerHTML = b || '0';
        } else if (selectedOperation) {
            selectedOperation = null;
            outputElement.innerHTML = a; 
        } else {
            a = a.slice(0, -1);
            outputElement.innerHTML = a || '0';
        }
    };
    
    
    // кнопка очищения
    document.getElementById("btn_op_clear").onclick = function() { 
        a = ''
        b = ''
        selectedOperation = ''
        expressionResult = ''
        outputElement.innerHTML = 0
    }
    let lastOperation
    let lastb = 0
    // кнопка расчёта результата
    document.getElementById("btn_op_equal").onclick = function() {
        console.log(a, "|", b, lastOperation, "|", lastb)
        if (a === ''){
            return
        }
        if(b === '' && (lastOperation === '+' || lastOperation === '-')){
            b = lastb;
            selectedOperation = lastOperation
        }    
        lastb = b

        switch(selectedOperation) {
            case 'x':
                expressionResult = (+a) * (+b);
                lastOperation = 'x'
                break;
            case '+':
                expressionResult = (+a) + (+b);
                lastOperation = '+'
                break;
            case '-':
                expressionResult = (+a) - (+b);
                lastOperation = '-'
                break;
            case '/':
                expressionResult = (+a) / (+b);
                lastOperation = '/'
                break;
            case '%':
                expressionResult = (+a) % (+b);
                lastOperation = '%'
                break;
        }
        console.log(a, "|", b, lastOperation, "|", lastb)
        a = expressionResult.toString();
        b = ''
        selectedOperation = null
    
        outputElement.innerHTML = a
    }

    document.getElementById("btn_op_sign").onclick = function() {
        if (!selectedOperation) {
            if (a !== '') {
                a = (-a).toString();
                outputElement.innerHTML = a;
            }
        } else {
            if (b !== '') {
                b = (-b).toString();
                outputElement.innerHTML = b;
            }
        }
    }
    
};
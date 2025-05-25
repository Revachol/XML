//Напишите функцию getSumAndMultOfArray(), который определяет сумму и произведение значений массива.

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

function getSumAndMultOfArray(arr) {
    let sum = 0, mult = 1;
    for (let i = 0; i < arr.length; i++) {
        sum += arr[i];
        mult *= arr[i];
    }
    console.log(sum, " ", mult);
}

readline.question(
    'Введите числа через пробел (например: 1 2 3 4): ',
    input => {
        const inputArray = input.trim().split(/\s+/);
        const { sum, mult } = getSumAndMultOfArray(inputArray);
        console.log('Сумма:', sum, 'Произведение:', mult);
        readline.close();
    }
);
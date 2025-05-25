//Напишите функцию sumOfSquares(arr), которая возвращает сумму квадратов значений массива.

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

function sumOfSquares(arr) {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        sum += arr[i] * arr[i];
    }
    return sum;
}

readline.question(
    'Введите числа через пробел (например: 1 2 3 4): ',
    input => {
        const inputArray = input.trim().split(/\s+/);
        const result = sumOfSquares(inputArray);
        console.log('Сумма квадратов:', result);
        readline.close();
    }
);
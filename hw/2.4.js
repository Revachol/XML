//Напишите функцию diff, которая возвращает массив, содержащий все элементы первого, которые не находятся во втором.

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

function diff(arr1, arr2) {
    result = [];
    for (let i = 0; i < arr1.length; i++) {
        if (!arr2.includes(arr1[i])) {
            result.push(arr1[i]);
        }
    }
    return result;
}

readline.question(
    'Введите первый массив через пробел (например: 1 2 3 4): ',
    input1 => {
        const arr1 = input1.trim().split(/\s+/);
        readline.question(
            'Введите второй массив через пробел (например: 2 4): ',
            input2 => {
                const arr2 = input2.trim().split(/\s+/);
                const result = diff(arr1, arr2);
                console.log('Элементы из первого, которых нет во втором:', result);
                readline.close();
            }
        );
    }
);
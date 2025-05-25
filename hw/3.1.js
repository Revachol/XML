//Напишите функцию merge, которая будет принимать на вход несколько объектов (любое количество), и возвращать единственный объект,
//  содержащий все поля из всех объектов. Если одно и то же поле было в нескольких объектах, необходимо оставить значение,
//  которое встретилось раньше

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

function merge(...objects) {
    const result = {};
    for (const obj of objects) {
        for (const key in obj) {
            if (!(key in result)) {
                result[key] = obj[key];
            }
        }
    }
    return result;
}

readline.question(
    'Введите первый объект (в формате "ключ:значение ключ:значение", например: a:1 b:2): ',
    input1 => {
        const obj1 = parseKeyValueInput(input1);
        readline.question(
            'Введите второй объект (например: b:3 c:4): ',
            input2 => {
                const obj2 = parseKeyValueInput(input2);
                readline.question(
                    'Введите третий объект (например: a:5 d:6): ',
                    input3 => {
                        const obj3 = parseKeyValueInput(input3);
                        const result = merge(obj1, obj2, obj3);
                        console.log('Объединённый объект:', result);
                        readline.close();
                    }
                );
            }
        );
    }
);

function parseKeyValueInput(input) {
    const obj = {};
    input.trim().split(/\s+/).forEach(pair => {
        const [key, value] = pair.split(':');
        if (key && value) obj[key] = isNaN(value) ? value : parseFloat(value);
    });
    return obj;
}
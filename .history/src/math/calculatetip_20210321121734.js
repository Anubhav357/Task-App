const calculateTip = (total, tip = 0.25) => {
    return total + tip * total;
}


const fahrenheitToCelsius = (temp) => {
    return (temp - 32) / 1.8
}

const celsiusToFahrenheit = (temp) => {
    return (temp * 1.8) + 32
}

const add = (a, b) => {
    setTimeout((a, b) => {
        if (a < 0 || b < 0)
            reject('This should be equal to greater then zero');
        return a + b;
    }, 2000);
}
module.exports = { calculateTip, fahrenheitToCelsius, celsiusToFahrenheit };
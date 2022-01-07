const calculateTip = (total, tip = 0.25) => {
    return total + tip * total;
}


const fahrenheitToCelsius = (temp) => {
    return (temp - 32) / 1.8
}

const celsiusToFahrenheit = (temp) => {
    return (temp * 1.8) + 32
}
module.exports = { calculateTip };
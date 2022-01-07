const calculateTip = (total, tip = 0.25) => {
    return total + tip * total;
}

module.exports = { calculateTip };
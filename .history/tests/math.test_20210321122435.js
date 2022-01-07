const { calculateTip, fahrenheitToCelsius, celsiusToFahrenheit, add } = require('../src/math/calculatetip');

test('Tip test1', () => {
    total = calculateTip(10, 0.3);
    expect(total).toBe(13);
})

test('Tip test2', () => {
    total = calculateTip(10);
    expect(total).toBe(12.5);
})

test('fahreneitcheck', () => {
    const val = fahrenheitToCelsius(32);
    expect(val).toBe(0);
})
test('celsiuscheck', () => {
    const val = celsiusToFahrenheit(0);
    expect(val).toBe(32);
})

test('to check two numbers', (done) => {
    add(2, 3).then((sum) => {
        expect(sum).toBe(5);
        done();
    });
})

test('to check two numbers sum', async() => {
    const sum = await add(2, 3);
    expect(sum).toBe(5);
})
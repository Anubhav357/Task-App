const calculateTip = require('../src/math/calculatetip');

test('Tip test1', () => {
    total = calculateTip(10, 0.3);
    expect(total).toBe(13);
})
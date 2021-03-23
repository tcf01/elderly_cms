import {Calculate} from './arith'

const calculate = new Calculate();

test('2 + 3 = 5', () => {
  expect(calculate.add(2, 3)).toBe(5);
});

test('3 * 4 = 12', () => {
  expect(calculate.mul(3, 4)).toBe(12);
});

test('5 - 6 = -1', () => {
  expect(calculate.sub(5, 6)).toBe(-1);
});

test('8 / 4 = 2', () => {
  expect(calculate.div(8, 4)).toBe(2);
});
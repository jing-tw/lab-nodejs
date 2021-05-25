import { sum } from '../foo';
//import { myFun} from '../foo';

test('basic', () => {
  expect(sum()).toBe(0);
});

test('basic again', () => {
  expect(sum(1, 2)).toBe(3);
});

// test('myfun: even test', () => {
//   expect(myFun(2)).toBe(0);
// })

// test('myfun: odd test', () => {
//   expect(myFun(3)).toBe(1);
// })
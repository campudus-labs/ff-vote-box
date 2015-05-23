import Calculator from './Calculator.js';
import abc from '../../frontend/js/Test.js';

describe('Some example specification', () => {

  it('should work to add to numbers in ES6', () => {
    let calc = new Calculator();
    let a = 5;
    let b = 10;

    expect(calc.add(a).add(b).value()).toBe(15);
  });

  it('should be able to import a function', () => {
    expect(abc()).toBe(1);
  });

});

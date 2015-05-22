class Calculator {

  constructor() {
    this.value = 0;
  }

  add(x) {
    this.value += parseFloat(x);
    return this.value;
  }

}

module.exports = Calculator;

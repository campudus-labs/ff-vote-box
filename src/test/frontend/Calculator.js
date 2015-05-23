export default class {
  constructor() {
    this.num = 0;
  }

  add(x) {
    this.num += x;
    return this;
  }

  value() {
    return this.num;
  }
}

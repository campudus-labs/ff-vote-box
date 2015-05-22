let count = 0;

module.exports = {
  get(element) {
    count++;
    element.innerHTML = 'b' + count;
  }
};

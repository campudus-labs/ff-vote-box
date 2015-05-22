let count = 0;

module.exports = {
  say : function (text) {
    count++;
    console.log(count, text);
  }
};

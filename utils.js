const byteToBinaryString = function (buffer) {
  return buffer.toString(2).padStart(8, "0");
};

const reverse = function (string) {
  return string.split("").reverse().join("");
};

module.exports = {
  byteToBinaryString,
  reverse,
};
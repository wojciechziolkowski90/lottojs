const inputs = [...document.querySelectorAll(".digit")];
const playBtn = document.getElementById("play");
const isNotEmpty = (item) => item.value !== "";
const isDigit = (str) => {
  if (typeof str != "string") return false; // we only process strings!
  return (
    !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
    !isNaN(parseFloat(str))
  ); // ...and ensure strings of whitespace fail
};
const isInRange = (item) => item.value >= 1 && item.value <= 49;
const isNotRedundant = (item, items) => {
  const itemsMapped = items.map((element) => parseInt(element.value));
  const result = itemsMapped.filter((element) => element === parseInt(item));
  if (result.length > 1) {
    return false;
  }
  return true;
};
const drawDigits = () => {
  const temp = [];
  while (temp.length < 6) {
    let digit = Math.round(Math.random() * 48 + 1);
    if (!temp.includes(digit)) {
      temp.push(digit);
    }
  }
  return temp;
};
const checkHits = (drawnDigits, userDigits) => {
  const temp = [];
  drawnDigits.forEach((item) => {
    if (userDigits.includes(item)) {
      temp.push(item);
    }
  });
  return temp;
};
playBtn.addEventListener("click", () => {
  let counter = 0;
  inputs.forEach((digit) => {
    if (
      isNotEmpty(digit) &&
      isDigit(digit.value) &&
      isInRange(digit) &&
      isNotRedundant(digit.value, inputs)
    ) {
      counter++;
    } else {
      console.log("error");
    }
  });
  if (counter === 6) {
    const userDigits = inputs.map((item) => parseInt(item.value));
    const drawn = drawDigits();
    const result = checkHits(drawn, userDigits);
    console.log(result);
  }
});


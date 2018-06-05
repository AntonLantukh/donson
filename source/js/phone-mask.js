const setCursorPosition = (pos, elem) => {
  elem.focus();
  if (elem.setSelectionRange) {
    elem.setSelectionRange(pos, pos);
  } else if (elem.createTextRange) {
    const range = elem.createTextRange();
    range.collapse(true);
    range.moveEnd("character", pos);
    range.moveStart("character", pos);
    range.select()
  }
}

const mask = (event) => {
  const matrix = `+7 (___) ___-__-__`;
  const input = event.target;
  let defaultValue = matrix.replace(/\D/g, ``);
  let val = input.value.replace(/\D/g, ``);
  let i = 0;

  input.setCustomValidity(``);

  // Setting to default if 1 value
  if (defaultValue.length >= val.length) {
    val = defaultValue;
   }

  // Modifying mask
  input.value = matrix.replace(/./g, function(element) {
    if (/[_\d]/.test(element) && i < val.length) {
      return val.charAt(i++)
    } else {
      if (i >= val.length) {
        return ``
      } else {
        return element;
      }
    }
  });
  setCursorPosition(input.value.length, input);
};

export default mask;

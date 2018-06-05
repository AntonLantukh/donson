const checkMail = () => {
    const input = document.querySelector(`#mail`);
    if (document.querySelector(`.error__message--mail`)) {
      const message = document.querySelector(`.error__message--mail`)
      const parent = message.parentNode;
      parent.removeChild(message);
    }
    const regPattern = `^[A-Za-z0-9][A-Za-z0-9\.\-_]*[A-Za-z0-9]*@([A-Za-z0-9]+([A-Za-z0-9-]*[A-Za-z0-9]+)*\.)+[A-Za-z]*$`;
    input.setCustomValidity(``);
    if (!input.value) {
      input.setCustomValidity(`Поле не должно быть пустым`);
      input.setAttribute(`style`, `border: 2px solid red`);
      input.insertAdjacentHTML(`afterend`, `<p class="error__message error__message--mail">Поле не должно быть пустым</p>`)
    } else if (!input.value.match(regPattern)) {
      input.setCustomValidity(`Укажите корректный e-mail`);
      input.setAttribute(`style`, `border: 2px solid red`);
      input.insertAdjacentHTML(`afterend`, `<p class="error__message error__message--mail">Укажите корректный e-mail</p>`)
    } else {
      input.setAttribute(`style`, `border: 2px solid limegreen`);
      input.setCustomValidity(``);
    }
   }


const checkName = () => {
    const input = document.querySelector(`#name`);
    if (document.querySelector(`.error__message--name`)) {
      const message = document.querySelector(`.error__message--name`)
      const parent = message.parentNode;
      parent.removeChild(message);
    }
    input.setCustomValidity(``);
    if (!input.value) {
      input.setCustomValidity(`Поле не должно быть пустым`);
      input.setAttribute(`style`, `border: 2px solid red`);
      input.insertAdjacentHTML(`afterend`, `<p class="error__message error__message--name">Поле не должно быть пустым</p>`)
    } else {
      input.setAttribute(`style`, `border: 2px solid limegreen`);
      input.setCustomValidity(``);
    }
  }

const checkPhone = () => {
    const input = document.querySelector(`#phone`);
    if (document.querySelector(`.error__message--phone`)) {
      const message = document.querySelector(`.error__message--phone`)
      const parent = message.parentNode;
      parent.removeChild(message);
    }
    const MAX_LENGTH = 18;
    const MIN_LENGTH = 2;
    input.setCustomValidity(``);
    if (input.value.length === MIN_LENGTH) {
      input.value = ``;
      input.setCustomValidity(`Поле не должно быть пустым`);
      input.setAttribute(`style`, `border: 2px solid red`);
      input.insertAdjacentHTML(`afterend`, `<p class="error__message error__message--phone">Поле не должно быть пустым</p>`)
    } else if (input.value.length < MAX_LENGTH) {
      input.setCustomValidity(`Укажите корректный номер`);
      input.insertAdjacentHTML(`afterend`, `<p class="error__message error__message--phone">Укажите корректный номер</p>`)
      input.setAttribute(`style`, `border: 2px solid red`);
    } else {
      input.setAttribute(`style`, `border: 2px solid limegreen`);
      input.setCustomValidity(``);
    }
  }

  export {checkName, checkMail, checkPhone};

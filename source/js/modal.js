import 'babel-polyfill';
import 'whatwg-fetch';
import mask from './phone-mask.js';
import {checkName, checkMail, checkPhone} from './validation.js';
import uploadData from './uploader.js';

const buttonContact = document.querySelector(`.header-top__call`);
const body = document.querySelector(`body`);
const ESC_KEYCODE = 27;

const modalTemplate = () => {
  return `<div class="modal">
    <buttton class="modal__close">Закрыть</buttton>
    <form class="modal__wrapper" method="post" enctype="multipart/form-data">
      <div class="modal-popup__group">
        <label class="modal-popup__label" for="name">ФИО</label>
        <input class="modal-popup__input" type="text" id="name" name="name" placeholder="Укажите ФИО" required="true">
      </div>
      <div class="modal-popup__group">
        <label class="modal-popup__label" for="phone">Телефон</label>
        <input class="modal-popup__input" type="text" id="phone" name="phone" placeholder="+7(___)___-__-__" required="true">
      </div>
      <div class="modal-popup__group">
        <label class="modal-popup__label" for="mail">E-mail</label>
        <input class="modal-popup__input" type="text" id="mail" name="mail" placeholder="Укажите e-mail" required="true">
      </div>
      <button class="modal__submit main-button" type="submit">Отправить</button>
    </form>
  </div>`;
};

const modalOverlayTemplate = () => {
  return `<div class="modal-overlay"></div>`;
};

// Function to create a node from html template
const getElementFromTemplate = (template) => {
  const container = document.createElement(`div`);
  container.innerHTML = template;
  // Getting rid of div container
  const resultingElement = container.children[0];
  return resultingElement;
};

// Function to hide modal
const hideModal = () => {
  const modal = document.querySelector(`.modal`);
  const modalOverlay = document.querySelector(`.modal-overlay`);
  modal.classList.add('modal--close');
  modalOverlay.classList.add('modalOverlay--close');
  setTimeout(() => {
    body.removeChild(modal);
    body.removeChild(modalOverlay);
  }, 1000);
};

// Function to delete popup at cross sign
const onPopEscPress = (evt) => {
  const modal = document.querySelector(`.modal`);
  if (modal && evt.keyCode === ESC_KEYCODE) {
    hideModal();
    document.removeEventListener(`keydown`, onPopEscPress);
  }
};

// Function to delete popup at overlay click
const onOverlayPress = () => {
  hideModal();
};

// If clicking contact button
buttonContact.addEventListener(`click`, function() {
  // Constructing nodes
  const modal = getElementFromTemplate(modalTemplate());
  const modalOverlay = getElementFromTemplate(modalOverlayTemplate());
  // Appending to DOM
  body.insertAdjacentElement(`beforeEnd`, modal);
  body.insertAdjacentElement(`beforeEnd`, modalOverlay);
  // Setting variables
  const inputs = modal.querySelectorAll(`input`);
  const closeButton = modal.querySelector(`.modal__close`);
  const submitButton = modal.querySelector(`.modal__submit`);
  const phone = modal.querySelector('#phone');
  const mail = modal.querySelector('#mail');
  const name = modal.querySelector('#name');
  // Closing the modal at ESC
  document.addEventListener(`keydown`, onPopEscPress);
  // Validation
  modal.querySelector('#phone').addEventListener('input', mask, false);
  phone.addEventListener('blur', checkPhone, false);
  mail.addEventListener('blur', checkMail, false);
  name.addEventListener('blur', checkName, false);
  // Closing at overlay click
  modalOverlay.addEventListener(`click`, onOverlayPress);
  // Closing the modal at cross sign
  closeButton.addEventListener(`click`, function() {
    hideModal();
  });
  // Closing the modal at submit
  submitButton.addEventListener(`click`, function(event) {
    event.preventDefault();
    const formData = modal.querySelector(`.modal__wrapper`);
    phone.addEventListener('blur', checkPhone(), false);
    mail.addEventListener('blur', checkMail(), false);
    name.addEventListener('blur', checkName(), false);
    const allRight =  Array.from(inputs).every((element) => {
      return element.checkValidity() !== false;
    });
    if (allRight) {
      const data = new FormData(formData);
      uploadData(data);
      hideModal();
    }
  });
});

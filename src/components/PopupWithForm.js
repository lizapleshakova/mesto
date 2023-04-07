import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitForm) {
    super(popupSelector);
    this._submitForm = submitForm;
    this._form = this._popup.querySelector('.popup__input-container');
    this._inputs = this._popup.querySelectorAll('.popup__input');
    this._button = this._popup.querySelector('.popup__submit-btn');
  }

  // собирает данные всех полей
  _getInputValues() {
    const inputsValues = {};

    this._inputs.forEach((input) => {
      inputsValues[input.name] = input.value;
    });
    return inputsValues;
  }

  setInputValues(data) {
    this._inputs.forEach((input) => {
      input.value = data[input.name];
    });
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault()
      this._submitForm(this._getInputValues());

    })
  }
// // UX изменение
//   setSubmitButtonText(isStarted) {
//     if (isStarted) {
//       this._button.textContent = "Сохранение...";
//     } else {
//       this._button.textContent = text;
//     }
//   }

  close() {
    this._form.reset();
    super.close();
  }
}

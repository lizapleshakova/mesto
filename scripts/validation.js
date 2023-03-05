
export class FormValidator {
  constructor(configObj, formElement) {
    this._formSelector = configObj.formSelector;
    this._fieldsetSelector = configObj.fieldsetSelector;
    this._inputSelector = configObj.inputSelector;
    this._submitButtonSelector = configObj.submitButtonSelector;
    this._inactiveButtonClass = configObj.inactiveButtonClass;
    this._inputErrorClass = configObj.inputErrorClass;
    this._errorClass = configObj.errorClass;

    this._formElement = formElement;
  };

  // показать сообщение об ошибке
  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
    };

  // скрыть сообщение об ошибке
  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.textContent = '';
  };

  // проверка валидности поля
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {

      this._showInputError(inputElement, inputElement.validationMessage);
    } else {

      this._hideInputError(inputElement);
    }
  };

  _hasInvalidInput = () => {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }
  // активная / неактивная кнопка submit
  _toggleButtonState = () => {

    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.setAttribute("disabled", "");
    } else {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.removeAttribute("disabled");

    }
  };

  // слушатели
  _setEventListeners = () => {

    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);

    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {

      inputElement.addEventListener('input', () => {

        this._toggleButtonState();
        this._checkInputValidity(inputElement)
      });
    });
  }

  enableValidation() {
    this._setEventListeners();
  }
}

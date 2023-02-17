
const obj = {
  formSelector: '.popup__container',
  fieldsetSelector: '.popup__input-container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-btn',
  inactiveButtonClass: 'popup__submit-btn_inactive',
  inputErrorClass: 'popup__input_form_error',
  errorClass: 'popup__input-error_active'
};

const showInputError = (obj, formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(obj.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(obj.errorClass);
};

const hideInputError = (obj, formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(obj.inputErrorClass);
  errorElement.classList.remove(obj.errorClass);
  errorElement.textContent = '';
};

// Проверка валидности поля
const checkInputValidity = (obj, formElement, inputElement) => {
  if (!inputElement.validity.valid) {

    showInputError(obj, formElement, inputElement, inputElement.validationMessage);
  } else {

    hideInputError(obj, formElement, inputElement);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}

const toggleButtonState = (obj, inputList, buttonElement) => {

  if (hasInvalidInput(inputList)) {

    buttonElement.classList.add(obj.inactiveButtonClass);
    buttonElement.setAttribute("disabled", "");
  } else {

    buttonElement.classList.remove(obj.inactiveButtonClass);
    buttonElement.removeAttribute("disabled");
  }
};

const setEventListeners = (obj, formElement) => {

  const inputList = Array.from(formElement.querySelectorAll(obj.inputSelector));
  const buttonElement = formElement.querySelector(obj.submitButtonSelector);

  toggleButtonState(obj, inputList, buttonElement);

  inputList.forEach((inputElement) => {

    inputElement.addEventListener('input', () => {

      toggleButtonState(obj, inputList, buttonElement);
      checkInputValidity(obj, formElement, inputElement)

    });
  });
};

const enableValidation = (obj) => {
  const formList = Array.from(document.querySelectorAll(obj.formSelector));
  formList.forEach((formElement) => {
    const fieldsetList = Array.from(formElement.querySelectorAll(obj.fieldsetSelector))
    fieldsetList.forEach((fieldset) => {
      setEventListeners(obj, fieldset);
    })
  })
}

enableValidation(obj);

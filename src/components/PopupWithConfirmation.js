import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);

    this._form = this._popup.querySelector('.popup__input-container');
    this._button = this._popup.querySelector('.popup__submit-btn');
  };


  setSubmitHandler(handler) {
    this._handleSubmit = handler;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleSubmit();
    });
  }

  open() {
    super.open();

  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._button.textContent = "Да"
    }
    else{
      this._button.textContent = "..."
    }
  }
}

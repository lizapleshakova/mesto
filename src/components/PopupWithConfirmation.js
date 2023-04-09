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
    this._button.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleSubmit({_id: this._id});
    });

  }

  open({_id}) {
    super.open();
    this._id = _id;
  }
}

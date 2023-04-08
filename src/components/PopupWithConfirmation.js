import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._submit = submitConfirmation;
    this._form = this._popup.querySelector('.popup__input-container');
    this._button = this._popup.querySelector('.popup__submit-btn');
  };

  // _onSubmit = evt => {
	// 	this._submit(evt, { cardId: this._cardId, card: this._card })
	// };

	// open(cardId, card) {
	// 	super.open();
	// 	this._cardId = cardId;
	// 	this._card = card;
	// };

  setEventListeners() {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._formSubmit(...this._args);
    });
    super.setEventListeners();
  }

  open(...args) {
    super.open();
    this._args = [...args];
  }


	// setEventListeners() {
	// 	super.setEventListeners();
	// 	this._form.addEventListener('submit', this._onSubmit);
	// };

}

import { zoomImage, zoomCaption, popupZoomImage } from './constans.js'
import { openPopup } from './index.js';

export default class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
  }

  // создание шаблона
  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector('.card')
      .cloneNode(true);
    return cardElement;
  }
  generateCard() {
    this._element = this._getTemplate();

    this._elementImage = this._element.querySelector('.card__image');
    this._elementTitle = this._element.querySelector('.card__title');
    this._elementLike = this._element.querySelector('.card__like');
    this._elementDelete = this._element.querySelector('.card__delete');

    this._elementTitle.textContent = this._name;
    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;

    this._setEventListeners();

    return this._element;
  }

  _handleOpenPopup() {
    zoomImage.src = this._link;
    zoomCaption.textContent = this._name;
    zoomImage.alt = this._name;
    openPopup(popupZoomImage);
  }

    // лайки
  _toggleLikeCard() {
    this._elementLike.classList.toggle('card__like_active');
  }

  // корзина
  _deleteCard() {
    this._element.remove();
    this._element = null;
  }

  // слушатели
  _setEventListeners() {

    this._elementImage.addEventListener('click', () => {
      this._handleOpenPopup();
  });

  this._elementLike.addEventListener('click', () => {
      this._toggleLikeCard();
    })

    this._elementDelete.addEventListener('click', () => {
      this._deleteCard();
    })
  }
}


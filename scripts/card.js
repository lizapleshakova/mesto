import { zoomImage, zoomCaption, popupZoomImage, openPopup } from './index.js'

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
    this._elementDelete.closest('.card').remove();
  }

  // слушатели
  _setEventListeners() {

    this._elementImage.addEventListener('click', () => {
      this._handleOpenPopup();
  });

    this._element.querySelector('.card__like').addEventListener('click', () => {
      this._toggleLikeCard();
    })

    this._element.querySelector('.card__delete').addEventListener('click', () => {
      this._deleteCard();
    })
  }
}




// class Card {
//   constructor(data, templateSelector, openPopupImage) {
//     this._data = data;
//     this._templateSelector = templateSelector;

//     this._openPopupImage = openPopupImage;
//   }

//   // создание шаблона
//   _getTemplate() {
//     const cardElement = document
//       .querySelector(this._templateSelector)
//       .content.querySelector('.card')
//       .cloneNode(true);
//     return cardElement;
//   }

//   // создание новой карточки
//   generateCard() {
//     this._element = this._getTemplate();

//     this._elementImage = this._element.querySelector('.card__image');
//     this._elementTitle = this._element.querySelector('.card__title');
//     this._elementLike = this._element.querySelector('.card__like');
//     this._elementDelete = this._element.querySelector('.card__delete');

//     this._elementTitle.textContent = this._data.name;
//     this._elementImage.src = this._data.link;
//     this._elementImage.alt = this._data.name;

//     this._setEventListeners();

//     return this._element;
//   }

//   // лайки
//   _toggleLikeCard() {
//     this._elementLike.classList.toggle('card__like_active');
//   }

//   // корзина
//   _deleteCard() {
//     this._elementDelete.closest('.card').remove();
//   }

//   // слушатели
//   _setEventListeners() {

//     this._elementImage.addEventListener('click', () =>
//       this._openPopupImage(this._data)
//     );

//     this._element.querySelector('.card__like').addEventListener('click', () => {
//       this._toggleLikeCard();
//     })

//     this._element.querySelector('.card__delete').addEventListener('click', () => {
//       this._deleteCard();
//     })
//   }
// }




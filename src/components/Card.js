export default class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._clickImageHandler = handleCardClick;
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

  _handleImageClick() {
    this._clickImageHandler({ name: this._name, link: this._link })
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
      this._handleImageClick();
    });

    this._elementLike.addEventListener('click', () => {
      this._toggleLikeCard();
    })

    this._elementDelete.addEventListener('click', () => {
      this._deleteCard();
    })
  }
}

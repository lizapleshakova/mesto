export default class Card {
  constructor(data, userId, templateSelector, handleCardClick, {handlePutLike,
    handleDeleteLike},) {
    this._name = data.name;
    this._link = data.link;
    this._ownerId = data.owner._id;
    this._userId = userId;
    this._id = data._id; // идентификатор карточек
    this._likes = data.likes;
    this._templateSelector = templateSelector;
    this._clickImageHandler = handleCardClick;
    this._handlePutLike = handlePutLike;
    this._handleDeleteLike = handleDeleteLike;
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
    this._likesCounter = this._element.querySelector('.card__like-counter');

    this._elementTitle.textContent = this._name;
    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;
    this._likesCounter.textContent = this._likes.length;

    this._checkUserId();
    this._isLiked();
    this._setEventListeners();

    return this._element;
  }

  _handleImageClick() {
    this._clickImageHandler({ name: this._name, link: this._link })
  }

  _hasTrash() {
    if (this._userId !== this._ownerId) {
      this._trash.remove();
    }
  }

  _switchLikes() {
    if (this._elementLike.classList.contains('card__like_active')) {
      this._handleDeleteLike(this._id);
    } else {
      this._handlePutLike(this._id);
    }
  }

  _isLiked() {
    if (
      this._likes.some((data) => {
        return this._userId === data._id;
      })
    ) {
      this._elementLike.classList.add('card__like_active');
    }
  }

  toggleLikeCard(data) {
    this._elementLike.classList.toggle('card__like_active');
    this._likes = data.likes;
    this._likesCounter.textContent = this._likes.length;
  }

  // корзина
  _deleteCard() {
    this._element.remove();
    this._element = null;
  }

  _checkUserId() {
    if (this._userId !== this._ownerId) {
      this._elementDelete.remove();
    }
  }


  // слушатели

  _setEventListeners() {
    this._elementImage.addEventListener('click', () => {
      this._handleImageClick();
    });

    this._elementLike.addEventListener('click', () => {
      this._switchLikes();
    })

    this._elementDelete.addEventListener('click', () => {
      this._deleteCard();
    })
  }
}


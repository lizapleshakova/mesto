import '../pages/index.css';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import UserInfo from '../components/UserInfo.js';

import { configObj } from '../untils/validationObj.js';
import { FormValidator } from '../components/FormValidator.js';
import Api from '../components/Api.js';
import {
  formInputCard, popupProfileOpen, popupAddImageOpen, formInputProfile, containerSelector,
  popupZoomImageSelector, popupAddCardSelector, popupProfileSelector, nameSelector, aboutSelector, avatarSelector, popupEditAvatarSelector,
  popupEditAvatarOpen, formInputAvatar, cardsTemplate, popupConfirmationSelector
} from '../untils/constans.js';

// API
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-63',
  headers: {
    authorization: 'c4212045-3513-440b-9652-62d1db009ae6',
    'Content-Type': 'application/json',
  },
});

const getServerData = [api.getUserInfo(), api.getCards()];
let userId;

Promise.all(getServerData)
  .then(([userData, cards]) => {
    userId = userData._id;
    userInfo.setUserInfo(userData);
    userInfo.setAvatar(userData);
    cardSection.renderItems(cards);
  })
  .catch((err) => console.log(`Ошибка получения данных: ${err}`));


// создание новой карточки
function createCard(item) {
  const cardElement = new Card(
    item,
    userId,
    cardsTemplate,
    clickImageHandler,
    {
      handleAddLike: (_id) => {
        api
          .addLike(_id)
          .then((data) => {
            cardElement.toggleLikeCard(data);
          })
          .catch((err) => console.log(`Ошибка получения данных: ${err}`));
      },
      handleDeleteLike: (_id) => {
        api
          .removeLike(_id)
          .then((data) => {
            cardElement.toggleLikeCard(data);
          })
          .catch((err) => console.log(`Ошибка получения данных: ${err}`));
      },
      handleCardDelete: (_id) => {
        popupConfirmation.open();
        popupConfirmation.renderLoading(true);
        popupConfirmation.setSubmitHandler(() => {
          api
            .removeCard(_id)
            .then(() => {
              popupConfirmation.close();
              cardElement.deleteCard();
            })
            .catch((err) => console.log(`Ошибка получения данных: ${err}`))
            .finally(() => {
              popupConfirmation.renderLoading(false);
            });
        });
      },
    }
  );
  const generatedCard = cardElement.generateCard();
  return generatedCard;
}

// открытие попапа с картинкой

const clickImageHandler = (data) => {
  popupWithImage.open(data);
}


// вставка карточек на страницу
const cardSection = new Section({ renderer: createCard }, containerSelector);

// Попап с подтверждением удаления карточки
const popupConfirmation = new PopupWithConfirmation(popupConfirmationSelector);
popupConfirmation.setEventListeners();


// Попап редактирования профиля
const userInfo = new UserInfo({ nameSelector, aboutSelector, avatarSelector });

const handleSubmitPopupProfile = ({ name, about }) => {
  popupProfile.renderLoading(true);
  api
    .setProfile({ name, about })
    .then((res) => {
      userInfo.setUserInfo(res);
      popupProfile.close();
    })
    .catch((err) => console.log(`Ошибка получения данных: ${err}`))
    .finally(() => {
      popupProfile.renderLoading(false);
    });
}


const popupProfile = new PopupWithForm(popupProfileSelector, handleSubmitPopupProfile)
popupProfile.setEventListeners();

// Попап с картикой
const popupWithImage = new PopupWithImage(popupZoomImageSelector);
popupWithImage.setEventListeners();

// попап добавления карточки
const handleSubmitAddCard = (data) => {
  popupAddCard.renderLoading(true);
  api
    .setCard({ name: data.img_name, link: data.img_url })
    .then((card) => {
      cardSection.addItem(createCard(card));
      popupAddCard.close();
    })
    .catch((err) => console.log(`Ошибка получения данных: ${err}`))
    .finally(() => {
      popupAddCard.renderLoading(false);
    });
}

const popupAddCard = new PopupWithForm(popupAddCardSelector, handleSubmitAddCard);
popupAddCard.setEventListeners();


// попап изменения аватара

const handleEditAvatar = (data) => {
  popupAvatar.renderLoading(true);
  api.setAvatar(data)
    .then((res) => {
      userInfo.setAvatar(res);
      popupAvatar.close();
    })
    .catch((err) => console.log(`Ошибка получения данных: ${err}`))
    .finally(() => {
      popupAvatar.renderLoading(false);
    });
}

const popupAvatar = new PopupWithForm(popupEditAvatarSelector, handleEditAvatar);
popupAvatar.setEventListeners();

//открытие попапа изменения аватара
function handleEditAvatarClick() {
  validationEditAvatar.enableValidation();
  popupAvatar.open();
}

//открытие попапа добавления новой картинки
function handleAddButtonClick() {
  validationAddImage.enableValidation();
  popupAddCard.open();
}

// открытие попапа редактирования профиля
function handleEditButtonClick() {
  popupProfile.setInputValues(userInfo.getUserInfo());
  validationProfile.enableValidation();
  popupProfile.open();
}

// слушатели на кнопку открытия попапов с картинкой и редактирования профиля
popupAddImageOpen.addEventListener('click', handleAddButtonClick);
popupProfileOpen.addEventListener('click', handleEditButtonClick);
popupEditAvatarOpen.addEventListener('click', handleEditAvatarClick);

// Валидация
// формы валидации
const validationProfile = new FormValidator(configObj, formInputProfile)
const validationAddImage = new FormValidator(configObj, formInputCard)
const validationEditAvatar = new FormValidator(configObj, formInputAvatar)

// валидация
validationProfile.enableValidation();
validationAddImage.enableValidation();
validationEditAvatar.enableValidation();


import '../pages/index.css';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import { initialCards } from '../untils/cardArr.js';
import { configObj } from '../untils/validationObj.js';
import { FormValidator } from '../components/FormValidator.js';
import Api from '../components/Api.js';
import {
  formInputCard, popupProfileOpen, popupAddImageOpen, formInputProfile, containerSelector,
  popupZoomImageSelector, popupAddCardSelector, popupProfileSelector, nameSelector, aboutSelector, avatarSelector, avatarContainer, popupEditAvatarSelector,
  popupAvatar, popupEditAvatarOpen, formInputAvatar, urlInputAvatar
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

  Promise.all(getServerData)
  .then(([userData, cards]) => {
    userInfo.setUserInfo(userData);
    cardSection.renderItems(cards);
  })
  .catch((err) => console.log(`Ошибка получения данных: ${err}`));

// создание новой карточки
function createCard(item) {
  const cardElement = new Card(
    item,
    '#card-template',
    clickImageHandler).generateCard();
    return cardElement;
  }

// вставка карточек на страницу
const cardSection = new Section({renderer: createCard}, containerSelector);


// Попап редактирования профиля
const userInfo = new UserInfo({nameSelector, aboutSelector, avatarSelector });
const handleSubmitPopupProfile = ({name, about, avatar}) => {
userInfo.setUserInfo({name, about, avatar});
}

const popupProfile = new PopupWithForm(popupProfileSelector, handleSubmitPopupProfile)
popupProfile.setEventListeners();

// Попап с картикой
const popupWithImage = new PopupWithImage(popupZoomImageSelector);
popupWithImage.setEventListeners();

// попап добавления карточки
const handleSubmitAddCard = ({ img_name, img_url }) => {
  cardSection.addItem(createCard({name: img_name, link: img_url}));
  }

const popupAddCard = new PopupWithForm(popupAddCardSelector, handleSubmitAddCard);
popupAddCard.setEventListeners();

// открытие попапа с картинкой

const clickImageHandler = (data) => {
    popupWithImage.open(data);
}

// попап изменения аватара
const handleSubmitEditPopap = ({ img_url }) => {
  cardSection.addItem(createCard({name: img_name, link: img_url}));
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

//открытие попапа изменения аватара
function handleEditAvatarClick() {
  validationEditAvatar.enableValidation();
  popupAvatar.open();
}

// слушатели на кнопку открытия попапов с картинкой и редактирования профиля
popupAddImageOpen.addEventListener('click', handleAddButtonClick);
popupProfileOpen.addEventListener('click', handleEditButtonClick);
popupEditAvatarOpen.addEventListener('click', handleEditAvatarClick);


// Валидация
// формы валидации
const validationProfile = new FormValidator(configObj, formInputProfile)
const validationAddImage = new FormValidator(configObj, formInputCard)
const validationEditAvatar= new FormValidator(configObj, formInputAvatar)

// валидация
validationProfile.enableValidation();
validationAddImage.enableValidation();
validationEditAvatar.enableValidation();

import '../pages/index.css';

import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import { initialCards } from '../untils/cardArr.js';
import { configObj } from '../untils/validationObj.js';
import { FormValidator } from '../components/FormValidator.js';
import {
  formInputCard, popupProfileOpen, popupAddImageOpen, formInputProfile, containerSelector,
  popupZoomImageSelector, popupAddCardSelector, popupProfileSelector, nameSelector, aboutSelector
} from '../untils/constans.js';


// Валидация
// формы валидации
const validationProfile = new FormValidator(configObj, formInputProfile)
const validationAddImage = new FormValidator(configObj, formInputCard)

// валидация
validationProfile.enableValidation();
validationAddImage.enableValidation();

// Попап редактирования профиля
const userInfo = new UserInfo({nameSelector, aboutSelector });

const handleSubmitPopupProfile = ({username, description}) => {
userInfo.setUserInfo({username, description});
}

const popupProfile = new PopupWithForm(popupProfileSelector, handleSubmitPopupProfile)
popupProfile.setEventListeners();


// Попап с картикой

const popupWithImage = new PopupWithImage(popupZoomImageSelector);
popupWithImage.setEventListeners();


const handleSubmitAddCard = ({ img_name, img_url }) => {
  cardSection.addItem(createCard({name: img_name, link: img_url}));
  }
const popupAddCard = new PopupWithForm(popupAddCardSelector, handleSubmitAddCard);
popupAddCard.setEventListeners();

// открытие попапа с картинкой
const clickImageHandler = (data) => {
    popupWithImage.open(data);
}

// создание новой карточки
function createCard(item) {
  const cardElement = new Card(
    item,
    '#card-template',
    clickImageHandler).generateCard();
    return cardElement;
  }

const cardSectionData = {
  items: initialCards,
  renderer: createCard,
};

// вставка карточек на страницу
const cardSection = new Section(cardSectionData, containerSelector);
cardSection.renderItems();


//открытие попапа добавления новой картинки
function handleAddButtonClick() {
  validationAddImage.inactiveButton();
  popupAddCard.open();
}

// открытие попапа редактирования профиля
function handleEditButtonClick() {
  popupProfile.setInputValues(userInfo.getUserInfo());
  validationProfile.inactiveButton();
  popupProfile.open();
}

// слушатели на кнопку открытия попапов с картинкой и редактирования профиля
popupAddImageOpen.addEventListener('click', handleAddButtonClick);

popupProfileOpen.addEventListener('click', handleEditButtonClick)


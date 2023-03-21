import Card from './Card.js';
import Section from './Section.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js';
import { initialCards } from './cardArr.js';
import { configObj } from './validationObj.js';
import { FormValidator } from './FormValidator.js';
import {
  formInputCard, popupProfileOpen, popupAddImageOpen, formInputProfile, containerSelector,
  popupZoomImageSelector, popupAddCardSelector, popupProfileSelector, nameSelector, aboutSelector
} from './constans.js';


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

popupProfileOpen.addEventListener('click', handleEditButtonClick)


import {
  popups, popupProfile, popupAddImage, elementList, formInputCard, nameInputCard, urlInputCard,
  popupProfileOpen, popupAddImageOpen, formInputProfile, nameInput, jobInput, profileName, profileJob
} from './constans.js';

import Card from './card.js';
import { initialCards } from './cardArr.js';
import { configObj } from './validationObj.js';
import { FormValidator } from './validation.js';


// формы валидации
const validationProfile = new FormValidator(configObj, formInputProfile)
const validationAddImage = new FormValidator(configObj, formInputCard)

// валидация
validationProfile.enableValidation();
validationAddImage.enableValidation();

// Открытие попапов. Общая функция
export const openPopup = function (popup) {
  popup.classList.add('popup_opened')
  document.addEventListener('keydown', closeByEsc);
}

// Открытие попапа профиля
popupProfileOpen.addEventListener('click', () => {
  openPopup(popupProfile)
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
})

// Открытие попапа добавления новой карточки
popupAddImageOpen.addEventListener('click', () => {
  openPopup(popupAddImage)
})

// Общая функция закрытия попапов
const closePopup = function (popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEsc);
}

// Закрытие по крестику и по Overlay
popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup)
    }
    if (evt.target.classList.contains('popup__close-btn')) {
      closePopup(popup)
    }
  })
})

// Закрытие по ESC
function closeByEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened')
    closePopup(openedPopup)
  }
}

// создание новой карточки
function renderCard(item) {
  const card = new Card(item, '#card-template');
  const cardElement = card.generateCard();

  elementList.prepend(cardElement);
}

// добавляем массив из карточек
initialCards.forEach(item => renderCard(item));

// сохранение данных новой карточки
function handlePopupAddImage(evt) {
  evt.preventDefault();

  const dataObj = {
    name: nameInputCard.value,
    link: urlInputCard.value,
  };

  renderCard(dataObj);
  closePopup(popupAddImage);
  formInputCard.reset(); // удаление из формы предыдущих значений
  validationAddImage.inactiveButton();
}

// слушатель  на форму добавления новой карточки
formInputCard.addEventListener('submit', handlePopupAddImage);

// сохранение данных формы редактирования профиля
function handlePopupProfile(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupProfile)
}
// слушатель  на форму редактирования профиля
formInputProfile.addEventListener('submit', handlePopupProfile);

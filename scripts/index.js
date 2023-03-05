import Card from './card.js'
import {initialCards} from './cardArr.js'
import { FormValidator } from './validation.js';

// Валидация
const configObj = {
  formSelector: '.popup__container',
  fieldsetSelector: '.popup__input-container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-btn',
  inactiveButtonClass: 'popup__submit-btn_inactive',
  inputErrorClass: 'popup__input_form_error',
  errorClass: 'popup__input-error_active'
};

// popups
const popups = document.querySelectorAll('.popup')
const popupElement = document.querySelector('.popup');
const popupProfile = document.querySelector('.popup_edit-profile');
const popupAddImage = document.querySelector('.popup_add-content');
export const popupZoomImage = document.querySelector('.popup_zoom-content');


// контейнер для карточек
const elementList = document.querySelector('.elements')

// inputs for add Image
const formInputCard = popupAddImage.querySelector('.popup__input-container'); // форма с инпутами
const nameInputCard = formInputCard.querySelector('.popup__input_form_image-title');  // инпут для названия
const urlInputCard = formInputCard.querySelector('.popup__input_form_url');  // инпут для ссылки

// popups close buttons
const popupProfileClose = popupProfile.querySelector('.popup__close-btn');
const popupAddImageClose = popupAddImage.querySelector('.popup__close-btn');

// popups submit buttons
const popupProfileSubmit = popupProfile.querySelector('.popup__submit-btn');
const popupAddImageSubmit = popupAddImage.querySelector('.popup__submit-btn');

// popups open buttons
const popupProfileOpen = document.querySelector('.profile__edit-btn');
const popupAddImageOpen = document.querySelector('.profile__add-btn');

// inputs for edit profile
const formInputProfile = popupProfile.querySelector('.popup__input-container');
const nameInput = formInputProfile.querySelector('.popup__input_form_usermane');
const jobInput = formInputProfile.querySelector('.popup__input_form_description');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__description');

// zoom
export const zoomImage = popupZoomImage.querySelector('.popup__zoom-image');
export const zoomCaption = popupZoomImage.querySelector('.popup__image-caption');

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

// добавляем массив из карточек
initialCards.forEach((item) => {
  const card = new Card(item, '#card-template');
  const cardElement = card.generateCard();

  // Добавляем в DOM
  document.querySelector('.elements').append(cardElement);
});

// Добавление новой карточка

const addNewCard = (evt) => {
  evt.preventDefault();

  const dataObj = {
    name: nameInputCard.value,
    link: urlInputCard.value,
  };

  const card = new Card(dataObj, "#card-template").generateCard();

  elementList.prepend(card);
  closePopup(popupAddImage);

  formInputCard.reset(); // удаление из формы предыдущих значений
  popupAddImageSubmit.classList.add('popup__submit-btn_inactive')
  popupAddImageSubmit.setAttribute("disabled", "");
};

// слушатель на форму! добавления новой карточки
formInputCard.addEventListener('submit', addNewCard);


function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupProfile)
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formInputProfile.addEventListener('submit', handleFormSubmit);





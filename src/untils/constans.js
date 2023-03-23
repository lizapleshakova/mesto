
// Селекторы
export const containerSelector = '.elements';
export const popupZoomImageSelector = '.popup_zoom-content';
export const popupAddCardSelector = '.popup_add-content';
export const popupProfileSelector = '.popup_edit-profile';
export const nameSelector = '.profile__name';
export const aboutSelector = '.profile__description';

// popups
export const popups = document.querySelectorAll('.popup')
const popupElement = document.querySelector('.popup');
export const popupProfile = document.querySelector('.popup_edit-profile');
export const popupAddImage = document.querySelector('.popup_add-content');
export const popupZoomImage = document.querySelector('.popup_zoom-content');

// контейнер для карточек
export const elementList = document.querySelector('.elements')

// inputs for add Image
export const formInputCard = popupAddImage.querySelector('.popup__input-container'); // форма с инпутами
export const nameInputCard = formInputCard.querySelector('.popup__input_form_image-title');  // инпут для названия
export const urlInputCard = formInputCard.querySelector('.popup__input_form_url');  // инпут для ссылки

// popups close buttons
const popupProfileClose = popupProfile.querySelector('.popup__close-btn');
const popupAddImageClose = popupAddImage.querySelector('.popup__close-btn');

// popups submit buttons
const popupProfileSubmit = popupProfile.querySelector('.popup__submit-btn');
const popupAddImageSubmit = popupAddImage.querySelector('.popup__submit-btn');

// popups open buttons
export const popupProfileOpen = document.querySelector('.profile__edit-btn');
export const popupAddImageOpen = document.querySelector('.profile__add-btn');

// inputs for edit profile
export const formInputProfile = popupProfile.querySelector('.popup__input-container');
export const nameInput = formInputProfile.querySelector('.popup__input_form_usermane');
export const jobInput = formInputProfile.querySelector('.popup__input_form_description');
export const profileName = document.querySelector('.profile__name');
export const profileJob = document.querySelector('.profile__description');

// zoom
export const zoomImage = popupZoomImage.querySelector('.popup__zoom-image');
export const zoomCaption = popupZoomImage.querySelector('.popup__image-caption');



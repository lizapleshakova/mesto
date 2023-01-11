// Открытие и закрытие попапа
// Находим форму в DOM
let popupElement = document.querySelector('.popup');

let popupOpenButtonElement = document.querySelector('.profile__edit-btn');
let popupCloseButtonElement = popupElement.querySelector('.popup__close-btn');
let nameInput = popupElement.querySelector('.popup__input_form_usermane');
let jobInput = popupElement.querySelector('.popup__input_form_description');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__description');

//Открытие попапа
let popupOpen = function() {
  popupElement.classList.add('popup__opened')
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
};

popupOpenButtonElement.addEventListener('click', popupOpen);

//Закрытие попапа
let popupClose = function() {
  popupElement.classList.remove('popup__opened')
};
popupCloseButtonElement.addEventListener('click', popupClose);



// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
popupElement.addEventListener('submit', handleFormSubmit);
popupElement.addEventListener('submit', popupClose);


// Открытие и закрытие попапа

// Находим форму в DOM
let popupElement = document.querySelector('.popup');

let popupOpenButtonElement = document.querySelector('.profile__edit-btn');
let popupCloseButtonElement = popupElement.querySelector('.popup__close-btn');

//Открытие попапа
let popupOpen = function() {
  popupElement.classList.add('popup__opened')

};
popupOpenButtonElement.addEventListener('click', popupOpen);

//Закрытие попапа
let popupClose = function() {
  popupElement.classList.remove('popup__opened')
};
popupCloseButtonElement.addEventListener('click', popupClose);


// Находим форму в DOM
let formElement = document.querySelector('popup__input-container');
// Находим поля формы в DOM
let nameInput = formElement.querySelector('.popup__username');
let jobInput = formElement.querySelector('.popup__description');

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit (evt) {
    evt.preventDefault();
    // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

    // Получите значение полей jobInput и nameInput из свойства value
      nameInput.value = profileName.textContent;
      jobInput.value = profileJob.textContent;
    // Выберите элементы, куда должны быть вставлены значения полей

    // Вставьте новые значения с помощью textContent
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
}

nameInput.value = profilename.textContent;

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);

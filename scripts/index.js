// popups
const popupProfile = document.querySelector('.popup_edit-profile');
const popupAddImage = document.querySelector('.popup_add-content');
const popupZoomImage = document.querySelector('.popup_zoom-content');

const cardTemplate = document
    .querySelector('#card-template')
    .content.querySelector('.card');


const elementList = document.querySelector('.elements')

// inputs for add Image
const formInputCard = popupAddImage.querySelector('.popup__input-container'); // форма с инпутами
const nameInputCard = formInputCard.querySelector('.popup__input_form_image-title');  // инпут для названия
const urlInputCard = formInputCard.querySelector('.popup__input_form_url');  // инпут для ссылки

// popups close buttons
const popupProfileClose = popupProfile.querySelector('.popup__close-btn');
const popupAddImageClose = popupAddImage.querySelector('.popup__close-btn');
const popupZoomImageClose = popupZoomImage.querySelector('.popup__close-btn');

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
const zoomImage = popupZoomImage.querySelector('.popup__zoom-image');
const zoomCaption = popupZoomImage.querySelector('.popup__image-caption');


// Открытие попапов
const openPopup = function (popup) {
  popup.classList.add('popup_opened')
}

popupProfileOpen.addEventListener('click', () => {
  openPopup(popupProfile)
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
})

popupAddImageOpen.addEventListener('click', () => {
  openPopup(popupAddImage)
  })

// Закрытие попапов
const closePopup = function (popup) {
  popup.classList.remove('popup_opened')
}

popupProfileClose.addEventListener('click', function () {
    closePopup(popupProfile)
  })

popupAddImageClose.addEventListener('click', function () {
    closePopup(popupAddImage)
    })

  popupZoomImageClose.addEventListener('click', function () {
      closePopup(popupZoomImage)
      })



// Создание новой карточки

function createCard(item) {

  const newCard = cardTemplate.cloneNode(true);
  const cardTitle = newCard.querySelector('.card__title');
  const cardImage = newCard.querySelector('.card__image');

  cardTitle.textContent = item.name;
  cardImage.alt = item.name;
  cardImage.src = item.link;

  // Поставить лайк
  const cardLike = newCard.querySelector('.card__like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('card__like_active');
  });

  // Удаление карточки
  const cardDelete = newCard.querySelector('.card__delete').addEventListener('click', () => {
    newCard.remove()
  });

  // zoom

  newCard.querySelector('.card__image').addEventListener('click', function (evt){
    openPopup(popupZoomImage);

    zoomCaption.textContent = item.name;
    zoomImage.alt = item.name;
    zoomImage.src = evt.target.src;

  })

  return newCard;
}

// Добавить массив карточек на страницу

function renderCards() {

  initialCards.forEach((item) => {
  elementList.append(createCard(item));
})
}
renderCards()

// Добавление карточки через попап

popupAddImageSubmit.addEventListener('click', (evt) => {

  evt.preventDefault();

  const title = nameInputCard.value;
  const link = urlInputCard.value;

  const newCard = createCard({name: title, link: link});

  elementList.prepend(newCard);

  closePopup(popupAddImage);

  formInputCard.reset(); // удаление из формы предыдущих значений
})


// Сохранение данных из импутов и закрытие попапа

    function handleFormSubmit (evt) {
      evt.preventDefault();
      profileName.textContent = nameInput.value;
      profileJob.textContent = jobInput.value;
      closePopup(popupProfile)
  }

  // Прикрепляем обработчик к форме:
  // он будет следить за событием “submit” - «отправка»
  formInputProfile.addEventListener('submit', handleFormSubmit);


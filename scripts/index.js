import { Card } from './Card.js';
import { ValidateForm } from './Validate.js'

//переменные для добавления фото карточек
const
  photoSection = document.querySelector('.elements'),
  photoAddButton = document.querySelector('.profile__add-button'),
  popupPhotoAdd = document.querySelector('.popup_type_photoAdd'),
  photoInputPlaceDescription = document.querySelector('.popup__input_type_photoAdd-place'),
  photoInputLink = document.querySelector('.popup__input_type_photoAdd-link');


//Переменные для просмотра фото
const
  popupFullScreen = document.querySelector('.popup_type_photoFullScreen'),
  popupFullScreenPic = popupFullScreen.querySelector('.popup__image_type_photoFullScreen'),
  popupFullScreenFigcaption = popupFullScreen.querySelector('.popup__substring_type_photoFullScreen');


//Переменные для редактирования данных профиля
const
  editButton = document.querySelector('.profile__edit-button'),
  popupForProfileEditForm = document.querySelector('.popup_type_editForm'),
  userName = document.querySelector('.profile__name'),
  userDescription = document.querySelector('.profile__description'),
  popupForEditFormName = document.querySelector('.popup__input_type_editForm-name'),
  popupForEditFormDescription = document.querySelector('.popup__input_type_editForm-description');


//Объект с селекторами классов для создания карточек мест
const placeAddSelectors = {
  photoCardTemplateSelector: '#photo-card',
  photoCardElementSelector: '.element',
  photoCardNameSelector: '.element__name',
  photoCardLikeSelector: '.element__like',
  photoCardTrashSelector: '.element__trash',
  photoCardImageSelector: '.element__image',
  photoLikeIsActive: 'element__like_active',
  popupIsFullScreen: '.popup_type_photoFullScreen',
};

const formValidationSelectors = {
  formInputSelector: '.popup__input',
  formSubmitButtonSelector: '.popup__submit',
  inputElementErrorClass: 'popup__input_type_error',
  errorMessageActiveClass: 'popup__input-error_active',
  submitButtonDisabledClass: 'popup__submit_type_disabled',
}


//Метод открытия попапа с фото (передается как колбек в класс Card)
function openPopupImg(evt) {
  popupFullScreenPic.src = evt.target.src;
  popupFullScreenPic.alt = evt.target.alt;
  popupFullScreenFigcaption.textContent = evt.target.alt;
  popupFullScreen.classList.add('popup_opened');

  //установка обработчика на закрытие попапа через Escape
  document.addEventListener('keydown', setEscapeListener);
}


//Метод открытия попапа через добавление класса
function openPopup(container) {
  container.classList.add('popup_opened');

  //установка обработчика на закрытие попапа через Escape
  document.addEventListener('keydown', setEscapeListener);
}


//Метод закрытия попапа через удаление класса
function closePopup(container) {
  container.classList.remove('popup_opened');

  //удаление обработчика на закрытие попапа через Escape
  document.removeEventListener('keydown', setEscapeListener);
}


//Общий метод очистки формы попапа
function resetForm(popup) {
  const form = popup.querySelector('.popup__form');
  form.reset();
}

function setEscapeListener(evt) {
  if(evt.key === 'Escape') {
    const currentPopup = document.querySelector('.popup_opened');
    closePopup(currentPopup);
  }
}


//Общий метод закрытия попапов без сабмита
const popupAll = document.querySelectorAll('.popup');
popupAll.forEach(popup => {
  popup.addEventListener('click', (evt) => {
    const popupClassesList = evt.target.classList;
    if(popupClassesList.contains('popup__close') || popupClassesList.contains('popup')) {
      closePopup(popup);
    }
  });
});


//Метод вставки элемента в указанный блок
function insertNewElementPrepend(where, what) {
  where.prepend(what);
}


//Метод рендера карточек на страницу
//Может обрабатывать как отдельную карточку от пользователя, так и массив карточек
function renderCardsOnPage(cardsDataObj) {
  if(Array.isArray(cardsDataObj)) {
    cardsDataObj.forEach((item) => {
      const card = new Card(item, placeAddSelectors, openPopupImg);
      const cardElement = card.renderPhotoCard();

      insertNewElementPrepend(photoSection, cardElement);
    });
  } else {
    const card = new Card(cardsDataObj, placeAddSelectors, openPopupImg);
    const cardElement = card.renderPhotoCard();

    insertNewElementPrepend(photoSection, cardElement);
  }
}


//Загрузка стартовых фото на страницу
renderCardsOnPage(initialCards);


/*
Реализация добавления пользовательских фото
*/
//Открытие попапа добавления пользовательских фото
photoAddButton.addEventListener('click', () => {
  //очистка формы от старых данных и ошибок перед открытием
  resetForm(popupPhotoAdd);

  openPopup(popupPhotoAdd);
});

//Добавление польовательского фото на страницу
popupPhotoAdd.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const userOwnPhoto = {};
  userOwnPhoto.name = photoInputPlaceDescription.value;
  userOwnPhoto.link = photoInputLink.value;

  //очистка формы
  resetForm(popupPhotoAdd);

  //вставка элемента
  renderCardsOnPage(userOwnPhoto);

  closePopup(popupPhotoAdd);
});


/*
Реализация редактирования данных профиля
*/
//Открытие попапа и предзаполнение формы данными со страницы
editButton.addEventListener('click', () => {
  //очистка формы от старых данных и ошибок перед открытием
  resetForm(popupForProfileEditForm);

  //открытие и предзаполнение попапа
  setTimeout(() => {
    popupForEditFormName.value = userName.textContent;
    popupForEditFormDescription.value = userDescription.textContent;
    openPopup(popupForProfileEditForm);
  }, 0);
});


//Сохранение новых данных из формы ввода на странице и закрытие попапа при сабмите
popupForProfileEditForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  //применение введенных данных на странице
  userName.textContent = popupForEditFormName.value;
  userDescription.textContent = popupForEditFormDescription.value;

  resetForm(popupForProfileEditForm);
  closePopup(popupForProfileEditForm);
});


//Включение валидации всех форм
const formList = Array.from(document.querySelectorAll('.popup__form'));
formList.forEach((form) => {
  const validation = new ValidateForm(formValidationSelectors, form);
  validation.enableValidation();
})





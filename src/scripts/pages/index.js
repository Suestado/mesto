import '../../pages/index.css';
import { initialCards } from '../utils/constants.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { placeAddSelectors } from '../utils/constants.js';
import { formValidationSelectors } from '../utils/constants.js';
import { PopupWithForm } from '../components/PopupWithForm';
import { Userinfo } from '../components/UserInfo';
import { PopupWithImage } from '../components/PopupWithImage';

//переменные для добавления фото карточек
import {
  photoSection,
  photoAddButton,
  popupPhotoAddSelector,
} from '../utils/constants.js';

//Переменные для просмотра фото
import {
  popupFullScreenSelector,
} from '../utils/constants.js';

//Переменные для редактирования данных профиля
import {
  editButton,
  popupForProfileEditForm,
  userNameSelector,
  userDescriptionSelector,
} from '../utils/constants.js';

//Реализация добавления стоковых фото на страницу
const places = new Section({
    dataItems: initialCards,
    rendererFunc: (item) => {
      const newPlace = new Card({
        cardDataObj: item,
        cardSelectorsObj: placeAddSelectors,
      }, (evt) => {
        popupWithImage.open(evt);
      });
      const newPlaceItem = newPlace.renderPhotoCard();
      places.addItemOnPage(newPlaceItem);
    },
  },
  photoSection);
places.renderItems();

//Реализация добавления пользовательских фото на страницу
const photoAddPopup = new PopupWithForm({
  popupSelector: popupPhotoAddSelector,
  formSubmitCallback: (item) => {
    places.rendererUserItems(item);
  },
}, formValidationSelectors);
photoAddPopup.setEventListeners();

photoAddButton.addEventListener('click', () => {
  photoAddPopup.open();
});

//Реализация редактирования данных профиля
const userProfile = new Userinfo({
  userNameSelector: userNameSelector,
  userDescriptionSelector: userDescriptionSelector,
});

const userInfoPopup = new PopupWithForm({
  popupSelector: popupForProfileEditForm,
  formSubmitCallback: (inputValues) => {
    userProfile.setUserInfo(inputValues);
  },
}, formValidationSelectors);
userInfoPopup.setEventListeners();

editButton.addEventListener('click', () => {
  const userData = userProfile.getUserInfo();
  userInfoPopup.prefillData(userData);
  userInfoPopup.open();
});

//Реализация полноэкранного просмотра фото
const popupWithImage = new PopupWithImage(popupFullScreenSelector);
popupWithImage.setEventListeners();

//Включение валидации всех форм
const formList = Array.from(document.querySelectorAll('.popup__form'));
formList.forEach((form) => {
  const validation = new FormValidator(formValidationSelectors, form);
  validation.enableValidation();
});





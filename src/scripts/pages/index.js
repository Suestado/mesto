import '../../pages/index.css';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { placeAddSelectors } from '../utils/constants.js';
import { formValidationSelectors } from '../utils/constants.js';
import { PopupWithForm } from '../components/PopupWithForm';
import { Userinfo } from '../components/UserInfo';
import { PopupWithImage } from '../components/PopupWithImage';
import { PopupWithConfirmation } from '../components/PopupWithConfirmation';
import { Api } from '../components/Api';

//переменные для добавления фото карточек
import {
  photoSection,
  photoAddButton,
  popupPhotoAddSelector,
  popupDeleteAgreementSelector,
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
  avatarUploadButton,
  avatarUploadPopupSelector,
  userAvatarSelector,
} from '../utils/constants.js';


//Загрузка стартовой информации на страницу с сервера
const apiConnection = new Api({
  baseURL: 'https://nomoreparties.co/v1/cohort-63',
  headers: {
    'authorization': '9d6e9065-bec5-40dc-8c9b-a22a23e762e4',
    'Content-Type': 'application/json',
  }
});

Promise.all([apiConnection.getUserInfo(), apiConnection.getInitialCards()])
  .then(([userData, initialCards]) => {
    userProfile.setUserInfo(userData);
    places.renderItems(initialCards.reverse());
  })
  .catch((err) => {
    console.log(`Данные пользователя и стартовые карточки не могут быть загружены с сервера: Error: ${err}`);
  });


//Реализация добавления стоковых фото на страницу
const places = new Section({
    rendererFunc: (item) => {
      const newPlace = new Card({
        cardDataObj: item,
        cardSelectorsObj: placeAddSelectors,
        openPhotoCallback: (evt) => popupWithImage.open(evt),
        deletePhotoCallback: function (card) {
          deleteAgreementPopup.open();
          deleteAgreementPopup.setSubmitHandler(() => {
            apiConnection.removeCard(card.cardID)
              .then(() => {
                deleteAgreementPopup.close();
                newPlace.removeCardFromPage();
              })
              .catch((err) => {
                console.log(`Ошибка удаления карточки: Error: ${err}`);
              });
          });
        },
        likePhotoCallback: function (like, cardID) {
          apiConnection.uploadLikeStatus(like, cardID)
            .then((data) => {
              newPlace.setNewCardData(data);
              newPlace._toggleLike(this._likeSign, this._cardSelectorsObj.photoLikeIsActive);
            })
            .catch(err => {
              console.log(`Невозможно поставить/удалить лайк: Error: ${err}`);
            });
        },
        ownUserID: userProfile.getOwnUserID(),
      });

      const newPlaceItem = newPlace.renderPhotoCard();
      places.addItemOnPage(newPlaceItem);
    },
  },
  photoSection);


//Реализация добавления пользовательских фото на страницу
const photoAddPopup = new PopupWithForm({
  popupSelector: popupPhotoAddSelector,
  formSubmitCallback: (item) => {
    apiConnection.uploadUserCard(item)
      .then((card) => places.rendererUserItems(card))
      .then(() => photoAddPopup.close())
      .catch((err) => {
        console.log(`Пользовательская карточка не была загружена на сервер: Error: ${err}`);
      })
      .finally(() => photoAddPopup.renderLoading(false));
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
  userAvatarSelector: userAvatarSelector,
});

const userInfoPopup = new PopupWithForm({
  popupSelector: popupForProfileEditForm,
  formSubmitCallback: (inputValues) => {
    apiConnection.setUserInfo(inputValues)
      .then((data) => userProfile.setUserInfo(data))
      .then(() => userInfoPopup.close())
      .catch((err) => {
        console.log(`Пользовательские данные не были загружены на сервер: Error: ${err}`);
      })
      .finally(() => userInfoPopup.renderLoading(false));
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


//Реализация обновления аватара пользователя
const avatarUploadPopup = new PopupWithForm({
  popupSelector: avatarUploadPopupSelector,
  formSubmitCallback: (inputValues) => {
    apiConnection.setUserAvatar(inputValues)
      .then((data) => userProfile.setUserInfo(data))
      .then(() => avatarUploadPopup.close())
      .catch((err) => {
        console.log(`Пользовательский аватар не был загружен на сервер: Error: ${err}`);
      })
      .finally(() => photoAddPopup.renderLoading(false));
  },
}, formValidationSelectors);
avatarUploadPopup.setEventListeners();

avatarUploadButton.addEventListener('click', () => {
  avatarUploadPopup.open();
});


//Реализация попапа подтверждения удаления фото
const deleteAgreementPopup = new PopupWithConfirmation({
  popupSelector: popupDeleteAgreementSelector,
  popupFormSelectors: formValidationSelectors,
});
deleteAgreementPopup.setEventListeners();


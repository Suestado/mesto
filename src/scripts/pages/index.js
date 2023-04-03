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
import { logPlugin } from '@babel/preset-env/lib/debug';

//Загрузка стартовой информации на страницу с сервера
const apiConnection = new Api();

apiConnection.getInitialCards()
  .then((data) => {
    console.log(data);
    places.renderItems(data.reverse());
  });

apiConnection.getUserInfo()
  .then(data => {
    userProfile.setUserInfo(data);
    userProfile.setUserAvatar(data);
  });


//Реализация добавления стоковых фото на страницу
const places = new Section({
    rendererFunc: (item) => {
      const newPlace = new Card({
          cardDataObj: item,
          cardSelectorsObj: placeAddSelectors,
        }, (evt) => {
          popupWithImage.open(evt);
        }, () => deleteAgreementPopup.open()
        , function (like, cardID) {
          apiConnection.uploadLikeStatus(like, cardID)
            .then((data) => {
              this.setNewCardData(data); //TODO ниче не понял почему не сработало, когда передавал через this
              //TODO почему функция с this работает, а когда св-во пытался перезаписать, то нет.
            })
            .catch(err => {
              console.log(err); //TODO нормально прописать отлов ошибок
            });
        }); //TODO написать функцию колбек подгрузки лайка на сервер

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
      .then((card) => {
        places.rendererUserItems(card);
      });
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
    apiConnection.setUserInfo(inputValues);
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


//Реализация обновления аватара пользователя
const avatarUploadPopup = new PopupWithForm({
  popupSelector: avatarUploadPopupSelector,
  formSubmitCallback: (inputValues) => {
    apiConnection.setUserAvatar(inputValues);
    userProfile.setUserAvatar(inputValues);
  },
}, formValidationSelectors);
avatarUploadPopup.setEventListeners();

avatarUploadButton.addEventListener('click', () => {
  avatarUploadPopup.open();
});


//Реализация подтверждения удаления фото
const deleteAgreementPopup = new PopupWithConfirmation({
  popupSelector: popupDeleteAgreementSelector,
  formSubmitCallback: function () {
  },
}, formValidationSelectors);
deleteAgreementPopup.setEventListeners();


// document.addEventListener('click', (evt) => {
//   console.log(evt.target);
// })

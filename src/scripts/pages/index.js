import '../../pages/index.css';
import { initialCards } from '../utils/initialCards.js';
import { Card } from '../components/Card.js';
import { ValidateForm } from '../components/Validate.js';
import { Section } from '../components/Section.js';

//переменные для добавления фото карточек
import {
  photoSection,
  photoAddButton,
  popupPhotoAddSelector,
  //popupPhotoAdd,
  //popupPhotoAddForm,
  //photoInputPlaceDescription,
  //photoInputLink,
} from '../utils/constants.js';

//Переменные для просмотра фото
import {
  popupFullScreenSelector,
  //popupFullScreen,
  //popupFullScreenPic,
  //popupFullScreenFigcaption,
} from '../utils/constants.js';

//Переменные для редактирования данных профиля
import {
  editButton,
  popupForProfileEditForm,
  //profileEditForm,
  userNameSelector,
  userDescriptionSelector,
  //popupForEditFormName,
  //popupForEditFormDescription,
} from '../utils/constants.js';

//Объект с селекторами классов для создания карточек мест
import { placeAddSelectors } from '../utils/constants.js';

//Объект с селекторами классов инпутов и форм для валидации
import { formValidationSelectors } from '../utils/constants.js';
import { PopupWithForm } from '../components/PopupWithForm';
import { Userinfo } from '../components/UserInfo';
import { PopupWithImage } from '../components/PopupWithImage';


//Реализация добавления фото на страницу

function renderItemsOnPage(items) {
  const places = new Section({
      dataItems: items,
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
}

renderItemsOnPage(initialCards);


const photoAddPopup = new PopupWithForm({
    popupSelector: popupPhotoAddSelector,
    formSubmitCallback: renderItemsOnPage,
  },
);
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
});
userInfoPopup.setEventListeners();

editButton.addEventListener('click', () => {
  const userData = userProfile.getUserInfo();
  userInfoPopup.preFillData(userData);
  userInfoPopup.open();
});



//Реализация полноэкранного просмотра фото

const popupWithImage = new PopupWithImage(popupFullScreenSelector);
popupWithImage.setEventListeners();



//Метод открытия попапа с фото (передается как колбек в класс Card)
// function openPopupImg(evt) {
//   popupFullScreenPic.src = evt.target.src;
//   popupFullScreenPic.alt = evt.target.alt;
//   popupFullScreenFigcaption.textContent = evt.target.alt;
//   openPopup(popupFullScreen);
// }



// //Метод открытия попапа через добавление класса
// function openPopup(container) {
//   container.classList.add('popup_opened');
//
//   //установка обработчика на закрытие попапа через Escape
//   document.addEventListener('keydown', setEscapeListener);
// }


// //Метод закрытия попапа через удаление класса
// function closePopup(container) {
//   container.classList.remove('popup_opened');
//
//   //удаление обработчика на закрытие попапа через Escape
//   document.removeEventListener('keydown', setEscapeListener);
// }


// //Общий метод очистки формы попапа
// function resetForm(form) {
//   form.reset();
// }
//
// function setEscapeListener(evt) {
//   if(evt.key === 'Escape') {
//     const currentPopup = document.querySelector('.popup_opened');
//     closePopup(currentPopup);
//   }
// }


// //Общий метод закрытия попапов без сабмита
// const popupAll = document.querySelectorAll('.popup');
// popupAll.forEach(popup => {
//   popup.addEventListener('click', (evt) => {
//     const popupClassesList = evt.target.classList;
//     if(popupClassesList.contains('popup__close') || popupClassesList.contains('popup')) {
//       closePopup(popup);
//     }
//   });
// });


// //Метод вставки элемента в указанный блок
// function insertNewElementPrepend(where, what) {
//   where.prepend(what);
// }


// //Метод генерации карточки места
// function createCard(item) {
//   const card = new Card(item, placeAddSelectors, openPopupImg);
//   return card.renderPhotoCard();
// }


// //Метод рендера карточек на страницу
// //Может обрабатывать как отдельную карточку от пользователя, так и массив карточек
// function renderCardsOnPage(cardsDataObj) {
//   if(Array.isArray(cardsDataObj)) {
//     cardsDataObj.forEach((item) => {
//       insertNewElementPrepend(photoSection, createCard(item));
//     });
//   } else {
//     insertNewElementPrepend(photoSection, createCard(cardsDataObj));
//   }
// }


// //Загрузка стартовых фото на страницу
// renderCardsOnPage(initialCards);

//
// /*
// Реализация добавления пользовательских фото
// */
// //Открытие попапа добавления пользовательских фото
// photoAddButton.addEventListener('click', () => {
//   //очистка формы от старых данных и ошибок перед открытием
//   resetForm(popupPhotoAddForm);
//
//   openPopup(popupPhotoAdd);
// });
//
// //Добавление польовательского фото на страницу
// popupPhotoAddForm.addEventListener('submit', (evt) => {
//   evt.preventDefault();
//   const userOwnPhoto = {};
//   userOwnPhoto.name = photoInputPlaceDescription.value;
//   userOwnPhoto.link = photoInputLink.value;
//
//   //очистка формы
//   resetForm(popupPhotoAddForm);
//
//   //вставка элемента
//   renderCardsOnPage(userOwnPhoto);
//
//   closePopup(popupPhotoAdd);
// });


// /*
// Реализация редактирования данных профиля
// */
// //Открытие попапа и предзаполнение формы данными со страницы
// editButton.addEventListener('click', () => {
//   //очистка формы от старых данных и ошибок перед открытием
//   resetForm(profileEditForm);
//
//   //открытие и предзаполнение попапа
//   setTimeout(() => {
//     popupForEditFormName.value = userName.textContent;
//     popupForEditFormDescription.value = userDescription.textContent;
//     openPopup(popupForProfileEditForm);
//   }, 0);
// });


// //Сохранение новых данных из формы ввода на странице и закрытие попапа при сабмите
// profileEditForm.addEventListener('submit', (evt) => {
//   evt.preventDefault();
//
//   //применение введенных данных на странице
//   userName.textContent = popupForEditFormName.value;
//   userDescription.textContent = popupForEditFormDescription.value;
//
//   resetForm(profileEditForm);
//   closePopup(popupForProfileEditForm);
// });


//Включение валидации всех форм
const formList = Array.from(document.querySelectorAll('.popup__form'));
formList.forEach((form) => {
  const validation = new ValidateForm(formValidationSelectors, form);
  validation.enableValidation();
});





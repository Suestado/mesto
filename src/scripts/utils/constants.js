export const openedPopupClass = 'popup_opened';
export const generalPopupClass = 'popup';
export const popupCloseBtnClass = 'popup__close';

//переменные для добавления фото карточек
export const photoSection = document.querySelector('.elements');
export const photoAddButton = document.querySelector('.profile__add-button');
//export const popupPhotoAdd = document.querySelector('.popup_type_photoAdd');
export const popupPhotoAddSelector = '.popup_type_photoAdd';
//export const popupPhotoAddForm = document.querySelector('#photoAdd-form');
//export const photoInputPlaceDescription = document.querySelector('.popup__input_type_photoAdd-place');
//export const photoInputLink = document.querySelector('.popup__input_type_photoAdd-link');

//Переменные для просмотра фото
export const popupFullScreenSelector = '.popup_type_photoFullScreen';
export const popupFullScreen = document.querySelector('.popup_type_photoFullScreen');
export const popupFullScreenPic = popupFullScreen.querySelector('.popup__image_type_photoFullScreen');
export const popupFullScreenFigcaption = popupFullScreen.querySelector('.popup__substring_type_photoFullScreen');

//Переменные для редактирования данных профиля
export const editButton = document.querySelector('.profile__edit-button');
export const popupForProfileEditForm = '.popup_type_editForm';
//export const profileEditForm = document.querySelector('#profileEdit-form');
export const userNameSelector = '.profile__name';
export const userDescriptionSelector = '.profile__description';
//export const popupForEditFormName = document.querySelector('.popup__input_type_editForm-name');
//export const popupForEditFormDescription = document.querySelector('.popup__input_type_editForm-description');

//Объект с селекторами классов для создания карточек мест
export const placeAddSelectors = {
  photoCardTemplateSelector: '#photo-card',
  photoCardElementSelector: '.element',
  photoCardNameSelector: '.element__name',
  photoCardLikeSelector: '.element__like',
  photoCardTrashSelector: '.element__trash',
  photoCardImageSelector: '.element__image',
  photoLikeIsActive: 'element__like_active',
  popupIsFullScreen: '.popup_type_photoFullScreen',
};

//Объект с селекторами классов инпутов и форм для валидации
export const formValidationSelectors = {
  formSelector: '.popup__form',
  formInputSelector: '.popup__input',
  formSubmitButtonSelector: '.popup__submit',
  inputElementErrorClass: 'popup__input_type_error',
  errorMessageActiveClass: 'popup__input-error_active',
  submitButtonDisabledClass: 'popup__submit_type_disabled',
};


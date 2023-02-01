//переменные для добавления фото карточек
const
  photoSection = document.querySelector('.elements'),
  photoCardTemplate = document.querySelector('#photo-card').content,
  photoAddButton = document.querySelector('.profile__add-button'),
  popupPhotoAdd = document.querySelector('.popup_type_photoAdd'),
  photoInputPlaceDescription = document.querySelector('.popup__input_type_photoAdd-place'),
  photoInputLink = document.querySelector('.popup__input_type_photoAdd-link'),
  photoAddCloseButton = document.querySelector('.popup__close_type_photoAdd');

//Переменные для просмотра фото
const
  popupFullScreen = document.querySelector('.popup_type_photoFullScreen'),
  popupFullScreenPic = popupFullScreen.querySelector('.popup__image_type_photoFullScreen'),
  popupFullScreenFigcaption = popupFullScreen.querySelector('.popup__substring_type_photoFullScreen');

//Переменные для редактирования данных профиля
const
  editButton = document.querySelector('.profile__edit-button'),
  popupForEditForm = document.querySelector('.popup_type_editForm'),
  userName = document.querySelector('.profile__name'),
  userDescription = document.querySelector('.profile__description'),
  popupForEditFormName = document.querySelector('.popup__input_type_editForm-name'),
  popupForEditFormDescription = document.querySelector('.popup__input_type_editForm-description');

//Общий метод закрытия попапов
const closeButtonList = document.querySelectorAll('.popup__close');
closeButtonList.forEach(btn => {
  const currentPopup = btn.closest('.popup');
  btn.addEventListener('click', () => closePopup(currentPopup));
})

//Общий метод замены класса
function toggleClass(container, className) {
  container.classList.toggle(className);
}

//Метод открытия попапа через добавление класса
function openPopup(container) {
  container.classList.add('popup_opened');
}

//Метод закрытия попапа через удаление класса
function closePopup(container) {
  container.classList.remove('popup_opened');
}

//Метод вставки элемента в указанный блок
function insertNewElementPrepend(where, what) {
  where.prepend(what);
}

//Метод генерации карточки с фото на основе темплейта. Принимает объект с 2-мя ключами (name, link)
function createNewPhotoCard(obj) {
  const
    newPhotoCard = photoCardTemplate.querySelector('.element').cloneNode(true),
    newPhotoCardName = newPhotoCard.querySelector('.element__name'),
    newPhotoCardLike = newPhotoCard.querySelector('.element__like'),
    newPhotoCardTrash = newPhotoCard.querySelector('.element__trash'),
    newPhotoCardImage = newPhotoCard.querySelector('.element__image');

  newPhotoCardName.textContent = obj.name;
  newPhotoCardImage.src = obj.link;
  newPhotoCardImage.alt = obj.name;

  //слушатель на лайки
  newPhotoCardLike.addEventListener('click', (evt) => {
    toggleClass(evt.target, 'element__like_active')
  });
  //слушатель на удаление карточки
  newPhotoCardTrash.addEventListener('click', (evt) => {
    evt.target.closest('.element').remove();
  });
  //слушатель на открытие фото в полноэкранном режиме
  newPhotoCardImage.addEventListener('click', (evt) => {
    openPopup(popupFullScreen)
    popupFullScreenPic.src = evt.target.src;
    popupFullScreenPic.alt = evt.target.alt;
    popupFullScreenFigcaption.textContent = evt.target.alt;
  })

  return newPhotoCard;
}

//Загрузка стартовых фото на страницу
initialCards.forEach((item) => {
  insertNewElementPrepend(photoSection, createNewPhotoCard(item));
})

/*
Реализация добавления пользовательских фото
*/
//Открытие попапа добавления пользовательских фото
photoAddButton.addEventListener('click', () => {
  openPopup(popupPhotoAdd);
})

//Добавление польовательского фото на страницу
popupPhotoAdd.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const userOwnPhoto = {};
  userOwnPhoto.name = photoInputPlaceDescription.value;
  userOwnPhoto.link = photoInputLink.value;

  //вставка элемента в блок
  insertNewElementPrepend(photoSection, createNewPhotoCard(userOwnPhoto));

  //очистка формы ввода
  photoInputPlaceDescription.value = '';
  photoInputLink.value = '';
  //закрытие попапа
  closePopup(popupPhotoAdd);
})

//Очистка формы добавления фото при закрытии попапа
photoAddCloseButton.addEventListener('click', () => {
  photoInputPlaceDescription.value = '';
  photoInputLink.value = '';
})

/*
Реализация редактирования данных профиля
*/
//Открытие попапа и предзаполнение формы данными со страницы
editButton.addEventListener('click', () => {
  popupForEditFormName.value = userName.textContent;
  popupForEditFormDescription.value = userDescription.textContent;
  openPopup(popupForEditForm);
})

//сохранение новых данных из формы ввода на странице и закрытие попапа
popupForEditForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  userName.textContent = popupForEditFormName.value;
  userDescription.textContent = popupForEditFormDescription.value;
  closePopup(popupForEditForm);
})







//переменные для добавления фото карточек
const
  photoSection = document.querySelector('.elements'),
  photoCardTemplate = document.querySelector('#photo-card').content,
  photoAddButton = document.querySelector('.profile__add-button'),
  popupPhotoAdd = document.querySelector('.popup_type_photoAdd'),
  photoInputPlaceDescription = document.querySelector('.popup__input_type_photoAdd-place'),
  photoInputLink = document.querySelector('.popup__input_type_photoAdd-link'),
  photoAddContainer = document.querySelector('.popup__card_type_photoAdd'),
  photoAddCloseButton = document.querySelector('.popup__close_type_photoAdd');

//Переменные для просмотра фото
const
  popupFullScreen = document.querySelector('.popup_type_photoFullScreen'),
  popupFullScreenPic = popupFullScreen.querySelector('.popup__image_type_photoFullScreen'),
  popupFullScreenFigcaption = popupFullScreen.querySelector('.popup__substring_type_photoFullScreen'),
  popupFullScreenClose = popupFullScreen.querySelector('.popup__close_type_photoFullScreen');

//Переменные для редактирования данных профиля
const
  popupContainer = document.querySelector('.popup__card_type_editForm'),
  editButton = document.querySelector('.profile__edit-button'),
  closeButton = document.querySelector('.popup__close_type_editForm'),
  popup = document.querySelector('.popup_type_editForm'),
  userName = document.querySelector('.profile__name'),
  userDescription = document.querySelector('.profile__description'),
  popupName = document.querySelector('.popup__input_type_editForm-name'),
  popupDescription = document.querySelector('.popup__input_type_editForm-description');


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
    newPhotoCardLink = newPhotoCard.querySelector('.element__image'),
    newPhotoCardLike = newPhotoCard.querySelector('.element__like'),
    newPhotoCardTrash = newPhotoCard.querySelector('.element__trash'),
    newPhotoCardImage = newPhotoCard.querySelector('.element__image');

  newPhotoCardName.textContent = obj.name;
  newPhotoCardLink.src = obj.link;
  newPhotoCardLink.alt = obj.name;

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
photoAddContainer.addEventListener('submit', (evt) => {
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

//закрытие попапа добавления фото на страницу
photoAddCloseButton.addEventListener('click', () => {
  closePopup(popupPhotoAdd);

  //очистка формы
  photoInputPlaceDescription.value = '';
  photoInputLink.value = '';
})

//Закрытие попапа с фото в полноэкранном режиме
popupFullScreenClose.addEventListener('click', () => {
  closePopup(popupFullScreen, 'popup_visible');
})


/*
Реализация редактирования данных профиля
*/
//Открытие попапа и предзаполнение формы данными со страницы
editButton.addEventListener('click', () => {
  popupName.value = userName.textContent;
  popupDescription.value = userDescription.textContent;
  openPopup(popup);
})

//закрытие попапа редактирования данных профиля
closeButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  closePopup(popup);
})

//сохранение новых данных из формы ввода на странице и закрытие попапа
popupContainer.addEventListener('submit', (evt) => {
  evt.preventDefault();
  userName.textContent = popupName.value;
  userDescription.textContent = popupDescription.value;
  closePopup(popup);
})







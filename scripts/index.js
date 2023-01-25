// Стартовый сет картинок для страницы
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];


// Реализация универсальной функции добавления карточки с местом на страницу
const
  photoSection = document.querySelector('.elements'),
  photoCardTemplate = document.querySelector('#photo-card').content;

function newPhotoCardAdd (args) {
  args.forEach(function(item) {
    //наполняем элемент контентом
    const photoCardItem = photoCardTemplate.querySelector('.element').cloneNode(true);
    photoCardItem.querySelector('.element__name').textContent = item.name;
    photoCardItem.querySelector('.element__image').src = item.link;
    photoCardItem.querySelector('.element__image').alt = item.name;

    //добавляем элемент на страницу
    photoSection.prepend(photoCardItem);
  })
}
newPhotoCardAdd(initialCards);


//Реализация лайка на фото
photoSection.addEventListener('click', function (evt) {
  if(evt.target.classList.contains('element__like')) {
    toggleClass(evt.target, 'element__like_active')
  }
});


// Реализация редактирования данных профиля
const
  popupContainer = document.querySelector('.popup__card'),
  editButton = document.querySelector('.profile__edit-button'),
  closeButton = document.querySelector('.popup__close'),
  popup = document.querySelector('.popup'),
  userName = document.querySelector('.profile__name'),
  userDescription = document.querySelector('.profile__description'),
  popupName = document.querySelector('.popup__input_field_name'),
  popupDescription = document.querySelector('.popup__input_field_description');

function toggleClass (container, className) {
  container.classList.toggle(className);
  }

editButton.addEventListener('click', function () {
  popupName.value = userName.textContent;
  popupDescription.value = userDescription.textContent;
  toggleClass(popup, 'popup_visible');
})

closeButton.addEventListener('click', function handleFormSubmit(evt) {
  evt.preventDefault();
  toggleClass(popup, 'popup_visible');
})

popupContainer.addEventListener('submit', function handleFormSubmit(evt) {
  evt.preventDefault();
  userName.textContent = popupName.value;
  userDescription.textContent = popupDescription.value;
  toggleClass(popup, 'popup_visible');
})







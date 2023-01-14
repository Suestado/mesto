const
  popupContainer = document.querySelector('.popup__container'),
  editButton = document.querySelector('.profile__edit-button'),
  closeButton = document.querySelector('.popup__close'),
  popup = document.querySelector('.popup'),
  userName = document.querySelector('.profile__name'),
  userDescription = document.querySelector('.profile__description'),
  popupName = document.querySelector('.popup__input_field_name'),
  popupDescription = document.querySelector('.popup__input_field_description');


editButton.addEventListener('click', function () {
  popupContainer.classList.add('modal')
  popupName.value = userName.textContent;
  popupDescription.value = userDescription.textContent;
  popup.classList.add('popup_visible');
})

closeButton.addEventListener('click', function () {
  popup.classList.remove('popup_visible');
})

popupContainer.addEventListener('submit', function handleFormSubmit(evt) {
  evt.preventDefault();
  userName.textContent = popupName.value;
  userDescription.textContent = popupDescription.value;
  popup.classList.remove('popup_visible');
})



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
  popupName.value = userName.textContent;
  popupDescription.value = userDescription.textContent;
  popup.style.display = 'flex';
  popup.classList.add('popup__animation');
})

closeButton.addEventListener('click', function () {
  popup.style.display = 'none';
})

popupContainer.addEventListener('submit', function handleFormSubmit(evt) {
  evt.preventDefault();
  userName.textContent = popupName.value;
  userDescription.textContent = popupDescription.value;
  popup.style.display = 'none';
})



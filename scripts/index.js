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



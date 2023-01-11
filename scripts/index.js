const
  popupContainer = document.querySelector('.popup__container'),
  editButton = document.querySelector('.profile__edit-button'),
  closeButton = document.querySelector('.popup__close'),
  submitButton = document.querySelector('.popup__submit'),
  popup = document.querySelector('.popup');

editButton.addEventListener('click', function () {
  let
    name = document.querySelector('.profile__name').textContent,
    description = document.querySelector('.profile__description').textContent,
    popupName = document.querySelector('.popup__input_name'),
    popupDescription = document.querySelector('.popup__input_description');

  popupName.value = name;
  popupDescription.value = description;
  popup.style.display = 'flex';
  popup.classList.add('popup__animation');
})

closeButton.addEventListener('click', function () {
  popupContainer.reset();
  popup.style.display = 'none';
})

popupContainer.onsubmit = function handleFormSubmit(evt) {
  evt.preventDefault();
  let
    newName = document.querySelector('.popup__input_name').value,
    newJob = document.querySelector('.popup__input_description').value;

  document.querySelector('.profile__name').textContent = newName;
  document.querySelector('.profile__description').textContent = newJob;
  popup.style.display = 'none';
}

window.addEventListener('click', function(e) {
  if(e.target === popup) {
    popupContainer.reset();
    popup.style.display = 'none';
  }
})




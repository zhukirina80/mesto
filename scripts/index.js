const profileAditButton = document.querySelector('.profile__adit-button')
const popupProfile = document.querySelector('.popup_type_profile')
const buttonClosePopupProfile = popupProfile.querySelector(".popup__button-close")
const formElement = document.querySelector('.popup__form')
const nameInput = formElement.querySelector('.popup__input_type_name')
const jobInput = formElement.querySelector('.popup__input_type_job')
const profileName = document.querySelector('.profile__name')
const profileJob = document.querySelector('.profile__job')

function openPopupProfile() {
  popupProfile.classList.add('popup_opened')
}

function closePopupProfile() {
  popupProfile.classList.remove('popup_opened')
}

function handleFormSubmit (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopupProfile()
}
profileAditButton.addEventListener("click", openPopupProfile)
buttonClosePopupProfile.addEventListener("click", closePopupProfile)
formElement.addEventListener('submit', handleFormSubmit);

const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const avatarEditButton = document.querySelector('.profile__avatar-edit-button');
const profileForm = document.forms['profile-form'];
const nameInput = profileForm.querySelector('.popup__input_type_name');
const jobInput = profileForm.querySelector('.popup__input_type_job');
const avatar = document.querySelector('.profile__avatar');
const cardForm = document.forms['card-form'];
const avatarForm = document.forms['avatar-form'];

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

export {
  profileEditButton,
  profileAddButton,
  avatarEditButton,
  profileForm,
  nameInput,
  jobInput,
  avatar,
  cardForm,
  avatarForm,
  validationConfig
}

import Card from "./Card.js";
import { openPopup, closePopup } from "./utils.js";
import FormValidator from "./FormValidator.js";

const profileAditButton = document.querySelector('.profile__adit-button');
const popupProfile = document.querySelector('.popup_type_profile')
const profileForm = document.forms['profile-form'];
const nameInput = profileForm.querySelector('.popup__input_type_name');
const jobInput = profileForm.querySelector('.popup__input_type_job');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const profileAddButton = document.querySelector('.profile__add-button');
const popupElement = document.querySelector('.popup_type_element');
const container = document.querySelector('.elements__cards');
const cardForm = document.forms['card-form'];
const titleInput = cardForm.querySelector('.popup__input_type_title');
const linkInput = cardForm.querySelector('.popup__input_type_link');

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

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

profileAditButton.addEventListener("click", function() {
  openPopup(popupProfile);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
})

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupProfile);
}

profileForm.addEventListener("submit", handleProfileFormSubmit);

profileAddButton.addEventListener("click", function() {
  openPopup(popupElement);
})

function handleCardClick(name, link) {
  const popupImage = document.querySelector('.popup_type_image');
  const bigImage = popupImage.querySelector('.popup__image');
  const titleBigImage = popupImage.querySelector('.popup__title-image');
  bigImage.src = link;
  titleBigImage.textContent = name;
  bigImage.alt = name;
  openPopup(popupImage);
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const newCard = new Card({link: linkInput.value, name: titleInput.value}, '#element-template', handleCardClick);
  container.prepend(newCard.getView());
  closePopup(popupElement);
  cardForm.reset();
}

cardForm.addEventListener("submit", handleAddCardFormSubmit);

initialCards.forEach((item) => {
  const card = new Card(item, '#element-template', handleCardClick);
  container.append(card.getView());
})

// Функция для включения валидации на форме
const createFormValidatorInstances = () => {
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  formList.forEach(formElement => {
    const formValidator = new FormValidator(formElement, validationConfig);
    formValidator.enableValidation();
  })
}

createFormValidatorInstances();

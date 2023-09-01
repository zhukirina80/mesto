import './index.css';
import Card from "../components/Card.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import {
  profileEditButton,
  profileForm,
  nameInput,
  jobInput,
  profileAddButton,
  container,
  validationConfig,
  initialCards
} from "../utils/constants.js";

// Для попапа профиля:
const userInfo = new UserInfo({ nameSelector:'.profile__name', jobSelector:'.profile__job' });

const editButtonPopup = new PopupWithForm('.popup_type_profile', (formData) => {
  userInfo.setUserInfo(formData);
})

editButtonPopup.setEventListeners();

profileEditButton.addEventListener("click", function() {
  editButtonPopup.open();
})

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  userInfo.setUserInfo({ name: nameInput.value, job: jobInput.value });
  editButtonPopup.close();
}

profileForm.addEventListener("submit", handleProfileFormSubmit);

// Для попапа добавления карточки:
const addButtonPopup = new PopupWithForm('.popup_type_element', (formData) => {
  const newCard = new Card({ link: formData.linkInput, name: formData.titleInput }, '#element-template', handleCardClick);
  container.prepend(newCard.getView());
  addButtonPopup.close();
})

addButtonPopup.setEventListeners();

profileAddButton.addEventListener("click", function() {
  addButtonPopup.open();
})

// Для попапа картинки
const imagePopup = new PopupWithImage('.popup_type_image');
imagePopup.setEventListeners();

function handleCardClick(name, link) {
imagePopup.open(name, link);
}

// Рендерим карточки
const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item, '#element-template', handleCardClick);
    cardList.setItem(card.getView());
    },
  },
  '.elements__cards'
);

cardList.renderItems();

// Функция для включения валидации на форме
const createFormValidatorInstances = () => {
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  formList.forEach(formElement => {
    const formValidator = new FormValidator(formElement, validationConfig);
    formValidator.enableValidation();
  })
}

createFormValidatorInstances();

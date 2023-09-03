import './index.css';
import Card from "../components/Card.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import {
  profileEditButton,
  profileAddButton,
  validationConfig,
  initialCards
} from "../utils/constants.js";

// Для попапа профиля:
const userInfo = new UserInfo({ nameSelector:'.profile__name', jobSelector:'.profile__job' });

const editProfilePopup = new PopupWithForm('.popup_type_profile', (formData) => {
  userInfo.setUserInfo({ name: formData.nameInput, job: formData.jobInput });
})

editProfilePopup.setEventListeners();

profileEditButton.addEventListener("click", function() {
  editProfilePopup.open();
})

// Функция создания карточки
function createCard(item) {
  const card = new Card(item, '#element-template', handleCardClick);
  const cardItem = card.getView();
  return cardItem;
}

// Для попапа добавления карточки:
const addCardPopup = new PopupWithForm('.popup_type_element', (formData) => {
  const newCard = createCard({ link: formData.linkInput, name: formData.titleInput });
  cardList.addItem(newCard);
  addCardPopup.close();
})

addCardPopup.setEventListeners();

profileAddButton.addEventListener("click", function() {
  addCardPopup.open();
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
    const cardElement = createCard(item);
    cardList.addItemWithAppend(cardElement);
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

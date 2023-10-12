import './index.css';
import Card from "../components/Card.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithConfirm from "../components/PopupWithConfirm.js";
import UserInfo from "../components/UserInfo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import Api from '../components/Api.js';
import {
  profileEditButton,
  profileAddButton,
  avatarEditButton,
  nameInput,
  jobInput,
  validationConfig,
  avatar
} from "../utils/constants.js";

let userId = '';

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-77',
  headers: {
    authorization: 'e2a125d6-336b-4a18-a8ae-b74d98e68111',
    'Content-Type': 'application/json'
  }
});

const userInfo = new UserInfo({ nameSelector:'.profile__name', jobSelector:'.profile__job', avatar: avatar, _id: userId });

Promise.all([api.loadUserInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
    userInfo.setUserInfo({
      name: userData.name,
      about: userData.about,
      avatar: userData.avatar,
      userId: userData._id
    })
    userId = userData._id
    //console.log(userId)
    cardList.setItems(cards)
    cardList.renderItems()
  })
  .catch((error) => {
    console.log(error);
  })

profileEditButton.addEventListener("click", function() {
  editProfilePopup.open();
  const { name, about } = userInfo.getUserInfo();
  nameInput.value = name;
  jobInput.value = about;
})

const editProfilePopup = new PopupWithForm('.popup_type_profile', '.popup__button_type_profile', (formData) => {
  editProfilePopup.renderLoading(true);
  api.patchUserInfo({ name: formData.nameInput, about: formData.jobInput })
    .then((res) => {
      userInfo.setUserInfo(res);
      editProfilePopup.close();
    })
    .catch((error) => {
      console.error('Ошибка при редактировании профиля:', error);
    })
    .finally(() => {
      editProfilePopup.renderLoading(false)
  });
});

editProfilePopup.setEventListeners();

avatarEditButton.addEventListener("click", function() {
  editAvatarPopup.open();
})

const editAvatarPopup = new PopupWithForm('.popup_type_avatar', '.popup__button_type_avatar', (data) => {
  editAvatarPopup.renderLoading(true);
  api.patchAvatar({avatar: data.avatarInput})
    .then((res) => {
      userInfo.setUserInfo(res);
      editAvatarPopup.close();
    })
    .catch((error) => {
      console.error('Ошибка при редактировании аватара:', error);
    })
    .finally(() => {
      editAvatarPopup.renderLoading(false)
  });
});

editAvatarPopup.setEventListeners();


function createCard(item) {
  const card = new Card(item, '#element-template', handleCardClick, userId, (id) => {
    api.likeCard(id)
      .then((res) => {
        card.addLike(res)
      })
      .catch((error) => {
        console.error('Ошибка при постановке лайка:', error);
      })
  }, (id) => {
    api.removeLikeCard(id)
      .then((res) => {
        card.deleteLike(res)
      })
      .catch((error) => {
        console.error('Ошибка при удалении лайка:', error);
      })
  },
    (card) => {
      popupWithConfirm.setCardId(card._id);
      popupWithConfirm.open();
      popupWithConfirm.handleFormSubmitConfirm((id) => {
        api.deleteCard(id)
          .then(() => {
            card.removeCard()
            popupWithConfirm.close()
          })
          .catch((error) => {
            console.error('Ошибка при удалении карточки:', error);
      })
    })
  })
  const cardTemplate = card.getView(userId);
  return cardTemplate;
}

const addCardPopup = new PopupWithForm('.popup_type_element', '.popup__button_type_element', (formData) => {
  addCardPopup.renderLoading(true);
  api.addCard({ name: formData.titleInput, link: formData.linkInput })
    .then((res) =>{
      const newCard = createCard(res)
      cardList.addItem(newCard, userId)
      addCardPopup.close()
    })
    .catch((error) => {
      console.error('Ошибка при добавлении карточки:', error);
    })
    .finally(() => {
      addCardPopup.renderLoading(false)
  });
});

addCardPopup.setEventListeners();

profileAddButton.addEventListener("click", function() {
  addCardPopup.open();
});

const imagePopup = new PopupWithImage('.popup_type_image');
imagePopup.setEventListeners();

function handleCardClick(name, link) {
imagePopup.open(name, link);
}

const popupWithConfirm = new PopupWithConfirm('.popup_type_delete-card');
popupWithConfirm.setEventListeners();

// Рендерим карточки
const cardList = new Section({
  items: [],
  renderer: (item) => {
    const cardElement = createCard(item);
    cardList.addItemWithAppend(cardElement);
  },
},
'.elements__cards'
);

// Функция для включения валидации на форме
const createFormValidatorInstances = () => {
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  formList.forEach(formElement => {
    const formValidator = new FormValidator(formElement, validationConfig);
    formValidator.enableValidation();
  })
}

createFormValidatorInstances();

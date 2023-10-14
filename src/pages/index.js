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
  profileForm,
  nameInput,
  jobInput,
  avatar,
  cardForm,
  avatarForm,
  validationConfig
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
  popupProfile.open();
  const { name, about } = userInfo.getUserInfo();
  nameInput.value = name;
  jobInput.value = about;
})

const popupProfile = new PopupWithForm('.popup_type_profile', '.popup__button_type_profile', (formData) => {
  popupProfile.renderLoading(true);
  api.patchUserInfo({ name: formData.nameInput, about: formData.jobInput })
    .then((res) => {
      userInfo.setUserInfo(res);
      popupProfile.close();
    })
    .catch((error) => {
      console.error('Ошибка при редактировании профиля:', error);
    })
    .finally(() => {
      popupProfile.renderLoading(false)
  });
});

popupProfile.setEventListeners();

avatarEditButton.addEventListener("click", function() {
  popupAvatar.open();
})

const popupAvatar = new PopupWithForm('.popup_type_avatar', '.popup__button_type_avatar', (data) => {
  popupAvatar.renderLoading(true);
  api.patchAvatar({avatar: data.avatarInput})
    .then((res) => {
      userInfo.setUserInfo(res);
      popupAvatar.close();
    })
    .catch((error) => {
      console.error('Ошибка при редактировании аватара:', error);
    })
    .finally(() => {
      popupAvatar.renderLoading(false)
  });
});

popupAvatar.setEventListeners();

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
      popupWithConfirm.setItemId(card._id);
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

const popupAddCard = new PopupWithForm('.popup_type_element', '.popup__button_type_element', (formData) => {
  popupAddCard.renderLoading(true);
  api.addCard({ name: formData.titleInput, link: formData.linkInput })
    .then((res) =>{
      const newCard = createCard(res)
      cardList.addItem(newCard, userId)
      popupAddCard.close()
    })
    .catch((error) => {
      console.error('Ошибка при добавлении карточки:', error);
    })
    .finally(() => {
      popupAddCard.renderLoading(false)
  });
});

popupAddCard.setEventListeners();

profileAddButton.addEventListener("click", function() {
  popupAddCard.open();
});

const popupImage = new PopupWithImage('.popup_type_image');
popupImage.setEventListeners();

function handleCardClick(name, link) {
popupImage.open(name, link);
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

//Инстанцируем экземпляры FormValidator для каждой формы
const formProfileValidator = new FormValidator(profileForm, validationConfig);
const formCardValidator = new FormValidator(cardForm, validationConfig);
const formAvatarValidator = new FormValidator(avatarForm, validationConfig);

// Активируем валидацию для каждой формы
formProfileValidator.enableValidation();
formCardValidator.enableValidation();
formAvatarValidator.enableValidation();


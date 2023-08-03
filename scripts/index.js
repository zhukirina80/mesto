const profileAditButton = document.querySelector('.profile__adit-button');
const popupProfile = document.querySelector('.popup_type_profile')
const buttonClosePopupProfile = popupProfile.querySelector(".popup__button-close");
const formProfile = document.querySelector('.popup__form');
const nameInput = formProfile.querySelector('.popup__input_type_name');
const jobInput = formProfile.querySelector('.popup__input_type_job');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const profileAddButton = document.querySelector('.profile__add-button');
const popupElement = document.querySelector('.popup_type_element');
const buttonClosePopupElement = popupElement.querySelector(".popup__button-close_element");
const container = document.querySelector('.elements__cards');
const cards = document.querySelector('#element-template').content;
const formCard = document.querySelector('.popup__form_element');
const titleInput = formCard.querySelector('.popup__input_type_title');
const linkInput = formCard.querySelector('.popup__input_type_link');
const popupImage = document.querySelector('.popup_type_image');
const buttonClosePopupImage = popupImage.querySelector(".popup__button-close_image");
const bigImage = popupImage.querySelector(".popup__image");
const titleBigImage = popupImage.querySelector(".popup__title-image");
const popupList = Array.from(document.querySelectorAll('.popup'));

function closePopupKeyEsc(evt) {
  if (evt.keyCode === 27) {
    const popupOpened = document.querySelector('.popup_opened');
    if (popupOpened) {
      closePopup(popupOpened);
      formCard.reset();
    };
  };
};
document.addEventListener('keydown', closePopupKeyEsc);

popupList.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if (evt.target === popup) {
      const popupOpened = document.querySelector('.popup_opened');
      if (popupOpened) {
        closePopup(popupOpened);
        formCard.reset();
      };
    };
  });
});

function openPopup(popup) {
  popup.classList.add('popup_opened');
};

function closePopup(popup) {
  popup.classList.remove('popup_opened');
};

profileAditButton.addEventListener("click", function() {
  openPopup(popupProfile);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
});

function handleFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup(popupProfile);
};

buttonClosePopupProfile.addEventListener("click", function() {
  closePopup(popupProfile);
});

formProfile.addEventListener('submit', handleFormSubmit);

profileAddButton.addEventListener("click", function() {
  openPopup(popupElement);
});

buttonClosePopupElement.addEventListener("click", function() {
  closePopup(popupElement);
});

buttonClosePopupImage.addEventListener("click", function() {
  closePopup(popupImage);
});

const createCard = (item) => {
  const card = cards.querySelector('.element').cloneNode(true);
  const image = card.querySelector('.element__image');
  image.src = item.link;
  const title = card.querySelector('.element__title');
  title.textContent = item.name;
  image.alt = item.name;

  card.querySelector('.element__delete-button').addEventListener('click', () => {
    card.remove();
  });

  card.querySelector('.element__button-like').addEventListener('click', function(evt) {
   evt.target.classList.toggle('element__button-like_active');
  });

  function openImage(item) {
    bigImage.src = item.link;
    titleBigImage.textContent = item.name;
    bigImage.alt = item.name;
  };

  image.addEventListener("click", function() {
    openImage(item);
    openPopup(popupImage);
  });

  return(card);
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const newCard = createCard({link: linkInput.value, name: titleInput.value});
  container.prepend(newCard);
  closePopup(popupElement);
  formCard.reset();
};

formCard.addEventListener('submit', handleAddCardFormSubmit);

initialCards.forEach((item) => {
  const card = createCard(item);
  container.append(card);
});



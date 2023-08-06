const profileAditButton = document.querySelector('.profile__adit-button');
const popupProfile = document.querySelector('.popup_type_profile')
const profileForm = document.forms["profile-form"];
const nameInput = profileForm.querySelector('.popup__input_type_name');
const jobInput = profileForm.querySelector('.popup__input_type_job');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const profileAddButton = document.querySelector('.profile__add-button');
const popupElement = document.querySelector('.popup_type_element');
const container = document.querySelector('.elements__cards');
const cards = document.querySelector('#element-template').content;
const cardForm = document.forms["card-form"];
const titleInput = cardForm.querySelector('.popup__input_type_title');
const linkInput = cardForm.querySelector('.popup__input_type_link');
const popupImage = document.querySelector('.popup_type_image');
const bigImage = popupImage.querySelector(".popup__image");
const titleBigImage = popupImage.querySelector(".popup__title-image");
const popups = document.querySelectorAll('.popup')

function closePopupKeyEsc(evt) {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    if (popupOpened) {
      closePopup(popupOpened);
    };
  };
};

// Обработчик оверлея и крестиков
popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
            closePopup(popup);
        }
        if (evt.target.classList.contains('popup__button-close')) {
          closePopup(popup);
        };
    });
});

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupKeyEsc);
};

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupKeyEsc);
};

profileAditButton.addEventListener("click", function() {
  openPopup(popupProfile);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
});

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupProfile);
};

profileForm.addEventListener('submit', handleProfileFormSubmit);

profileAddButton.addEventListener("click", function() {
  openPopup(popupElement);
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
};

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const newCard = createCard({link: linkInput.value, name: titleInput.value});
  container.prepend(newCard);
  closePopup(popupElement);
  cardForm.reset();
};

cardForm.addEventListener('submit', handleAddCardFormSubmit);

initialCards.forEach((item) => {
  const card = createCard(item);
  container.append(card);
});

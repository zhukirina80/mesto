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
const template = document.querySelector('#element-template').content;
const formElement = document.querySelector('.popup__form_element');
const titleInput = formElement.querySelector('.popup__input_type_title');
const linkInput = formElement.querySelector('.popup__input_type_link');
const popupImage = document.querySelector('.popup_type_image');
const buttonClosePopupImage = popupImage.querySelector(".popup__button-close_image");
const bigImage = popupImage.querySelector(".popup__image");
const titleBigImage = popupImage.querySelector(".popup__title-image");

function openPopup(popupProfile) {
  popupProfile.classList.add('popup_opened');
}

function closePopup(popupProfile) {
  popupProfile.classList.remove('popup_opened');
}

function handleFormSubmit (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup(popupProfile);
}
profileAditButton.addEventListener("click", function() {
  openPopup(popupProfile);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
})

buttonClosePopupProfile.addEventListener("click", function() {
  closePopup(popupProfile);
})

formProfile.addEventListener('submit', handleFormSubmit);

function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');
}

function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened');
}
profileAddButton.addEventListener("click", function() {
  openPopup(popupElement);
})

buttonClosePopupElement.addEventListener("click", function() {
  closePopup(popupElement);
})

function openPopup(popupImage) {
  popupImage.classList.add('popup_opened');
}

buttonClosePopupImage.addEventListener("click", function() {
  closePopup(popupImage);
})

function closePopup(popupImage) {
  popupImage.classList.remove('popup_opened');
}

const renderElement = (item) => {
  const li = template.querySelector('.element').cloneNode(true);
  const img = li.querySelector('.element__image');
  img.src = item.link;
  const title = li.querySelector('.element__title');
  title.textContent = item.name;
  img.alt = `${title.textContent}`;

  li.querySelector('.element__delete-button').addEventListener('click', () => {
    li.remove();
  })

  li.querySelector('.element__button-like').addEventListener('click', function (evt) {
   evt.target.classList.toggle('element__button-like_active');
  });

  container.append(li);

  function openImage () {
    bigImage.src = img.src;
    titleBigImage.textContent = title.textContent;
  }

  img.addEventListener("click", function() {
    openImage();
    openPopup(popupImage);
  })
}

initialCards.forEach((item) => {
  renderElement(item);
})

function addEventListener(evt) {
  evt.preventDefault();
  const newElement = template.querySelector('.element').cloneNode(true);
  const newImg = newElement.querySelector('.element__image');
  newImg.src = linkInput.value;
  const newTitle = newElement.querySelector('.element__title');
  newTitle.textContent = titleInput.value;
  newImg.alt = `${newTitle.textContent}`;
  container.prepend(newElement);
  closePopup(popupElement);
  formElement.reset();

  newElement.querySelector('.element__delete-button').addEventListener('click', () => {
    newElement.remove();
  })

  newElement.querySelector('.element__button-like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__button-like_active');
  })

  function openNewImage () {
    bigImage.src = newImg.src;
    titleBigImage.textContent = newTitle.textContent;
  }

  newImg.addEventListener("click", function() {
    openNewImage();
    openPopup(popupImage);
  })
}

formElement.addEventListener('submit', addEventListener);






















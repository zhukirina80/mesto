import { openPopup } from "./utils.js";

class Card {
  constructor({ name, link }) {
    this._name = name;
    this._link = link;
  }

  _getTemplate() {
    const templateSelector = document
    .querySelector('#element-template')
    .content
    .querySelector('.element')
    .cloneNode(true);

    return templateSelector;
  }

  _setData() {
    const image = this._newCard.querySelector('.element__image');
    image.src = this._link;
    const title = this._newCard.querySelector('.element__title');
    title.textContent = this._name;
    image.alt = this._name;
  }

  _handleDeleteCard() {
    this._newCard.remove();
    this._newCard = null;
  }

  _openImage() {
    const popupImage = document.querySelector('.popup_type_image');
    const bigImage = popupImage.querySelector('.popup__image');
    const titleBigImage = popupImage.querySelector('.popup__title-image');
    bigImage.src = this._link;
    titleBigImage.textContent = this._name;
    bigImage.alt = this._name;
  }

  _setListeners() {
    this._newCard.querySelector('.element__delete-button').addEventListener('click', () => {
      this._handleDeleteCard();
    })

    this._newCard.querySelector('.element__button-like').addEventListener('click', function(evt) {
      evt.target.classList.toggle('element__button-like_active');
    })

    this._newCard.querySelector('.element__image').addEventListener("click", () => {
      this._openImage();
      openPopup(document.querySelector('.popup_type_image'));
    })
  }

  getView() {
    this._newCard = this._getTemplate();
    this._setData();
    this._setListeners();

    return this._newCard;
  }
}

export default Card;

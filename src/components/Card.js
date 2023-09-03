export default class Card {
  constructor({ name, link }, templateSelector, handleCardClick) {
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardTemplate = document
    .querySelector(this._templateSelector)
    .content
    .querySelector('.element')
    .cloneNode(true);

    return cardTemplate;
  }

  _setData() {
    this._image.src = this._link;
    const title = this._newCard.querySelector('.element__title');
    title.textContent = this._name;
    this._image.alt = this._name;
  }

  _handleDeleteCard() {
    this._newCard.remove();
    this._newCard = null;
    this._image =  null;
    this._buttonLike = null;

  }

  _handleLikeCard() {
    this._buttonLike.classList.toggle('element__button-like_active');
  }

  _setListeners() {
    this._newCard.querySelector('.element__delete-button').addEventListener('click', () => {
      this._handleDeleteCard();
    })

    this._buttonLike.addEventListener('click', () => {
      this._handleLikeCard();
    })

    this._image.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    })
  }

   getView() {
    this._newCard = this._getTemplate();
    this._image = this._newCard.querySelector('.element__image');
    this._buttonLike = this._newCard.querySelector('.element__button-like');
    this._setData();
    this._setListeners();

    return this._newCard;
   }
}

export default class Card {
  constructor({ name, link, _id, owner, likes }, templateSelector, handleCardClick, userId, handleLikeClick, handleDislikeClick, handleDeleteCard) {
    this._name = name;
    this._link = link;
    this._id = _id;
    this._ownerId = owner._id;
    this._likes = likes;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDislikeClick = handleDislikeClick;
    this._handleDeleteCard = handleDeleteCard;
    this._userId = userId;
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

  _isLiked() {
    if (this._likes.some((like) => like._id === this._userId)) {
      this._buttonLike.classList.add('element__button-like_active')
    }
  }

  _handleLikeCard() {
    if (this._likes.some((like) => like._id === this._userId)) {
      this._handleDislikeClick(this._id);
    } else {
      this._handleLikeClick(this._id);
    }
  }

  updateLikes() {
    const likesCounter = this._newCard.querySelector('.element__number-of-likes');
    likesCounter.textContent = this._likes.length;
  }

  deleteLike(data) {
    this._buttonLike.classList.remove('element__button-like_active');
    this._likes = data.likes;
    this.updateLikes();
  }

  addLike(data) {
    this._buttonLike.classList.add('element__button-like_active');
    this._likes = data.likes;
    this.updateLikes();
  }

  _hadleClickBtnDelite() {
    this._handleDeleteCard(this);
  }

  _setListeners() {
    this._buttonDelete.addEventListener('click', () => {
    this._hadleClickBtnDelite();
    })

    this._buttonLike.addEventListener('click', () => {
      this._handleLikeCard();
    })

    this._image.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    })
  }

  removeCard() {
    this._newCard.remove();
    }

  getView(userId) {
    this._newCard = this._getTemplate();
    this._image = this._newCard.querySelector('.element__image');
    this._buttonDelete = this._newCard.querySelector('.element__delete-button');
    this._buttonLike = this._newCard.querySelector('.element__button-like');

    if (this._ownerId !== userId) {
      this._buttonDelete.remove();
      }

    this.updateLikes();
    this._setData();
    this._isLiked();
    this._setListeners();

    return this._newCard;
   }
}


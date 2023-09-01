import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector){
    super(popupSelector);
    this._popupImage = document.querySelector('.popup_type_image');
    this._bigImage = this._popupImage.querySelector('.popup__image');
    this._titleBigImage = this._popupImage.querySelector('.popup__title-image');
  }

  open(name, link) {
    super.open();
    this._bigImage.src = link;
    this._titleBigImage.textContent = name;
    this._bigImage.alt = name;
  }
}



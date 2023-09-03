import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector){
    super(popupSelector);
    this._bigImage = this._popup.querySelector('.popup__image');
    this._titleBigImage = this._popup.querySelector('.popup__title-image');
  }

  open(name, link) {
    super.open();
    this._bigImage.src = link;
    this._titleBigImage.textContent = name;
    this._bigImage.alt = name;
  }
}



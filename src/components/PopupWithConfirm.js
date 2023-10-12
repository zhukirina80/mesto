import Popup from "./Popup.js";

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector){
    super(popupSelector);
    this._form = this._popup.querySelector('.popup__form');
  }

  setCardId(id) {
    this._cardId = id;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();

      this._formSubmitConfirm(this._cardId);
    });
  }

  handleFormSubmitConfirm(callback) {
    this._formSubmitConfirm = callback;
  }
}

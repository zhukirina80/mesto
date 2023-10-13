import Popup from "./Popup.js";

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector){
    super(popupSelector);
    this._form = this._popup.querySelector('.popup__form');
  }

  setItemId(id) {
    this._itemId = id;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();

      this._formSubmitConfirm(this._itemId);
    });
  }

  handleFormSubmitConfirm(callback) {
    this._formSubmitConfirm = callback;
  }
}

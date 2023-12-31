import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, buttonSelector, handleFormSubmit){
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector('.popup__form');
    this._inputs = this._form.querySelectorAll('.popup__input');
    this._buttonElement = this._popup.querySelector(buttonSelector);
    this._originalButtonText = this._buttonElement.textContent;
  }

  _getInputValues() {
    this._formValues = {};
    this._inputs.forEach((input) => {
      this._formValues[input.name] = input.value;
    })

    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();

      this._handleFormSubmit(this._getInputValues());
    });
  }

  close() {
    super.close();
    this._form.reset();
  }

    renderLoading(isLoading) {
      if (isLoading) {
        this._buttonElement.textContent = 'Сохранение...';
      } else {
        this._buttonElement.textContent = this._originalButtonText;
      }
    }
}

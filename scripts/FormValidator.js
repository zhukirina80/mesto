class FormValidator {
  constructor(formElement, validationConfig) {
    this._validationConfig = validationConfig;
    this._formElement = formElement;
    this._inputList = Array.from(formElement.querySelectorAll(this._validationConfig.inputSelector));
    this._buttonElement = formElement.querySelector(this._validationConfig.submitButtonSelector);
  }

  // Метод, который проверяет на валидность все поля инпута
  _hasInvalidInput() {
    return this._inputList.some(inputElement => !inputElement.validity.valid);
  }

  // Метод, который деактивирует кнопку формы
  _disableButton() {
    this._buttonElement.classList.add(this._validationConfig.inactiveButtonClass);
    this._buttonElement.disabled = true;
  }

   // Метод, который активирует кнопку формы
  _enableButton() {
    this._buttonElement.classList.remove(this._validationConfig.inactiveButtonClass);
    this._buttonElement.disabled = false;
  }

  // Метод, который меняет сосояние кнопки формы
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._disableButton();
    } else {
      this._enableButton();
    }
  }

  // Метод, который добавляет класс с ошибкой
  _showInputError(inputElement) {
    inputElement.classList.add(this._validationConfig.inputErrorClass);
    const spanElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    spanElement.textContent = inputElement.validationMessage;
    spanElement.classList.add(this._validationConfig.errorClass);
  }

  // Метод, который удаляет класс с ошибкой
  _hideInputError(inputElement) {
    inputElement.classList.remove(this._validationConfig.inputErrorClass);
    const spanElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    spanElement.textContent = '';
    spanElement.classList.remove(this._validationConfig.errorClass);
  }

  // Метод, который проверяет валидность инпута
  _isValid(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  enableValidation(){
    // деактивируем кнопку при 1й загрузке сайта
    this._toggleButtonState();
    this._formElement.addEventListener('reset', () => {
      this._disableButton();
    })

    this._inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._isValid(inputElement);
        this._toggleButtonState();
      })
    })
  }
}

export default FormValidator;

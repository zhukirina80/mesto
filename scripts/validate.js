const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

// Функция, которая добавляет класс с ошибкой
  const showInputError = (formElement, inputElement, validationConfig) => {
    inputElement.classList.add(validationConfig.inputErrorClass);
    const spanElement = formElement.querySelector(`.${inputElement.id}-error`);
    spanElement.textContent = inputElement.validationMessage;
    spanElement.classList.add(validationConfig.errorClass);
  };

  // Функция, которая удаляет класс с ошибкой
  const hideInputError = (formElement, inputElement, validationConfig) => {
    inputElement.classList.remove(validationConfig.inputErrorClass);
    const spanElement = formElement.querySelector(`.${inputElement.id}-error`);
    spanElement.textContent = '';
    spanElement.classList.remove(validationConfig.errorClass);
  };

  // Функция, которая проверяет валидность инпута
  const isValid = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, validationConfig);
    } else {
      hideInputError(formElement, inputElement, validationConfig);
    };
  };

  // Функция, которая проверяет на валидность все поля инпута
  const hasInvalidInput = (inputList) => {
    return inputList.some(inputElement => !inputElement.validity.valid);
  };

  // Функция, которая меняет сосояние кнопки формы
  const toggleButtonState = (inputList, buttonElement, validationConfig) => {
    if (hasInvalidInput(inputList)) {
      buttonElement.classList.add(validationConfig.inactiveButtonClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(validationConfig.inactiveButtonClass);
      buttonElement.disabled = false;
    };
  };

  // Функция, которая вешает слушатели на инпуты и кнопку формы
  const setEventListeners = (formElement, validationConfig) => {
    const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
    const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);

    toggleButtonState(inputList, buttonElement, validationConfig);
    inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        isValid(formElement, inputElement);
        toggleButtonState(inputList, buttonElement, validationConfig);
      });
    });
  };

// Функция для включения валидации на форме
const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
  formList.forEach(formElement => {
    setEventListeners(formElement, validationConfig);
  });
};

enableValidation(validationConfig);

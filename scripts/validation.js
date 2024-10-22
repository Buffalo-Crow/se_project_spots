const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: "modal__submit-button",
  inactiveButtonClass: "modal__submit-button-disabled",
  errorClass: "modal__error",
};

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorMessageId = formElement.querySelector(`#${inputElement.id}-error`);
  errorMessageId.textContent = errorMessage;
  inputElement.classList.add("modal__input_error");
};

const hideInputError = (formElement, inputElement) => {
  const errorMessageId = formElement.querySelector(`#${inputElement.id}-error`);
  errorMessageId.textContent = "";
  inputElement.classList.remove("modal__input_error");
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((input) => {
    return !input.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement, config) => {
  if (hasInvalidInput(inputList)) {
    disableButton(buttonElement);
    buttonElement.classList.add(config.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(config.inactiveButtonClass);
  }
};

const disableButton = (buttonElement) => {
  buttonElement.disabled = true;
};

const resetValidation = (formElement, inputElement, inputList) => {
  inputList.forEach((input) => {
    hideInputError(formElement, inputElement);
  });
};

const setEventListeners = (formElement, config) => {
  const inputList = Array.from(formElement.querySelectorAll(".modal__input"));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = (config) => {
  const formList = document.querySelectorAll(config.formSelector);
  formList.forEach((formElement) => {
    setEventListeners(formElement, config);
  });
};

enableValidation(settings);

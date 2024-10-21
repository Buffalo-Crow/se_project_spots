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

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add("modal__submit-button-disabled");
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove("modal__submit-button-disabled");
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(".modal__input"));
  const buttonElement = formElement.querySelector(".modal__submit-button");
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
  toggleButtonState(inputList, buttonElement);
};

const enableValidation = () => {
  const formList = document.querySelectorAll(".modal__form");
  formList.forEach((formElement) => {
    setEventListeners(formElement);
  });
};

enableValidation();

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorMessageId = inputElement.id + "-error";
  const errorElement = formElement.querySelector(`#${errorMessageId} `);
  errorElement.textContent = errorMessage;
  errorElement.classList.add("modal__error");
  inputElement.classList.add("modal__input-error");
};

const hideInputError = (formElement, inputElement) => {
  const errorMessageId = inputElement.id + "error";
  const errorElement = formElement.querySelector(`${errorMessageId}`);
  errorElement.textContent = "";
  errorElement.classList.remove("modal__error");
  inputElement.classList.remove("modal__input-error");
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const toggleButtonState = (inputList, buttonElement) => {
  const isFormValid = inputList.every((input) => input.validity.valid);
  buttonElement.disabled = !isFormValid;
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

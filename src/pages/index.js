import { enableValidation } from "../scripts/validation.js";
import { settings } from "../scripts/validation.js";
import { resetValidation } from "../scripts/validation.js";
import "./index.css";

const initialCards = [
  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  },
  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },
  {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  },
  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },
  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Golden Gate Bridge",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg",
  },
];

//Profile Elements
const profileButtonEdit = document.querySelector(".profile__button-edit");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const cardModalButton = document.querySelector(".profile__button-new");

// Form Elements
const editModal = document.querySelector("#edit-modal");
const editFormElement = document.forms["edit-profile"];
const editModalCloseBtn = editModal.querySelector(".modal__close-button");
const editModalNameInput = editModal.querySelector("#profile-name-input");
const editModalDescriptionInput = editModal.querySelector(
  "#profile-description-input"
);

const closeButtons = document.querySelectorAll(".modal__close");

//Card Elements
const cardModal = document.querySelector("#add-card-modal");
const cardForm = document.forms["add-card-form"];
const closeModalButton = cardModal.querySelector(".modal__close-button");
const cardCaptionInput = cardModal.querySelector("#add-card-caption-input");
const cardUrlInput = cardModal.querySelector("#add-card-image-input");
const previewModal = document.querySelector("#preview-modal");
const previewModalImageEl = previewModal.querySelector(".modal__image");
const previewModalCaptionEl = previewModal.querySelector(".modal__caption");
const closePreviewModalButton = previewModal.querySelector(
  ".modal__close-button-type-preview"
);
const cardSubmitButton = cardModal.querySelector(".modal__submit-button");

//Card Elements
const cardTemplate = document.querySelector("#card-template");
const cardsList = document.querySelector(".cards__list");

const config = {
  errorClass: "modal__error",
  inputErrorClass: "modal__input_error",
};

function getCardElement(data) {
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);

  const cardNameEl = cardElement.querySelector(".card__caption");
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");

  cardNameEl.textContent = data.name;
  cardImageEl.src = data.link;
  cardImageEl.alt = data.name;

  cardLikeButton.addEventListener("click", () => {
    cardLikeButton.classList.toggle("card__like-button_liked");
  });

  cardDeleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImageEl.addEventListener("click", () => {
    openModal(previewModal);
    previewModalImageEl.src = data.link;
    previewModalImageEl.alt = data.name;
    previewModalCaptionEl.textContent = data.name;
  });

  return cardElement;
}

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", handleModalClose);
  modal.addEventListener("mousedown", handleModalClose);
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleModalClose);
  modal.removeEventListener("mousedown", handleModalClose);
}

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = editModalNameInput.value;
  profileDescription.textContent = editModalDescriptionInput.value;
  closeModal(editModal);
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const inputValue = { name: cardCaptionInput.value, link: cardUrlInput.value };
  const cardEl = getCardElement(inputValue);
  cardsList.prepend(cardEl);
  closeModal(cardModal);
  disableButton(cardSubmitButton, settings);
  evt.target.reset();
}
profileButtonEdit.addEventListener("click", () => {
  const formElement = document.querySelector("#edit-modal .modal__form");
  const inputList = formElement.querySelectorAll(".modal__input");
  editModalDescriptionInput.value = profileDescription.textContent;
  editModalNameInput.value = profileName.textContent;
  openModal(editModal);
  resetValidation(formElement, inputList, config);
});

editModalCloseBtn.addEventListener("click", () => {
  closeModal(editModal);
});

cardModalButton.addEventListener("click", () => {
  openModal(cardModal);
});

closeModalButton.addEventListener("click", () => {
  closeModal(cardModal);
});

closePreviewModalButton.addEventListener("click", () => {
  closeModal(previewModal);
});

//event listeners for forms
editFormElement.addEventListener("submit", handleEditFormSubmit);

cardForm.addEventListener("submit", handleCardFormSubmit);

initialCards.forEach((item) => {
  const cardEl = getCardElement(item);
  cardsList.append(cardEl);
});

function handleModalClose(event) {
  if (event.key === "Escape" && event.type === "keydown") {
    const openedModalPopUp = document.querySelector(".modal_opened");
    closeModal(openedModalPopUp);
  }
  if (event.target.classList.contains("modal")) {
    closeModal(event.target);
  }
}

enableValidation(settings);

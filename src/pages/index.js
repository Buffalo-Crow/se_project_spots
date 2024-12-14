import { enableValidation } from "../scripts/validation.js";
import { settings } from "../scripts/validation.js";
import { resetValidation } from "../scripts/validation.js";
import { disableButton } from "../scripts/validation.js";
import "./index.css";
import { Api } from "../utils/Api.js";

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "54dfd835-b3bb-4c3b-9ed6-5693cba3f772",
    "Content-Type": "application/json",
  },
});

api
  .getAppInfo()
  .then(([cards, userInfo]) => {
    cards.forEach((item) => {
      const cardEl = getCardElement(item);
      cardsList.append(cardEl);
    });

    profileName.textContent = userInfo.name;
    profileDescription.textContent = userInfo.about;
    profileAvatar.src = userInfo.avatar;
  })
  .catch(console.error);

//Profile Elements
const profileButtonEdit = document.querySelector(".profile__button-edit");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const cardModalButton = document.querySelector(".profile__button-new");
const profileAvatar = document.querySelector(".profile__avatar");

// Avatar Modal Elements
const avatarEditModal = document.querySelector("#avatar-modal");
const avatarModalBtn = document.querySelector(".profile__avatar-btn");
const avatarCloseButton = avatarEditModal.querySelector(".modal__close-button");
const avatarUrlInput = avatarEditModal.querySelector("#profile-avatar-input");
const avatarForm = avatarEditModal.querySelector("#avatar-edit-form");

// Form Elements
const editModal = document.querySelector("#edit-modal");
const editFormElement = document.forms["edit-profile"];
const editModalCloseBtn = editModal.querySelector(".modal__close-button");
const editModalNameInput = editModal.querySelector("#profile-name-input");
const editModalDescriptionInput = editModal.querySelector(
  "#profile-description-input"
);

//Card Elements
const cardModal = document.querySelector("#add-card-modal");
const cardForm = document.forms["add-card-form"];
const closeModalButton = cardModal.querySelector(".modal__close-button");
const cardCaptionInput = cardModal.querySelector("#add-card-caption-input");
const cardUrlInput = cardModal.querySelector("#add-card-image-input");
const cardTemplate = document.querySelector("#card-template");
const cardsList = document.querySelector(".cards__list");
const cardSubmitButton = cardModal.querySelector(".modal__submit-button");

const cardDeleteModal = document.querySelector("#delete-modal");
const cardDeleteButton = document.querySelector("#card-delete-button");

//Preview Elements
const previewModal = document.querySelector("#preview-modal");
const previewModalImageEl = previewModal.querySelector(".modal__image");
const previewModalCaptionEl = previewModal.querySelector(".modal__caption");
const closePreviewModalButton = previewModal.querySelector(
  ".modal__close-button-type-preview"
);

const config = {
  errorClass: "modal__error",
  inputErrorClass: "modal__input_error",
};

//functions
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
  api
    .editUserInfo({
      name: editModalNameInput.value,
      about: editModalDescriptionInput.value,
    })
    .then((data) => {
      profileName.textContent = data.name;
      profileDescription.textContent = data.about;
      closeModal(editModal);
    })
    .catch(console.error);
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  api
    .addNewCard({
      name: cardCaptionInput.value,
      link: cardUrlInput.value,
    })
    .then((data) => {
      const cardEl = getCardElement(data);
      cardsList.prepend(cardEl);
      closeModal(cardModal);
      disableButton(cardSubmitButton, settings);
      evt.target.reset();
    })
    .catch(console.error);
}

function handleAvatarSubmit(evt) {
  evt.preventDefault();
  api
    .editAvatar({
      avatar: avatarUrlInput.value,
    })
    .then((data) => {
      profileAvatar.src = data.avatar;
      closeModal(avatarEditModal);
    });
}

function handleModalClose(event) {
  if (event.key === "Escape" && event.type === "keydown") {
    const openedModalPopUp = document.querySelector(".modal_opened");
    closeModal(openedModalPopUp);
  }
  if (event.target.classList.contains("modal")) {
    closeModal(event.target);
  }
}

//Listeners
profileButtonEdit.addEventListener("click", () => {
  const formElement = document.querySelector("#edit-modal .modal__form");
  const inputList = formElement.querySelectorAll(".modal__input");
  editModalDescriptionInput.value = profileDescription.textContent;
  editModalNameInput.value = profileName.textContent;
  openModal(editModal);
  resetValidation(formElement, inputList, config);
});

//close button listeners
editModalCloseBtn.addEventListener("click", () => {
  closeModal(editModal);
});

avatarCloseButton.addEventListener("click", () => {
  closeModal(avatarEditModal);
});

closeModalButton.addEventListener("click", () => {
  closeModal(cardModal);
});

closePreviewModalButton.addEventListener("click", () => {
  closeModal(previewModal);
});

//open button listeners
cardModalButton.addEventListener("click", () => {
  openModal(cardModal);
});

avatarModalBtn.addEventListener("click", () => {
  openModal(avatarEditModal);
});

//listeners for form handlers
editFormElement.addEventListener("submit", handleEditFormSubmit);

cardForm.addEventListener("submit", handleCardFormSubmit);

avatarForm.addEventListener("submit", handleAvatarSubmit);

enableValidation(settings);

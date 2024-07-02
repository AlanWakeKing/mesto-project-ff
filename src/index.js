import _ from "lodash";
import "./styles/scss/styles.scss";
import { initialCards } from "./scripts/cards.js";
import { createCard, deleteCard, likeCards } from "./scripts/card.js";
import { openPopup, closePopup } from "./scripts/modal.js";
import { enableValidation,clearValidation } from "./scripts/validation.js";

const mContent = document.querySelector(".content");
const cardsContent = mContent.querySelector(".places__list");

function addCards(cardData, deleteCard) {
  const cardElement = createCard(cardData, deleteCard, openCards, likeCards);
   cardsContent.prepend(cardElement);
}
initialCards.forEach((card) => {
  addCards(card, deleteCard);
});
const formEdit = document.forms["edit-profile"];
const name = formEdit.elements.name;
const description = formEdit.elements.description;

const formCreate = document.forms["new-place"];
const placeName = formCreate.elements["place-name"];
const link = formCreate.elements["link"];

const profileTitle = mContent.querySelector(".profile__title");
const profileDescription = mContent.querySelector(".profile__description");

const editProfileButton = mContent.querySelector(".profile__edit-button");

editProfileButton.addEventListener("click", () => {
	fiilEditForm();
  openPopup(popupEdit);
	clearValidation(formEdit,[name,description]);
});

const addProfileButton = mContent.querySelector(".profile__add-button");
addProfileButton.addEventListener("click", () => {
  openPopup(popupNew);
	clearValidation(formCreate,[placeName,link]);
});

const popupNew = document.querySelector(".popup_type_new-card");
const popupEdit = document.querySelector(".popup_type_edit");

const closeButton = document.querySelectorAll(".popup__close");

const imgPopup = document.querySelector(".popup_type_image");
const popupImgConteiner = imgPopup.querySelector(".popup__image");
const popupCaption = imgPopup.querySelector(".popup__caption");

export function openCards(evt) {
  if (evt.target.classList.contains("card__image")) {
    popupImgConteiner.src = evt.target.src;
    popupImgConteiner.alt = evt.target.alt;
    popupCaption.textContent = evt.target.alt;
    openPopup(imgPopup);
  }
}

closeButton.forEach((closeButton) => {
  const closesPopup = closeButton.closest(".popup");

  closeButton.addEventListener("click", () => {
    closePopup(closesPopup);
    if (closesPopup.classList.contains("popup_type_new-card")) {
      resetCreateForm();
			clearValidation(formCreate,[placeName,link]);
    }
  });
});



function profileEdit(evt) {
  evt.preventDefault();
  profileTitle.textContent = name.value;
  profileDescription.textContent = description.value;
  closePopup(popupEdit);
}
formEdit.addEventListener("submit", profileEdit);

function createCards(evt) {
  evt.preventDefault();
  addCards({ name: placeName.value, link: link.value }, deleteCard);
  closePopup(popupNew);
}

formCreate.addEventListener("submit", createCards);

function fiilEditForm() {
	name.value = profileTitle.textContent; 
	description.value = profileDescription.textContent;;
}

function resetCreateForm() {
  formCreate.reset();
}
const validationConf = {
	formSelector: ".popup__form",
	inputSelector: ".popup__input",
	submitButtonSelector: ".popup__button",
	inactiveButtonClass:".popup_button_disabled",
	inputErrorClass: "popup__input_type_error",
	errorClass: "popup__error_visible",
};
enableValidation();

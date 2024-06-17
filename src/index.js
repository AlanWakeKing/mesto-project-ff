import _ from "lodash";
import "./styles/scss/styles.scss";
import { initialCards } from "./scripts/cards.js";
import { createCard, deleteCard, likeCards } from "./scripts/card.js";
import { openPopup, closePopup} from "./scripts/modal.js";

const mContent = document.querySelector(".content");
const cardsContent = mContent.querySelector(".places__list");

function getCards(cardData, deleteCard) {
  const cardElement = createCard(cardData, deleteCard, openCards, likeCards);
  cardsContent.prepend(cardElement);
}
initialCards.forEach((card) => {
  getCards(card, deleteCard);
});
const formEdit = document.forms['edit-profile'];
const name = formEdit.elements.name;
const description = formEdit.elements.description;

const profileTitle = mContent.querySelector(".profile__title");
const profileDescription = mContent.querySelector(".profile__description");

const editProfileButton = mContent.querySelector(".profile__edit-button");

editProfileButton.addEventListener("click", () => {
	openPopup(popupEdit);
})

const addProfileButton = mContent.querySelector(".profile__add-button");
addProfileButton.addEventListener("click", () => {
	openPopup(popupNew);
})

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

    if (closesPopup.classList.contains("popup_type_edit")) {
      resetEditForm();
    }

    if (closesPopup.classList.contains("popup_type_new-card")) {
      resetCreateForm();
    }
  });
});

name.value = profileTitle.textContent;
description.value = profileDescription.textContent;

function hadleEditFormSubmit(evt) {
	evt.preventDefault();	
	profileTitle.textContent = name.value;
	profileDescription.textContent = description.value;
	closePopup(popupEdit);
}
formEdit.addEventListener("submit", hadleEditFormSubmit);
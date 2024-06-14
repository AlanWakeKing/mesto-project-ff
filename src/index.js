import _ from 'lodash';
import './styles/scss/styles.scss';
import {openPopup, closePopup, handleOverlayClose} from './scripts/modal.js';
import {createCard,deleteCard} from './scripts/card.js';



const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const popupNew = document.querySelector(".popup_type_new-card");
const popupEdit = document.querySelector(".popup_type_edit");
const popupEditAvatar = document.querySelector(".popup_type_edit-avatar");
const popupCloseButton = document.querySelector(".popup__close");
const popups = document.querySelectorAll(".popup");
const popupImage = document.querySelector(".popup_type_image");
const caption = document.querySelector(".popup__caption");
const image = document.querySelector(".popup__image");


const avatarButton = document.querySelector(".profile__image");
const nameInput = document.querySelector(".profile__title");

// @todo: Темплейт карточки

// @todo: DOM узлы





function openImage(link, name) {
  image.src = link;
  image.alt = name;

  openModal(popupImage);
}


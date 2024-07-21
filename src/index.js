import _ from "lodash";
import "./styles/scss/styles.scss";

import { getCardsArray, getUserData, sendUserData, sendCardData, changeUserAvatar } from "./scripts/api.js";
import { createCard, deleteCard, likeCards } from "./scripts/card.js";
import { openPopup, closePopup } from "./scripts/modal.js";
import { enableValidation,clearValidation } from "./scripts/validation.js";


const mContent = document.querySelector(".content");
const cardsContent = mContent.querySelector(".places__list");

const formEdit = document.forms["edit-profile"];
const name = formEdit.elements.name;
const description = formEdit.elements.description;

const formCreate = document.forms["new-place"];
const placeName = formCreate.elements["place-name"];
const link = formCreate.elements.link;

const profileTitle = mContent.querySelector(".profile__title");
const profileDescription = mContent.querySelector(".profile__description");
const profileAvaPic = mContent.querySelector(".profile__image");

const editProfileButton = mContent.querySelector(".profile__edit-button");

const popupNew = document.querySelector(".popup_type_new-card");
const popupEdit = document.querySelector(".popup_type_edit");

const closeButtons = document.querySelectorAll(".popup__close");

const imgPopup = document.querySelector(".popup_type_image");
const popupImgConteiner = imgPopup.querySelector(".popup__image");
const popupCaption = imgPopup.querySelector(".popup__caption");

const changeAvatarButton = mContent.querySelector('.profile__image');
const changeAvatarPopup = document.querySelector('.popup_type_change-avatar')

let userId;
function addCards(cardDatas, deleteCard) {
  const cardElement = createCard(cardDatas, deleteCard, openCards, likeCards);
   cardsContent.prepend(cardElement);
}

editProfileButton.addEventListener("click", () => {
	fiilEditForm();
  openPopup(popupEdit);
	clearValidation(formEdit,validationConf);
});

const addProfileButton = mContent.querySelector(".profile__add-button");
addProfileButton.addEventListener("click", () => {
  openPopup(popupNew);
	clearValidation(formCreate,validationConf);
});

changeAvatarButton.addEventListener('click', () => {
	openPopup(changeAvatarPopup);
	clearValidation(formChangeAvatarElement, validationConf);
});
export function openCards(evt) {
    popupImgConteiner.src = evt.target.src;
    popupImgConteiner.alt = evt.target.alt;
    popupCaption.textContent = evt.target.alt;
    openPopup(imgPopup);
  }

closeButtons.forEach((closeButton) => {
  const closesPopup = closeButton.closest(".popup");

  closeButton.addEventListener("click", () => {
    closePopup(closesPopup);
  //   if (closesPopup.classList.contains("popup_type_new-card")) {
  //     resetCreateForm();
	// 		clearValidation(formCreate,validationConf);
  //   }
	// 	if(closesPopup.classList.contains('popup_type_change-avatar')) {
	// 		resetChangeAvatarForm();
	// 		clearValidation(formChangeAvatarElement, validationConf);
	// }
  });
});
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
	renderLoading(true,formEdit.elements['edit-button']);

	sendUserData({name: name.value, about: description.value})
		.then((res) => {
			profileTitle.textContent = res.name;
			profileDescription.textContent = res.about;
			closePopup(popupEdit);
		})
		.catch((err) => {
			console.log(err);
		})
		.finally(() => renderLoading(false, formEdit.elements['edit-button']));
  
}
formEdit.addEventListener("submit", handleProfileFormSubmit);

// function createCards(evt) {
//   evt.preventDefault();
// 	renderLoading(true,formCreate.elements['new-card-button']);

// 	sendCardData({ name: placeName.value, link: link.value })
// 	.then((card) => {
// 		console.log(card);
// 			formCreate.reset();
// 	})
// 	.catch((err) => {
// 		console.log(err);
// 	})
// 	.finally(() => renderLoading(false, formCreate.elements['new-card-button']));
//   closePopup(popupNew);
// }

function createCards(evt) {
  evt.preventDefault();
	renderLoading(true,formCreate.elements['new-card-button']);

	sendCardData({ name: placeName.value, link: link.value })
	.then((card) => {
		addCards({name: card.name,
			link: card.link,
			cardId: card._id,
			cardOwnerId: card.owner._id,
			myId: card.owner._id,
			likes: card.likes
			}, deleteCard);
			formCreate.reset();
			closePopup(popupNew);
	})
	.catch((err) => {
		console.log(err);
	})
	.finally(() => renderLoading(false, formCreate.elements['new-card-button']));
  
}

formCreate.addEventListener("submit", createCards);

const formChangeAvatarElement = document.forms['change-avatar'];
const newAvatarUrlInput = formChangeAvatarElement.elements.link;

function handleChangeAvatarFormSubmit(evt) {
    evt.preventDefault();
    renderLoading(true, formChangeAvatarElement.elements['change-avatar-button']);
    changeUserAvatar(newAvatarUrlInput.value)
        .then(newAvatarConfig => {
					profileAvaPic.style = "background-image: url(" + newAvatarConfig.avatar + ");";
					closePopup(document.querySelector('.popup_is-opened'));
					resetChangeAvatarForm();
        })
        .catch(err => {console.log(err)})
				.finally(() => renderLoading(false, formChangeAvatarElement.elements['change-avatar-button']));

}

formChangeAvatarElement.addEventListener('submit', handleChangeAvatarFormSubmit);

function resetChangeAvatarForm() {
	formChangeAvatarElement.reset();
}

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
	inactiveButtonClass:"popup_button_disabled",
	inputErrorClass: "popup__input_type_error",
	errorClass: "popup__error_visible",
};


enableValidation(validationConf);



// Добавляю карточки, меняю инфу профиля

Promise.all([getCardsArray(), getUserData()])
.then(([cardsArray, myUserData]) => {
	cardsArray.reverse().forEach(card => addCards(
		{ name: card.name,
			link: card.link,
			cardId: card._id,
			cardOwnerId: card.owner._id,
			myId: myUserData._id,
			likes: card.likes}, deleteCard))

			changeUserData({name: myUserData.name,
				description: myUserData.about,
				avatar: myUserData.avatar});
    })
    .catch(err => {console.log(err)});

function changeUserData(userDataConfig) {
    profileTitle.textContent = userDataConfig.name;
    profileDescription.textContent = userDataConfig.description;
    profileAvaPic.style = "background-image: url(" + userDataConfig.avatar + ");";

    name.value = profileTitle.textContent;
		description.value = profileDescription.textContent;
}

const isLoadingText = 'Сохранение...';
const originalText = 'Сохранить';

function renderLoading(isLoading, button) {
	button.textContent = isLoading ? isLoadingText : originalText;
}
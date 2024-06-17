import {openCards} from '../index.js';

const cardsContent = document.querySelector(".places__list");
const cardTemplate = document.querySelector("#card-template").content;
export function createCard(cardData, deleteCard,openCards,likeCards) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  const cardImg = cardElement.querySelector(".card__image");
  cardImg.src = cardData.link;
  cardImg.alt = cardData.name;
	const cardLikeButton = cardElement.querySelector(".card__like-button");
  cardElement.querySelector(".card__title").textContent = cardData.name;

  cardElement.querySelector(".card__delete-button").addEventListener("click", deleteCard);

		cardImg.addEventListener('click', openCards);
		cardLikeButton.addEventListener('click', likeCards);

  return cardElement;
}
// @todo: Функция удаления карточки
export function deleteCard(evt) {
	const card = evt.target.closest(".card");
  card.remove();
}
export function likeCards() {
	if(evt.target.classList.contains("card__like-button")) {
		evt.target.classList.toggle("card__like-button_is-active");
	}
}


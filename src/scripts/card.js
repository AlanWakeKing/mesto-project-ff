import {deleteCardRequest, addLikeRequest, deleteLikeRequest} from "./api.js";

const cardTemplate = document.querySelector("#card-template").content;
export function createCard(cardData, deleteCard, openCards, likeCards) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
	const cardTitle = cardElement.querySelector(".card__title");
  const cardImg = cardElement.querySelector(".card__image");

  cardImg.src = cardData.link;
  cardImg.alt = cardData.name;
  cardTitle.textContent = cardData.name;
  cardImg.addEventListener("click", openCards);

	const cardDeleteButton = cardElement.querySelector(".card__delete-button");
	if(cardData.cardOwnerId != cardData.myId) {
		cardDeleteButton.classList.add("card__delete-button-hidden");		
	} else {
		cardDeleteButton.addEventListener('click',(evt) => {
				deleteCard(evt, cardData.cardId);
		});
	};

	const cardLikeButton = cardElement.querySelector(".card__like-button");
	if(cardData.likes != 0) {
		cardData.likes.some(element => {
				if(element._id === cardData.myId) {
						cardLikeButton.classList.add('card__like-button_is-active');
				}
		});
}

const cardLikeCounts = cardElement.querySelector('.card__like-counts');
    cardLikeCounts.textContent = cardData.likes.length;
    cardLikeButton.addEventListener('click', (evt) => {
			const likeMethod = (cardId) => cardLikeButton.classList.contains('card__like-button_is-active') ? deleteLikeRequest(cardId) : addLikeRequest(cardId);
			likeMethod(cardData.cardId)
					.then(newCardConfig => { 
							cardLikeCounts.textContent = newCardConfig.likes.length; 
							likeCards(evt); 
                })
                .catch(err => console.log(err));
    });
  return cardElement;
}
// @todo: Функция удаления карточки
export function deleteCard(evt, cardId) {
	deleteCardRequest(cardId)
			.then(() => {
					const card = evt.target.closest('.card');
					card.remove();
			})
			.catch(err => console.log(err));
}
export function likeCards(evt) {
    evt.target.classList.toggle("card__like-button_is-active");
}

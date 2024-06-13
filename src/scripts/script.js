const cardsContent = document.querySelector(".places__list");
const cardTemplate = document.querySelector("#card-template").content;
// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки
function createCard(cardData, deleteCard) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  const cardImg = cardElement.querySelector(".card__image");
  cardImg.src = cardData.link;
  cardImg.alt = cardData.name;
  cardElement.querySelector(".card__title").textContent = cardData.name;

  cardElement
    .querySelector(".card__delete-button")
    .addEventListener("click", () => {
      deleteCard(cardElement);
    });
  return cardElement;
}
// @todo: Функция удаления карточки
function deleteCard(cardElement) {
  cardElement.remove();
}
// @todo: Вывести карточки на страницу

initialCards.forEach((card) => {
  const cardElement = createCard(card, deleteCard);
  cardsContent.append(cardElement);
});

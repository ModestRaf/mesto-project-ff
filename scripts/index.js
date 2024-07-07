function createCard(cardContent, deleteCallback) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const likeButton = cardElement.querySelector('.card__like-button');

    //заполняем карточки контентом
    cardElement.querySelector('.card__image').src = cardContent.link;
    cardElement.querySelector('.card__title').textContent = cardContent.name;

    //обработка клика для удаления карточки
    deleteButton.addEventListener('click', () => {
        deleteCallback(cardElement);
    });

    // кнопка лайка, пусть будет :)
    likeButton.addEventListener('click', () => {
        likeButton.classList.toggle('card__like-button_is-active');
    });

    return cardElement;
}

// Функция для удаления карточки
function deleteCard(cardElement) {
    cardElement.remove();
}

// Контейнер для карточек и вывод карточек на страницу через places__list
const placesList = document.querySelector('.places__list');
initialCards.forEach((cardContent) => {
    const cardElement = createCard(cardContent, deleteCard);
    placesList.appendChild(cardElement);
});

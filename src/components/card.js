export function createCard(cardContent, deleteCallback, openImagePopup) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const likeButton = cardElement.querySelector('.card__like-button');
    const cardImage = cardElement.querySelector('.card__image');

    // Заполняем карточки контентом
    cardImage.alt = cardContent.name;
    cardImage.src = cardContent.link;
    cardElement.querySelector('.card__title').textContent = cardContent.name;

    // Обработка клика для удаления карточки
    deleteButton.addEventListener('click', () => {
        deleteCallback(cardElement);
    });

    // Кнопка лайка
    likeButton.addEventListener('click', () => {
        likeButton.classList.toggle('card__like-button_is-active');
    });

    // Обработчик для открытия изображения в попапе
    cardImage.addEventListener('click', () => {
        openImagePopup(cardContent);
    });

    return cardElement;
}

// Функция для удаления карточки
export function deleteCard(cardElement) {
    cardElement.remove();
}

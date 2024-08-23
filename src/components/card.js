// cards.js

export function createCard(cardContent, deleteCallback, openImagePopup) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const likeButton = cardElement.querySelector('.card__like-button');
    const cardImage = cardElement.querySelector('.card__image');
    const likeCountElement = cardElement.querySelector('.card__like-count');

    // Заполняем карточки контентом
    cardImage.alt = cardContent.name;
    cardImage.src = cardContent.link;
    cardElement.querySelector('.card__title').textContent = cardContent.name;
    likeCountElement.textContent = cardContent.likes.length;

    // Обработка клика для удаления карточки
    deleteButton.addEventListener('click', () => {
        deleteCallback(cardElement);
    });

    // Функция для обновления состояния лайка
    function updateLikeState(isLiked) {
        likeButton.classList.toggle('card__like-button_is-active', isLiked);
        likeCountElement.textContent = cardContent.likes.length;
    }

    // Кнопка лайка
    likeButton.addEventListener('click', () => {
        const isLiked = likeButton.classList.contains('card__like-button_is-active');
        if (isLiked) {
            window.removeLike(cardContent._id).then(updatedCard => {
                cardContent.likes = updatedCard.likes;
                updateLikeState(false);
            });
        } else {
            window.addLike(cardContent._id).then(updatedCard => {
                cardContent.likes = updatedCard.likes;
                updateLikeState(true);
            });
        }
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

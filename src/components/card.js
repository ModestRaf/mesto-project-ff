export function createCard(cardContent, deleteCallback, openImagePopup, userId) {
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

    // Показываем или скрываем иконку удаления в зависимости от владельца карточки
    if (cardContent.owner._id === userId) {
        deleteButton.style.display = 'block';
    } else {
        deleteButton.style.display = 'none';
    }

    // Обработка клика для удаления карточки
    deleteButton.addEventListener('click', () => {
        // Вызываем глобальную функцию удаления карточки с сервера
        window.deleteCardFromServer(cardContent._id)
            .then(() => {
                deleteCallback(cardElement);
            })
            .catch((err) => {
                console.error(err);
            });
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

export function deleteCard(cardElement) {
    cardElement.remove();
}
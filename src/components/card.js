import {openPopup} from './modal.js';

export function createCard(cardContent, deleteCallback) {
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

    // кнопка лайка
    likeButton.addEventListener('click', () => {
        likeButton.classList.toggle('card__like-button_is-active');
    });

    // Открытие изображения в попапе
    const cardImage = cardElement.querySelector('.card__image');
    cardImage.addEventListener('click', () => {
        const popupImage = document.querySelector('.popup_type_image');
        const popupImageElement = popupImage.querySelector('.popup__image');
        const popupCaptionElement = popupImage.querySelector('.popup__caption');

        popupImageElement.src = cardContent.link;
        popupImageElement.alt = cardContent.name;
        popupCaptionElement.textContent = cardContent.name;

        openPopup(popupImage);
    });

    return cardElement;
}

// Функция для удаления карточки
export function deleteCard(cardElement) {
    cardElement.remove();
}
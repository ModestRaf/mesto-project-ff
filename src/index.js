import './pages/index.css';
import { initialCards } from './cards.js';

import avatar from './images/avatar.jpg';
const profileImage = document.querySelector('.profile__image');
profileImage.style.backgroundImage = `url(${avatar})`;

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
function deleteCard(cardElement) {
    cardElement.remove();
}

// Контейнер для карточек и вывод карточек на страницу через places__list и перебор массива initialCards
const placesList = document.querySelector('.places__list');
initialCards.forEach((cardContent) => {
    placesList.append(createCard(cardContent, deleteCard));
});

// Функции открытия и закрытия попапов
// Functions to open and close popups with animations
function openPopup(popup) {
    popup.classList.add('popup_is-animated');
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', closePopupOnEsc);
    popup.addEventListener('click', closePopupOnOverlay);
}

function closePopup(popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closePopupOnEsc);
    popup.removeEventListener('click', closePopupOnOverlay);

    popup.addEventListener('transitionend', () => {
        popup.classList.remove('popup_is-animated');
    }, { once: true });
}

// обработчики кнопок открытия попапов
const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonAddCard = document.querySelector('.profile__add-button');

buttonEditProfile.addEventListener('click', () => {
    openPopup(document.querySelector('.popup_type_edit'));
});

buttonAddCard.addEventListener('click', () => {
    openPopup(document.querySelector('.popup_type_new-card'));
});

// обработчик кнопок закрытия попапов
const buttonsClosePopup = document.querySelectorAll('.popup__close');

buttonsClosePopup.forEach(button => {
    button.addEventListener('click', () => {
        closePopup(button.closest('.popup'));
    });
});

// закрытие попапов на Esc
function closePopupOnEsc(event) {
    if (event.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_is-opened');
        if (openedPopup) {
            closePopup(openedPopup);
        }
    }
}

// закрытие попапов на оверлей
function closePopupOnOverlay(event) {
    if (event.target.classList.contains('popup')) {
        closePopup(event.target);
    }
}

// Обработчик события сабмита формы добавления новой карточки
const formNewPlace = document.querySelector('form[name="new-place"]');

formNewPlace.addEventListener('submit', (event) => {
    event.preventDefault();

    const placeNameInput = formNewPlace.querySelector('input[name="place-name"]');
    const placeLinkInput = formNewPlace.querySelector('input[name="link"]');

    const newCardContent = {
        name: placeNameInput.value,
        link: placeLinkInput.value
    };

    const newCardElement = createCard(newCardContent, deleteCard);

    placesList.prepend(newCardElement); // новая карточка в начале списка

    closePopup(formNewPlace.closest('.popup'));

    formNewPlace.reset(); // Очищаем форму
});
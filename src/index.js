import './pages/index.css';
import {createCard, deleteCard} from './components/card.js';
import {openPopup, closePopup} from './components/modal.js';
import {enableValidation, clearValidation} from './scripts/validation.js';
import {editUserInfo, getInitialCards, uploadNewPlace} from './scripts/api.js';
import avatar from './images/avatar.jpg';

//аватарка
const profileImage = document.querySelector('.profile__image');
profileImage.style.backgroundImage = `url(${avatar})`;

// Настройки для валидации
const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};
const popupImage = document.querySelector('.popup_type_image');
const popupImageElement = popupImage.querySelector('.popup__image');
const popupCaptionElement = popupImage.querySelector('.popup__caption');
//закрытие попапа
const buttonsClosePopup = document.querySelectorAll('.popup__close');
//профиль
const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonAddCard = document.querySelector('.profile__add-button');
//редактирование профиля
const formEditProfile = document.querySelector('form[name="edit-profile"]');
const nameInput = formEditProfile.querySelector('input[name="name"]');
const jobInput = formEditProfile.querySelector('input[name="description"]');
//новая карточка
const formNewPlace = document.querySelector('form[name="new-place"]');
const placeNameInput = formNewPlace.querySelector('input[name="place-name"]');
const placeLinkInput = formNewPlace.querySelector('input[name="link"]');

// Контейнер для карточек и вывод карточек на страницу через places__list и перебор массива initialCards
const placesList = document.querySelector('.places__list');

// Обработчики кнопок
buttonEditProfile.addEventListener('click', () => {

    // Заполняем поля формы текущими значениями
    nameInput.value = profileTitle.textContent || '';
    jobInput.value = profileDescription.textContent || '';

    clearValidation(formEditProfile, validationConfig);

    // Открываем попап
    openPopup(document.querySelector('.popup_type_edit'));
});

buttonAddCard.addEventListener('click', () => {
    clearValidation(formNewPlace, validationConfig);
    openPopup(document.querySelector('.popup_type_new-card'));
});

buttonsClosePopup.forEach(button => {
    button.addEventListener('click', () => {
        closePopup(button.closest('.popup'));
    });
});

// Обработчик события сабмита формы добавления новой карточки
formNewPlace.addEventListener('submit', (event) => {
    event.preventDefault();
    const newCardContent = {
        name: placeNameInput.value,
        link: placeLinkInput.value
    };

    uploadNewPlace(newCardContent.name, newCardContent.link)
        .then((uploadedCardData) => {
            const newCardElement = createCard(uploadedCardData, deleteCard, openImagePopup, userId);
            placesList.prepend(newCardElement); // новая карточка в начале списка
            closePopup(formNewPlace.closest('.popup'));
            formNewPlace.reset(); // Очищаем форму
        })
});

// Обработчик события сабмита формы редактирования профиля
function handleFormSubmit(evt) {
    evt.preventDefault(); // Отменяем стандартную отправку формы

    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;

    closePopup(formEditProfile.closest('.popup'));
}

formEditProfile.addEventListener('submit', handleFormSubmit);

//открытие попапа с изображением
function openImagePopup(cardContent) {
    popupImageElement.src = cardContent.link;
    popupImageElement.alt = cardContent.name;
    popupCaptionElement.textContent = cardContent.name;

    openPopup(popupImage);
}

// Включаем валидацию всех форм
enableValidation(validationConfig);

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
let userId = '';

Promise.all([editUserInfo(), getInitialCards()])
    .then(([userData, initialCards]) => {
        userId = userData._id;
        console.log(userId);
        profileDescription.textContent = userData.about;
        profileTitle.textContent = userData.name;
        initialCards.forEach((cardContent) => {
            const cardElement = createCard(cardContent, deleteCard, openImagePopup, userId);
            placesList.append(cardElement);
        });
    })
    .catch((err) => {
        console.log(err);
    });
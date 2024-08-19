import './pages/index.css';
import {initialCards} from './components/cards.js';
import {createCard, deleteCard} from './components/card.js';
import {openPopup, closePopup} from './components/modal.js';
import avatar from './images/avatar.jpg';

const popupImage = document.querySelector('.popup_type_image');
const popupImageElement = popupImage.querySelector('.popup__image');
const popupCaptionElement = popupImage.querySelector('.popup__caption');
//закрытие попапа
const buttonsClosePopup = document.querySelectorAll('.popup__close');
//профиль
const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonAddCard = document.querySelector('.profile__add-button');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
//редактирование профиля
const formEditProfile = document.querySelector('form[name="edit-profile"]');
const nameInput = formEditProfile.querySelector('input[name="name"]');
const jobInput = formEditProfile.querySelector('input[name="description"]');
//новая карточка
const formNewPlace = document.querySelector('form[name="new-place"]');
const placeNameInput = formNewPlace.querySelector('input[name="place-name"]');
const placeLinkInput = formNewPlace.querySelector('input[name="link"]');
//аватарка
const profileImage = document.querySelector('.profile__image');
profileImage.style.backgroundImage = `url(${avatar})`;

// Контейнер для карточек и вывод карточек на страницу через places__list и перебор массива initialCards
const placesList = document.querySelector('.places__list');
initialCards.forEach((cardContent) => {
    const cardElement = createCard(cardContent, deleteCard, openImagePopup);
    placesList.append(cardElement);
});

// Обработчики кнопок
buttonEditProfile.addEventListener('click', () => {

    // Заполняем поля формы текущими значениями
    nameInput.value = profileTitle.textContent || '';
    jobInput.value = profileDescription.textContent || '';

    // Открываем попап
    openPopup(document.querySelector('.popup_type_edit'));
});

buttonAddCard.addEventListener('click', () => {
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
    const newCardElement = createCard(newCardContent, deleteCard, openImagePopup);
    placesList.prepend(newCardElement); // новая карточка в начале списка
    closePopup(formNewPlace.closest('.popup'));
    formNewPlace.reset(); // Очищаем форму
});

// Обработчик события сабмита формы редактирования профиля

function handleFormSubmit(evt) {
    evt.preventDefault(); // Отменяем стандартную отправку формы

    const nameValue = nameInput.value;
    const jobValue = jobInput.value;

    const profileTitle = document.querySelector('.profile__title');
    const profileDescription = document.querySelector('.profile__description');

    profileTitle.textContent = nameValue;
    profileDescription.textContent = jobValue;

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

// Валидация формы "Редактировать профиль"
function validateInput(inputElement) {
    const errorElement = inputElement.nextElementSibling;
    const namePattern = /^[a-zA-Zа-яА-Я- ]+$/;

    if (!inputElement.validity.valid) {
        if (inputElement.validity.valueMissing) {
            errorElement.textContent = 'Вы пропустили это поле.';
        } else if (inputElement.validity.tooShort || inputElement.validity.tooLong) {
            errorElement.textContent = `Должно быть от ${inputElement.minLength} до ${inputElement.maxLength} символов`;
        } else if (!namePattern.test(inputElement.value)) {
            errorElement.textContent = 'Можно использовать только латинские или кириллические буквы, дефисы и пробелы';
        } else {
            errorElement.textContent = inputElement.validationMessage;
        }
        inputElement.classList.add('popup__input_type_error');
        errorElement.classList.add('popup__error_visible');
    } else {
        errorElement.textContent = '';
        inputElement.classList.remove('popup__input_type_error');
        errorElement.classList.remove('popup__error_visible');
    }

    toggleSubmitButton(formEditProfile);
}

nameInput.addEventListener('input', () => {
    validateInput(nameInput);
});

jobInput.addEventListener('input', () => {
    validateInput(jobInput);
});

function toggleSubmitButton(form) {
    const submitButton = form.querySelector('.popup__button');
    if (form.checkValidity()) {
        submitButton.removeAttribute('disabled');
        submitButton.classList.add('popup__button_active');
    } else {
        submitButton.setAttribute('disabled', 'disabled');
        submitButton.classList.remove('popup__button_active');
    }
}

function clearValidationErrors(form) {
    const inputElements = form.querySelectorAll('.popup__input');
    inputElements.forEach((inputElement) => {
        const errorElement = inputElement.nextElementSibling;
        inputElement.classList.remove('popup__input_type_error');
        errorElement.classList.remove('popup__error_visible');
        errorElement.textContent = '';
    });
    toggleSubmitButton(form);
}

// Вызов при открытии формы редактирования профиля
buttonEditProfile.addEventListener('click', () => {
    clearValidationErrors(formEditProfile);
    openPopup(document.querySelector('.popup_type_edit'));
});

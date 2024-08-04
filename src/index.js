import './pages/index.css';
import {initialCards} from './components/cards.js';
import {createCard, deleteCard} from './components/card.js';
import {openPopup, closePopup, openImagePopup} from './components/modal.js';
import avatar from './images/avatar.jpg';

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
    const cardElement = createCard(cardContent, deleteCard);
    placesList.append(cardElement);

    // Добавляем обработчик для открытия изображения в попапе
    const cardImage = cardElement.querySelector('.card__image');
    cardImage.addEventListener('click', () => {
        openImagePopup(cardContent);
    });
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

    const newCardElement = createCard(newCardContent, deleteCard);

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


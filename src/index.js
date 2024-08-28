import './pages/index.css';
import {createCard, deleteCard} from './components/card.js';
import {openPopup, closePopup} from './components/modal.js';
import {enableValidation, clearValidation} from './scripts/validation.js';
import {editUserInfo, getInitialCards, uploadNewPlace, updateAvatar} from './scripts/api.js';

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
//аватар
const popupAvatar = document.querySelector('.popup_type_avatar');
const formAvatar = document.querySelector('form[name="avatar-form"]');
const avatarInput = formAvatar.querySelector('input[name="avatar"]');
//закрытие попапа
const buttonsClosePopup = document.querySelectorAll('.popup__close');
//профиль
const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonAddCard = document.querySelector('.profile__add-button');
//профиль
const profileDescription = document.querySelector('.profile__description');
const popupEdit = document.querySelector('.popup_type_edit');
const profileImage = document.querySelector('.profile__image');
const profileTitle = document.querySelector('.profile__title');
const formEditProfile = document.querySelector('form[name="edit-profile"]');
const nameInput = formEditProfile.querySelector('input[name="name"]');
const jobInput = formEditProfile.querySelector('input[name="description"]');
//новая карточка
const popupNewCard = document.querySelector('.popup_type_new-card');
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
    openPopup(popupEdit);
});

buttonAddCard.addEventListener('click', () => {
    clearValidation(formNewPlace, validationConfig);
    openPopup(popupNewCard);
});

buttonsClosePopup.forEach(button => {
    button.addEventListener('click', () => {
        closePopup(button.closest('.popup'));
    });
});

// Обработчик события сабмита формы добавления новой карточки
function handleFormNewPlaceSubmit(event) {
    event.preventDefault();
    const submitButton = event.submitter;
    submitButton.textContent = 'Сохранение...';
    const newCardContent = {
        name: placeNameInput.value,
        link: placeLinkInput.value
    };
    uploadNewPlace(newCardContent.name, newCardContent.link)
        .then((uploadedCardData) => {
            const newCardElement = createCard(uploadedCardData, deleteCard, openImagePopup, userId);
            placesList.prepend(newCardElement); // новая карточка в начале списка
            closePopup(formNewPlace.closest('.popup'));
            formNewPlace.reset();
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            submitButton.textContent = 'Создать';
        });
}

formNewPlace.addEventListener('submit', handleFormNewPlaceSubmit);

// Обработчик события сабмита формы редактирования профиля
function handleFormProfileSubmit(evt) {
    evt.preventDefault();
    const submitButton = evt.submitter;
    editUserInfo()
        .then(() => {
            profileTitle.textContent = nameInput.value;
            profileDescription.textContent = jobInput.value;
            closePopup(formEditProfile);
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            submitButton.textContent = 'Сохранить';
        });
}

formEditProfile.addEventListener('submit', handleFormProfileSubmit);

//открытие попапа с изображением
function openImagePopup(cardContent) {
    popupImageElement.src = cardContent.link;
    popupImageElement.alt = cardContent.name;
    popupCaptionElement.textContent = cardContent.name;
    openPopup(popupImage);
}

//аватар
profileImage.addEventListener('click', () => {
    clearValidation(formNewPlace, validationConfig);
    openPopup(popupAvatar);
});

// Включаем валидацию всех форм
enableValidation(validationConfig);

let userId = '';
Promise.all([editUserInfo(), getInitialCards()])
    .then(([userData, initialCards]) => {
        const avatarUrl = userData.avatar;
        userId = userData._id;
        profileDescription.textContent = userData.about;
        profileTitle.textContent = userData.name;
        profileImage.style.backgroundImage = `url(${avatarUrl})`;
        formAvatar.addEventListener('submit', (evt) => {
            evt.preventDefault();
            const submitButton = evt.submitter;
            submitButton.textContent = 'Сохранение...';
            const newAvatarUrl = avatarInput.value;
            updateAvatar(newAvatarUrl)
                .then(() => {
                    profileImage.src = newAvatarUrl;
                    closePopup(popupAvatar);
                })
                .catch((err) => {
                    console.log(err);
                })
                .finally(() => {
                    submitButton.textContent = 'Сохранить';
                });
        });
        initialCards.forEach((cardContent) => {
            const cardElement = createCard(cardContent, deleteCard, openImagePopup, userId);
            placesList.append(cardElement);
        });
    })
    .catch((err) => {
        console.log(err);
    });
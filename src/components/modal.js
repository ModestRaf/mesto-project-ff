// Функции открытия и закрытия попапов с анимацией
export function openPopup(popup) {
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', closePopupOnEsc);
    popup.addEventListener('click', closePopupOnOverlay);
}

export function closePopup(popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closePopupOnEsc);
    popup.removeEventListener('click', closePopupOnOverlay);
}

// закрытие попапов на Esc
export function closePopupOnEsc(event) {
    if (event.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_is-opened');
        if (openedPopup) {
            closePopup(openedPopup);
        }
    }
}

// закрытие попапов на оверлей
export function closePopupOnOverlay(event) {
    if (event.target.classList.contains('popup')) {
        closePopup(event.target);
    }
}
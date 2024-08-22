// Функция, которая показывает ошибку валидации
function showInputError(formElement, inputElement, errorMessage, settings) {
    const errorElement = inputElement.nextElementSibling;
    inputElement.classList.add(settings.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(settings.errorClass);
}

// Функция, которая скрывает ошибку валидации
function hideInputError(formElement, inputElement, settings) {
    const errorElement = inputElement.nextElementSibling;
    inputElement.classList.remove(settings.inputErrorClass);
    errorElement.classList.remove(settings.errorClass);
    errorElement.textContent = '';
}

// Функция, которая проверяет валидность поля ввода
function checkInputValidity(formElement, inputElement, settings) {
    if (!inputElement.validity.valid) {
        if (inputElement.validity.valueMissing) {
            showInputError(formElement, inputElement, 'Вы пропустили это поле.', settings);
        } else if (inputElement.validity.tooShort || inputElement.validity.tooLong) {
            showInputError(formElement, inputElement, `Должно быть от ${inputElement.minLength} до ${inputElement.maxLength} символов.`, settings);
        } else if (inputElement.type === 'url' && inputElement.validity.typeMismatch) {
            showInputError(formElement, inputElement, 'Введите правильный URL.', settings);
        } else {
            showInputError(formElement, inputElement, inputElement.validationMessage, settings);
        }
    } else {
        hideInputError(formElement, inputElement, settings);
    }
}

// Функция, которая переключает состояние кнопки сабмита
function toggleButtonState(inputList, buttonElement, settings) {
    if (inputList.some(inputElement => !inputElement.validity.valid)) {
        buttonElement.classList.add(settings.inactiveButtonClass);
        buttonElement.setAttribute('disabled', 'disabled');
    } else {
        buttonElement.classList.remove(settings.inactiveButtonClass);
        buttonElement.removeAttribute('disabled');
    }
}

// Функция, которая устанавливает обработчики на все поля ввода формы
function setEventListeners(formElement, settings) {
    const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
    const buttonElement = formElement.querySelector(settings.submitButtonSelector);

    toggleButtonState(inputList, buttonElement, settings);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            checkInputValidity(formElement, inputElement, settings);
            toggleButtonState(inputList, buttonElement, settings);
        });
    });
}

// Функция, которая включает валидацию всех форм на странице
export function enableValidation(settings) {
    const formList = Array.from(document.querySelectorAll(settings.formSelector));
    formList.forEach((formElement) => {
        setEventListeners(formElement, settings);
    });
}

// Функция, которая очищает ошибки валидации и делает кнопку неактивной
export function clearValidation(formElement, settings) {
    const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
    const buttonElement = formElement.querySelector(settings.submitButtonSelector);

    inputList.forEach((inputElement) => {
        hideInputError(formElement, inputElement, settings);
    });

    buttonElement.classList.add(settings.inactiveButtonClass);
    buttonElement.setAttribute('disabled', 'disabled');
}
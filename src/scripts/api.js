const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-21',
    headers: {
        authorization: '59944b47-fe66-4a44-a85a-cb50f9ee86d2',
        'Content-Type': 'application/json'
    }
}
const checkResponse = (res) => {
    if (res.ok) {
        return res.json();
    } else {
        return Promise.reject(`Ошибка: ${res.status}`);
    }
}

// Функция для загрузки карточек
export const getInitialCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers
    })
        .then(checkResponse);
}

export const editUserInfo = (_id) => {
    return fetch(`${config.baseUrl}/users/me/`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name: 'ModestTea',
            about: 'это не может продолжаться'
        })
    })
        .then(checkResponse);
}

export const uploadNewPlace = (name, link) => {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name: name,
            link: link
        })
    })
        .then(checkResponse);
}

export function addLike(cardId) {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: config.headers
    })
        .then(checkResponse);
}

export function removeLike(cardId) {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: config.headers
    })
        .then(checkResponse);
}

// Функция для удаления карточки с сервера
export function deleteCardFromServer(cardId) {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: config.headers
    })
        .then(checkResponse);
}

export function updateAvatar(avatarUrl) {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar: avatarUrl
        })
    })
        .then(checkResponse);
}
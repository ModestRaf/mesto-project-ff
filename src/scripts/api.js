const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-21',
    headers: {
        authorization: '59944b47-fe66-4a44-a85a-cb50f9ee86d2',
        'Content-Type': 'application/json'
    }
}

// Функция для загрузки карточек
export const getInitialCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers
    })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        });
}

export const editUserInfo = (_id) => {
    return fetch(`${config.baseUrl}/users/me/`, {
        method: 'PATCH',
        headers: {
            authorization: '59944b47-fe66-4a44-a85a-cb50f9ee86d2',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: 'ModestTea',
            about: 'это не может продолжаться'
        })
    })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        });
}

export const uploadNewPlace = (name, link) => {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: {
            authorization: '59944b47-fe66-4a44-a85a-cb50f9ee86d2',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            link: link
        })
    })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        });
}

window.addLike = function (cardId) {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: config.headers
    })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        });
}

window.removeLike = function (cardId) {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: config.headers
    })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        });
}

// Функция для удаления карточки с сервера
function deleteFromServer(cardId) {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: config.headers
    })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        });
}

function updateAvatar(avatar) {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: {
            authorization: '59944b47-fe66-4a44-a85a-cb50f9ee86d2',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            avatar: avatar
        })
    })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        });
}

// Делаем функцию глобальной
window.updateAvatar = updateAvatar;

window.deleteFromServer = deleteFromServer;
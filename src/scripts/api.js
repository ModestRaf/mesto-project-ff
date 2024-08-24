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
        .then(res => res.json())
        .then((data) => {
            console.log(data);
            return data;
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
        .then(res => res.json())
        .then((data) => {
            console.log(data);
            return data;
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
        .then(res => res.json())
        .then((data) => {
            console.log(data);
            return data;
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

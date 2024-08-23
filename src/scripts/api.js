// Функция для загрузки карточек
export function getInitialCards() {
    return fetch(`https://nomoreparties.co/v1/wff-cohort-21/cards`, {
        headers: {
            authorization: '59944b47-fe66-4a44-a85a-cb50f9ee86d2'
        }
    })
        .then(res => res.json())
        .then((data) => {
            console.log(data);
            return data;
        });
}

export function editUserInfo() {
    return fetch(`https://nomoreparties.co/v1/wff-cohort-21/users/me`, {
        method: 'PATCH',
        headers: {
            authorization: '59944b47-fe66-4a44-a85a-cb50f9ee86d2',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: 'ModestTea',
            about: 'это не может продолжаться',
        })
    })
        .then(res => res.json())
        .then((data) => {
            console.log(data);
            return (data);
        });
}

export function uploadNewPlace(name, link) {
    return fetch(`https://nomoreparties.co/v1/wff-cohort-21/cards`, {
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
    return fetch(`https://nomoreparties.co/v1/wff-cohort-21/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: {
            authorization: '59944b47-fe66-4a44-a85a-cb50f9ee86d2',
        }
    })
        .then(res => res.json())
        .then((data) => {
            console.log('Card liked:', data);
            return data;
        });
};

window.removeLike = function (cardId) {
    return fetch(`https://nomoreparties.co/v1/wff-cohort-21/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: {
            authorization: '59944b47-fe66-4a44-a85a-cb50f9ee86d2',
        }
    })
        .then(res => res.json())
        .then((data) => {
            console.log('Like removed:', data);
            return data;
        });
};
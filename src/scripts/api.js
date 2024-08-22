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
            return (data);
        });
}

export function getUserInfo(name, about) {
    return fetch(`https://nomoreparties.co/v1/wff-cohort-21/users/me`, {
        method: 'PATCH',
        headers: {
            authorization: '59944b47-fe66-4a44-a85a-cb50f9ee86d2',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: 'Marie Skłodowska Curie',
            about: 'Physicist and Chemist'
        })
    })
        .then(res => res.json())
        .then((data) => {
            console.log(data);
            return (data);
        });
}
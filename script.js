// tworzymy funkcję, która pobiera użytkowników z API
const getUsers = function(e) {
    e.preventDefault();

    const genderValue = document.querySelector('[name="plec"]').value;
    const numberValue = document.querySelector('[name="liczba_osob"]').value;

    const url = `https://randomuser.me/api/?results=${numberValue}&gender=${genderValue == 'both' ? 'male,female' : genderValue}`;
    fetch(url)
    .then(response => {
        if (response.status != 200) {
            throw Error('Serwer zwrócił komunikat inny niż success (kod 200)')
        } else {
            return response.json();
        }
    })
    .then(json => {
        showUsers(json.results);
    })
    .catch(error => {
        console.log(error)
    });
}

// tworzymy funkcję, która wyświetla dane użytkowników na stronie
const showUsers = function(users) {
    // console.log(users);
    const divWyniki = document.querySelector('div.wyniki');
    divWyniki.innerHTML = '';
    users.forEach(user => {
        divWyniki.innerHTML += `
            <div>
                <img src="${user.picture.thumbnail}" alt="Zdjęcie ${user.name.first} ${user.name.last}">
                <p>${user.name.title} ${user.name.first} ${user.name.last}</p>
            </div>
        `;
    });
}

// obsługa formularza
document.querySelector('form').addEventListener('submit', getUsers)
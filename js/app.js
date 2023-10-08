const characterFilter = document.getElementById('character-filter');
const cardsContainer = document.querySelector('.cards-container');

function loadCharacters() {
    fetch('https://rickandmortyapi.com/api/character')
        .then(response => response.json())
        .then(data => {
            const characters = data.results.slice(0, 15);

            characterFilter.innerHTML = '<option value="all">Todos los personajes</option>';
            characters.forEach(character => {
                characterFilter.innerHTML += `<option value="${character.id}">${character.name}</option>`;
            });

            characters.forEach(character => {
                const card = document.createElement('div');
                card.classList.add('card');
                card.innerHTML = `
                    <img src="${character.image}" alt="${character.name}">
                    <p>${character.name}</p>
                `;
                cardsContainer.appendChild(card);
            });
        });
}

loadCharacters();

characterFilter.addEventListener('change', () => {
    const selectedValue = characterFilter.value;
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        if (selectedValue === 'all' || selectedValue === card.querySelector('p').textContent) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
});

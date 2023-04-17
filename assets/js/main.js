const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 386;
const limit = 10;
let offset = 0;

function loadPokemonItens(offset, limit) {
    // Requisição por index simplificada usando Map
    pokeApi.getPokemons(offset, limit).then((pokemons = [] ) => {
        const newHtml = pokemons.map((pokemon) => `
        <div id="load-more " class="cardAnimation" onclick="redirectToCard('${encodeURIComponent(pokemon.number)}')">
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>
            <div class="detail">
            <ol class="types">
            ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
            </ol>
            <img class="pokemonImg"src="${pokemon.photo}" alt="${pokemon.name}">
            </div>
            <img class="pokeball"  src="/assets/img/pokeball.png" >
            </li>
            </div>
        `).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit

    const qtdRecordWithNextPage = offset + limit

    if (qtdRecordWithNextPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)
        
        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }

})
 
function redirectToCard(offset) {
  const limit = 1;
  const url = `CardPokemon/card.html?offset=${offset}&limit=${limit}`;
  window.location.href = url;
}


const searchInput = document.querySelector('#search');

searchInput.addEventListener('input', () => {
  const searchTerm = searchInput.value;
    
  if (searchTerm === '') {
    // Se o campo de pesquisa estiver vazio, mostrar todos os pokemons novamente
    pokemonList.innerHTML = '';
    offset = 0;
    loadPokemonItens(offset, limit);
    loadMoreButton.style.display = 'block';
  } else {
    // Se o campo de pesquisa estiver preenchido, buscar o pokemon correspondente
    pokemonList.innerHTML = '';
    pokeApi.getPokemons(0, maxRecords).then((pokemons = []) => {
      const filteredPokemons = pokemons.filter(pokemon => pokemon.name.includes(searchTerm));
      const newHtml = filteredPokemons.map((pokemon) => `
        <div id="load-more" class="cardAnimation" onclick="redirectToCard('${encodeURIComponent(pokemon.number)}')">
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>
            <div class="detail">
                
                <ol class="types">
                   ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
                <img src="${pokemon.photo}" alt="${pokemon.name}">
            </div>
            <img class="pokeball"  src="/assets/img/pokeball.png" >
            </li>
            </div>
        `).join('')
        pokemonList.innerHTML = newHtml;
        loadMoreButton.style.display = 'none';
      });
  }
});
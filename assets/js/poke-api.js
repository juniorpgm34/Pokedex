const pokeApi = {};

function convertPokeApiDetailToPokemon(pokeDetail) {
  const pokemon = new Pokemon();
  pokemon.number = pokeDetail.id;
  pokemon.name = pokeDetail.name;

  const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
  const [type] = types;

  pokemon.types = types;
  pokemon.type = type;
  pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;

  const stats = pokeDetail.stats.map((statSlot) => statSlot.base_stat);
  const [stat] = stats;

  pokemon.stats = stats;
  pokemon.stat = stat;

  pokemon.height = pokeDetail.height / 10;
  pokemon.weight = pokeDetail.weight / 10;

  return pokemon;
}

pokeApi.getPokemonSpeciesDetail = (pokemon) => {
  const url = `https://pokeapi.co/api/v2/pokemon-species/${pokemon.number}/`;
  return fetch(url)
    .then((response) => response.json())
    .then((jsonBody) => {
      const descriptions = jsonBody.flavor_text_entries.filter((entry) => entry.language.name === "en");
      const [description] = descriptions;
      pokemon.description = description.flavor_text;
      const descriptionCleaned = description.flavor_text.replace(/\u000C/g, '\n');
    pokemon.description = descriptionCleaned;
      return pokemon;
    })
    .catch((error) => console.error(error));
};

pokeApi.getPokemonDetail = (pokemon) => {
  return fetch(pokemon.url)
    .then((response) => response.json())
    .then(convertPokeApiDetailToPokemon)
    .then((pokemon) => pokeApi.getPokemonSpeciesDetail(pokemon));
    
};

pokeApi.getPokemons = (offset = 0, limit = 5) => {
  const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
  return fetch(url)
    .then((response) => response.json())
    .then((jsonBody) => jsonBody.results)
    .catch((error) => console.error(error))
    .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
    .then((detailRequests) => Promise.all(detailRequests))
    .then((pokemonsDetails) => pokemonsDetails);
};

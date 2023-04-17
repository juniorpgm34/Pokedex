const pokemonList = document.getElementById('pokemonList')   
const urlParams = new URLSearchParams(window.location.search);
const offset = urlParams.get('offset');
const CorDeFundo = document.getElementById('TypeColor')

loadMorePokemonItens(offset)


function loadMorePokemonItens(offset) {
    // Requisição por index simplificada usando Map
    pokeApi.getPokemons(offset - 1, 1).then((pokemons = []) => {
      const newHtml = pokemons.map((pokemon) => `
        <section class="content ${pokemon.type}">
          <section class="bodycard">
            <section class="card">
              <div class="divcard">
                <header class="nomeId">
                  <div class="headerpkarrow">
                    <img class="arrow back-button" onclick="voltar()" src="assetscard/fotos/doube-left.static.png" alt="arrow">
                    <h3>${pokemon.name}</h3>
                    <p class="idpokemon">#${pokemon.number}</p>
                  </div>
                </header>
                <div class="descriPhoto">
                  <img src="${pokemon.photo}" alt="${pokemon.name}">
                  <p class="descricao">
                    ${pokemon.description}
                  </p>
                </div>
                <div class="AlturaPesoTipo">
                  <div class="apt">
                    <div class="imgDesc">
                      <img src="assetscard/fotos/weightPokemon.svg" alt="">
                      <p>${pokemon.weight} kg</p>
                    </div>
                    <p class="p">weight</p>
                  </div>
                  <div class="divider"></div>
                  <div class="apt">
                    <div class="imgDesc">
                      <img class="tocImg" src="assetscard/fotos/heightPokemon.svg" alt="">
                      <p>${pokemon.height} m</p>
                    </div>
                    <p class="p">height</p>
                  </div>
                  <div class="divider"></div>
                  <div class="apt">
                    <div class="imgDesc">
                      <img src="assetscard/fotos/power.svg" alt="">
                      <div class="ptype">
                        ${pokemon.types.map((type) => `<p>${type}</p>`).join('<p>/</p>')}
                      </div>
                    </div>
                    <p class="p">tipo</p>
                  </div>
                </div>
                <div class="atributo">
                  <div class="nomeAtributo">
                    <p class="atributoNS">HP</p>
                    <p class="atributoNS">Attack</p>
                    <p class="atributoNS">Defense</p>
                    <p class="atributoNS">Special Attack</p>
                    <p class="atributoNS">Special Defense</p>
                    <p class="atributoNS">Speed</p>
                  </div>
                  <div class="valorAtributo">
                    ${pokemon.stats.map((stat) => `<p class="atributoVS">${stat}</p>`).join('')}
                  </div>
                  <div class="barraAtributo">
                    ${pokemon.stats.map((stat, stat1) => `<div id="divAtributo${stat1}" class="${pokemon.type}" style="width:${stat}%;"></div>`).join('')}
                  </div>
                </div>
              </div>
            </section>
          </section>
        </section>
      `).join('');
        
      setTimeout(() => {
        pokemonList.innerHTML += newHtml;
      }, 1000);
    });
  }
  


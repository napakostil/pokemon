const getPokemonData = async term => {
    const pokeData = `https://pokeapi.co/api/v2/pokemon/?limit=1000000&offset=0`;
    let pokemons = await fetch(pokeData);
    pokemons = await pokemons.json();
    const pokemonURL = pokemons.results[rand(0, pokemons.results.length)].url;
    const response = await fetch(pokemonURL);
    const pokemon = await response.json();

    let type = "";

    if (pokemon.types[0]) {
        type = pokemon.types[0].type.name;
    }

    if (pokemon.types[1]) {
        type += ' / ' + pokemon.types[1].type.name;
    }


    document.getElementById('update_img').setAttribute('src', pokemon.sprites.other.dream_world.front_default ?? 'https://img.icons8.com/bubbles/452/question-mark.png');
    document.getElementById('update_name').innerHTML = pokemon.name;
    document.getElementById('update_candy_title').innerHTML = `${pokemon.name} Candy`;
    document.getElementById('update_hp').innerHTML = `HP ${pokemon.stats[0].base_stat}`;
    document.getElementById('update_cp').innerHTML = `XP ${pokemon.base_experience}`;
    document.getElementById('update_type').innerHTML = type;
    document.getElementById('update_weight').innerHTML = `${pokemon.weight}kg`;
    document.getElementById('update_height').innerHTML = `0.${pokemon.height}m`;
    document.getElementById('update_stardust').innerHTML = Math.floor((Math.random() * 10000) + 1);
    document.getElementById('update_candy').innerHTML = Math.floor((Math.random() * 200) + 1);

    for (let i = 0; i < pokemon.stats.length; i++) {
        console.log(pokemon.stats[i].stat.name);
        document.getElementById('update_stat_' + pokemon.stats[i].stat.name).innerHTML = pokemon.stats[i].base_stat;
    }

    document.querySelector('.pokemon-card').style.display = 'flex';

}

function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

getPokemonData();

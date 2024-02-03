
const pokeapi = {}

let listPokemonsDetailsAll = []

function convertPokiApIdateilTopokemon(pokedetail) {
    const pokemon = new Pokemon()

    pokemon.number = pokedetail.id
    pokemon.name = pokedetail.name

    const types = pokedetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokedetail.sprites.other.dream_world.front_default

    const ability = pokedetail.abilities.map((abilities,i) => abilities.ability.name)

    pokemon.abilities = ability
    pokemon.height =pokedetail.height
    pokemon.weight = pokedetail.weight


    return pokemon
}

pokeapi.GetPokemonsDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokiApIdateilTopokemon)
}

pokeapi.GetPokemons = (offset = 0, limit = 5) => {

    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`



    return fetch(url)
        .then((response) => { return response.json() })
        .then(responseBody => responseBody.results)
        .then(pokemons => pokemons.map(pokeapi.GetPokemonsDetail))
        .then(detailRequest => Promise.all(detailRequest))
        .then(pokemonDetails =>  {
            pokemonDetails.map((pokemon) =>{                
                listPokemonsDetailsAll.push(pokemon)
            })
            return pokemonDetails
        })
        .then(pokemonForLi => pokemonForLi)
}


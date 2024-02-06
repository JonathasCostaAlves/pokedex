// Refatorar para reduzir e organizar o codigo e criar o readme.md
const pokemonOL = document.getElementById('pokemonList')
const loadMorebutton = document.getElementById('loadMoreButton')

const containerPokemon = document.querySelector('.containerPokemon')
const cardAtribut = document.querySelector('.card')
const spanCard = document.querySelector('.card')

const removeClass = ['normal','grass' , 'fire' , 'water' , 'electric' , 'ice' , 'ground', 'poison','flying' , 'fighting', 'psychic' , 'dark' , 'rock' , 'bug' , 'ghost' , 'steel' , 'dragon' , 'fairy']


let cardsLi;

function getLiCards() {

    cardsLi = document.getElementsByClassName('.pokemon')


}


const maxRecords = 151
const limit = 6
let offset = 0







function convertPokemonLi(pokemon) {
    return `
    <li class="pokemon ${pokemon.type} p${pokemon.number}" id="${pokemon.number}" >
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join(' ')}
                </ol>
                <img src="${pokemon.photo}"
                    alt="${pokemon.name}">
            </div>

    </li>

    `
}

function convertPokemonCardAttributes(pokemon) {

    return `   
   


    <header class="cardHeader ${pokemon.type}">
  
    <menu class="cardMenu">
      <button  class="closeCard">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
            </svg>
      </button>
      <button>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class=" " viewBox="0 0 16 16">
              <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
            </svg>
</svg>
      </button>
      
      
  </menu>    
 

    <div class="cardTitle">
      <h3>${pokemon.name}</h3>
      <span>#${pokemon.number}</span>
    </div>

    <ul class="cardType ">
        ${pokemon.types.map((Poketype, i )=> `<li class="type ${pokemon.type}">${pokemon.types[i]}</li>`).join(' ')}
     
    
    </ul>

    <img src="${pokemon.photo}" alt="${pokemon.name}">

  </header>
  
  <section class="attributes">
      <h4>Sobre</h4>

      <ul>
          <li>
              <h5>
                  Especie  
              </h5>
              <span>${pokemon.type}</span> 
          </li>
          <li>
              <h5>
                  Height 
              </h5>
              <span>${pokemon.height} lb</span></li>
          <li>
              <h5>
                  Weight 
              </h5>
              <span>${pokemon.weight} inch </span>
          </li>
          <li>
              <h5>
                  Habilidades 
              </h5>
             
              <span>${pokemon.abilities.join(', ')}</span>
          </li>
      </ul>
  </section>

 
    `
}


function loadPokemonsItens(offset, limit) {

    pokeapi.GetPokemons(offset, limit).then(pokemons => {
        pokemonOL.innerHTML += pokemons.map((pokemon) => convertPokemonLi(pokemon)).join('')

        cardsLi = [...(document.getElementsByClassName('pokemon'))]

        cardsLi.map(cardLi => cardLi.addEventListener('click', e => {



            if (e.target.parentNode.tagName === "LI") {

                let SelectedPokemon = listPokemonsDetailsAll[(e.target.parentNode.getAttribute('id')) - 1]

                cardAtribut.innerHTML = convertPokemonCardAttributes(SelectedPokemon) 


                containerPokemon.classList.toggle('toogle')
                containerPokemon.classList.toggle('trasitionToogle')

                document.querySelector('.closeCard').addEventListener('click', ()=> {
                    containerPokemon.classList.toggle('toogle')
                    containerPokemon.classList.toggle('trasitionToogle')

                })

                
                
              
                removeClass.map(pokemonClass => spanCard.classList.remove(pokemonClass))
                spanCard.classList.add('card')
                spanCard.classList.add(SelectedPokemon.type)

                let cardPosition = e.target.offsetTop

                containerPokemon.style.marginTop = `${cardPosition}px`        

                window.scrollTo(0, cardPosition )              
                

            }

        }))


    }).catch(error => console.error(error))
   
}

loadPokemonsItens(offset, limit)


loadMorebutton.addEventListener('click', () => {

    offset += limit

    const qtdRecordNextPage = offset + limit

    if (qtdRecordNextPage >= maxRecords) {
        const newLImit = maxRecords - offset
        loadPokemonsItens(offset, newLImit)



        loadMorebutton.parentElement.removeChild(loadMorebutton)
    } else {
        loadPokemonsItens(offset, limit)

    }

    cardsLi = [...(document.getElementsByClassName('pokemon'))]





})








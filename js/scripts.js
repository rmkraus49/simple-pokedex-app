var $pokemonList = document.querySelector('.pokemon-list');

var pokemonRepository = (function () {
  var repository = [];

  return {
    add: function(pokemon) {
      if(
          (typeof pokemon) === 'object' &
          (typeof pokemon.number) === 'number' &
          (typeof pokemon.name) === 'string' &
          (typeof pokemon.height) === 'number' &
          (typeof pokemon.types) === 'object'
        ) {
        repository.push(pokemon);
      } else {
        console.log('pokedex entry for ' + pokemon.name + ' failed data type validation');
        console.log('pokemon data type: ' + typeof pokemon);
        console.log('pokemon number data type: ' + typeof pokemon.number);
        console.log('pokemon name data type: ' + typeof pokemon.name);
        console.log('pokemon height data type: ' + typeof pokemon.height);
        console.log('pokemon type data type: ' + typeof pokemon.types);
      }
    },
    getAll: function() {
      return repository;
    },
    addListItem: function(pokemon) {
      var listItem = document.createElement('li');
      var button = document.createElement('button');
      button.innerText = pokemon.name;
      button.classList.add('pokemon-button');
      listItem.appendChild(button);
      $pokemonList.appendChild(listItem);
      button.addEventListener('click', function(event) {
        pokemonRepository.showDetails(pokemon);
      })
    },
    showDetails: function(pokemon) {
      console.log(pokemon.name);
    }
  };
})();

var $mainTitle = document.querySelector('h1');
$mainTitle.innerText = 'Pokedex';

// repository:

pokemonRepository.add({
  number: 1,
  name: 'Bulbasaur',
  height: 0.7,
  types: ['Grass', 'Poison']
})

pokemonRepository.add({
  number: 2,
  name: 'Ivysaur',
  height: 1,
  types: ['Grass', 'Poison']
})

pokemonRepository.add({
  number: 3,
  name: 'Venusaur',
  height: 2,
  types: ['Grass', 'Poison']
})

pokemonRepository.add({
  number: 4,
  name: 'Charmander',
  height: 0.6,
  types: ['Fire']
})

pokemonRepository.add({
  number: 5,
  name: 'Charmeleon',
  height: 1.1,
  types: ['Fire']
})

pokemonRepository.add({
  number: 6,
  name: 'Charizard',
  height: 1.7,
  types: ['Fire', 'Flying']
})

pokemonRepository.add({
  number: 7,
  name: 'Squirtle',
  height: 0.5,
  types: ['Water']
})

pokemonRepository.add({
  number: 8,
  name: 'Wartortle',
  height: 1,
  types: ['Water']
})

pokemonRepository.add({
  number: 9,
  name: 'Blastoise',
  height: 1.6,
  types: ['Water']
})

// forEach loop to display list of pokemon:
pokemonRepository.getAll().forEach(pokemonRepository.addListItem);

var $pokemonList = document.querySelector('.pokemon-list');

var pokemonRepository = (function () {
  var repository = [];
  var apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function(json) {
      json.results.forEach(function (item) {
        var pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })
  };

//adds pokemon from API to repository after data type validation
  function add(pokemon) {
    if(
        (typeof pokemon) === 'object' &
        (typeof pokemon.name) === 'string' &
        (typeof pokemon.detailsUrl) === 'string'
      ) {
      repository.push(pokemon);
    } else {
      console.log('pokedex entry for ' + pokemon.name + ' failed data type validation');
    }
  };

  function getAll() {
    return repository;
  };

  function addListItem(pokemon) {
    var listItem = document.createElement('li');
    var button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('pokemon-button');
    listItem.appendChild(button);
    $pokemonList.appendChild(listItem);
    button.addEventListener('click', function(event) {
      pokemonRepository.showDetails(pokemon);
    })
  };
  function showDetails(item) {
    pokemonRepository.loadDetails(item).then(function () {
      console.log(item);
    });
  };

  function loadDetails(item) {
    var url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = Object.keys(details.types);
    }).catch(function (e) {
      console.error(e);
    });
  }

  return {
    add: add,
    addListItem: addListItem,
    getAll: getAll,
    showDetails: showDetails,
    loadList: loadList,
    loadDetails: loadDetails
  }
})();

pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});

var $mainTitle = document.querySelector('h1');
$mainTitle.innerText = 'Pokedex';

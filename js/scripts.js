var $pokemonList = document.querySelector('.pokemon-list');

var pokemonRepository = (function () {
  var repository = [];
  var apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

// fetches pokemon data from API
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
  }

//adds pokemon from API to repository after data type validation
  function add(pokemon) {
    repository.push(pokemon);
  }


//adds pokemon button to page
  function addListItem(pokemon) {
    var listItem = document.createElement('li');
    var button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('pokemon-button');
    listItem.appendChild(button);
    $pokemonList.appendChild(listItem);
    button.addEventListener('click', function() {
      pokemonRepository.showDetails(pokemon);
    })
  }

//fetches pokemon details from API
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

//displays fetched pokemon details in modal
  function showDetails(item) {
    pokemonRepository.loadDetails(item).then(function () {
    var $modalContainer = document.querySelector('#modal-container');
    $modalContainer.innerHTML = '';

    var modal = document.createElement('div');
    modal.classList.add('modal');

// create close button that triggers hideDetails function on click
    var closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'Close';
    closeButtonElement.addEventListener('click', hideDetails);

// generates title as pokemon name
    var pokemonNameElement = document.createElement('h1');
    pokemonNameElement.innerText = item.name;

// generates modal element to show pokemon picture
    var pokemonImageElement = document.createElement('img');
    pokemonImageElement.src = item.imageUrl;
    pokemonImageElement.alt = item.name;

// generates modal element to show height
    var pokemonHeightElement = document.createElement('p');
    pokemonHeightElement.innerText = 'Height: ' + item.height;

// appends modal content to DOM
    modal.appendChild(pokemonNameElement);
    modal.appendChild(pokemonImageElement);
    modal.appendChild(pokemonHeightElement);
    modal.appendChild(closeButtonElement);
    $modalContainer.appendChild(modal);

//makes modal visible
    $modalContainer.classList.add('is-visible');

// adds event listener to close on clicking outside the modal
    $modalContainer.addEventListener('click', (e) => {
      var target = e.target;
      if (target === $modalContainer) {
        hideDetails();
      }
    });

    // defines hideDetails function
    function hideDetails() {
      $modalContainer.classList.remove('is-visible');
    }

    // adds event listener to close modal on esc key
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && $modalContainer.classList.contains('is-visible')) {
        hideDetails();
      }
    });

// ending punctuation for showDetails
  });
  }
// end of showDetails function

//returns repository
  function getAll() {
    return repository;
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

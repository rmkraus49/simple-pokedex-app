var repository = []

// repository:

repository[0] = {
  number: 1,
  name: 'Bulbasaur',
  height: 0.7,
  types: ['Grass', 'Poison']
}

repository[1] = {
  number: 2,
  name: 'Ivysaur',
  height: 1,
  types: ['Grass', 'Poison']
}

repository[2] = {
  number: 3,
  name: 'Venusaur',
  height: 2,
  types: ['Grass', 'Poison']
}

repository[3] = {
  number: 4,
  name: 'Charmander',
  height: 0.6,
  types: ['Fire']
}

repository[4] = {
  number: 5,
  name: 'Charmeleon',
  height: 1.1,
  types: ['Fire']
}

repository[5] = {
  number: 6,
  name: 'Charizard',
  height: 1.7,
  types: ['Fire', 'Flying']
}

repository[6] = {
  number: 7,
  name: 'Squirtle',
  height: 0.5,
  types: ['Water']
}

repository[7] = {
  number: 8,
  name: 'Wartortle',
  height: 1,
  types: ['Water']
}

repository[8] = {
  number: 9,
  name: 'Blastoise',
  height: 1.6,
  types: ['Water']
}

function printPokemonDetails (pokemon) {
  document.write('<div>' + pokemon.name + ' (Height: ' + pokemon.height + 'm)')
  if (pokemon.height > 1.7) {
    document.write(' - Wow, that\'s big!')
  }
  if (pokemon.name === 'Charmander') {
    document.write(' - You should pick this one!')
  }
  document.write('</div>')
}

repository.forEach(printPokemonDetails)

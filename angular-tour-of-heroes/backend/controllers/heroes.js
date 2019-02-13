//const Todos = require('../model/todos')
const Hero = require('../model/Hero')

let heroes = [
  { id: 11, name: 'Mr. Nice' },
  { id: 12, name: 'Narco' },
  { id: 13, name: 'Bombasto' },
  { id: 14, name: 'Celeritas' },
  { id: 15, name: 'Magneta' },
  { id: 16, name: 'RubberMan' },
  { id: 17, name: 'Dynama' },
  { id: 18, name: 'Dr IQ' },
  { id: 19, name: 'Magma' },
  { id: 20, name: 'Tornado' }
];

const genId = (heroes) => {
  return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.id)) + 1 : 11;
}

const HeroesController = {
  getAllHeroes: () => {
    return new Promise((resolve, reject) => {
      resolve(heroes);
    })
  },
  searchHeroes: (searchTerm) => {
    return new Promise((resolve, reject) => {

    const filteredHeroes = heroes.filter(hero => {
      return hero.name.includes(searchTerm)
      })

      resolve(filteredHeroes);
    })
  },
  getHero: (id) => {
    return new Promise((resolve, reject) => {
      resolve(heroes.find(hero => hero.id === id));
    });
  },
  addHero: (heroName) => {
    return new Promise((resolve, reject) => {
      
      const id = genId(heroes);
      const newHero = new Hero(heroName, id);

      heroes.push(newHero);
      resolve(newHero);
    });
  },
  updateHero: (Hero) => {
    return new Promise((resolve, reject) => {
      console.log(Hero)

      const indexToUpdate = heroes.findIndex(hero => hero.id === Hero.id)
      heroes[indexToUpdate].name = Hero.name;

      resolve("Updated");
    });
  },
  deleteHero: (id) => {
    return new Promise((resolve, reject) => {
      heroes = heroes.filter(hero => hero.id !== id)
      resolve(heroes);
    });
  }
}

module.exports = HeroesController
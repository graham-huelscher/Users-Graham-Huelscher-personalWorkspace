const HeroesDB = require('../model/HeroDB')
const Sequelize = require('sequelize')
const Op = Sequelize.Op;

// let heroes = [
//   ( N'Mr. Nice' ),
//    (N'Narco' ),
//    (N'Bombasto' ),
//   (N'Celeritas' ),
//  (N'Magneta' ),
//   (N'RubberMan' ),
//    (N'Dynama' ),
//    (N'Dr IQ' ),
//    (N'Magma' ),
//    (N'Tornado' )
// ];

const HeroesController = {
  getAllHeroes: () => {
    return new Promise((resolve, reject) => {
      HeroesDB.findAll()
      .then(heroes => {
        resolve(heroes)
      })
    })
  },
  searchHeroes: (searchTerm) => {
    return new Promise((resolve, reject) => {

      HeroesDB.findAll({ where: { name: { [Op.like]: '%' + searchTerm + '%' } } })
        .then(filteredHeroes => {
          resolve(filteredHeroes)
        })
    })
  },
  getHero: (id) => {
    return new Promise((resolve, reject) => {
      HeroesDB.findByPk(id).then(hero => {
        resolve(hero);
      })
    });
  },
  addHero: (heroName) => {
    return new Promise((resolve, reject) => {

      HeroesDB.create({ name: heroName })
        .then(hero => {
        const plainHero = hero.get({ plain: true })
        resolve(plainHero)
      });
    });
  },
  updateHero: (Hero) => {
    return new Promise((resolve, reject) => {

      HeroesDB.update({ name: Hero.name },
        { where: { id: Hero.id } }
      ).then(() => {
        resolve(200);
      });
    });
  },
  deleteHero: (id) => {
    return new Promise((resolve, reject) => {
      HeroesDB.destroy({
        where: { id: id }
      }).then(() => {
        resolve(200)
      });
    });
  }
}

module.exports = HeroesController
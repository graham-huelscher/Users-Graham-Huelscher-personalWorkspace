const express = require('express')
const router = express.Router()
const HeroesController = require('../controllers/heroes')
const Hero = require('../model/Hero')



router.get('/', (req, res) => {
    const hasQueryParameter = req.query.name !== undefined

    if (!hasQueryParameter) {
        HeroesController
            .getAllHeroes()
            .then(heroes => res.json(heroes))
    }
    else {
        const searchTerm = req.query.name
        HeroesController
            .searchHeroes(searchTerm)
            .then(heroes => res.json(heroes))
    }
})

router.get('/:id', (req, res) => {
    const { id } = req.params;
    HeroesController
        .getHero(Number(id))
        .then(hero => res.json(hero))
})

router.post('/', (req, res) => {
    const heroName = req.body.name
    HeroesController
        .addHero(heroName)
        .then(hero => res.json(hero))
})

router.put('/', (req, res) => {
    const { name, id } = req.body;
    const heroToUpdate = new Hero(id, name)
    HeroesController
        .updateHero(heroToUpdate)
        .then(response => res.json(response))
})

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    HeroesController
        .deleteHero(Number(id))
        .then(response => res.json(response))
})

module.exports = router
const express = require('express')
const app = express()
const port = process.env.PORT || process.argv[2] || 8080
const bodyParser = require('body-parser')
const HeroesDB = require('./model/Hero')

const cors = require('cors')
const corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200
}

// Middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors(corsOptions))

// Routes
app.use('/api/heroes', require('./routes/heroes'))

app.listen(port, () => {
  console.log(`listening on ${port}`)
})

// const Sequelize = require('sequelize');
// const db = new Sequelize('HeroesDB', 'sa', 'sql2017', {
//   host: 'localhost',
//   dialect: 'mssql',
//   operatorsAliases: false,

//   pool: {
//     max: 5,
//     min: 0,
//     acquire: 30000,
//     idle: 10000
//   }
// });

// const Hero = db.define('Heroes', {
//   Id: {
//     primaryKey: true,
//     type: Sequelize.INTEGER
//   },
//   Name: {
//     type: Sequelize.STRING
//   }
// }, { timestamps: false, });

HeroesDB.findAll({raw: true}).then(heroes => {
  console.log(heroes)
})
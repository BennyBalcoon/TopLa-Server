const express = require('express')
const bodyParser = require('body-parser')
const sequelize = require('./config/db.config')
const cors = require('cors')

const User = require('./models/user')
const Category = require('./models/category')
const Advert = require('./models/advert')

const usersRoutes = require('./routes/usersRoutes')
const categoriesRoutes = require('./routes/categoriesRoutes')
const advertsRoutes = require('./routes/advertsRoutes')

const passport = require('passport')

sequelize
.authenticate()
.then(() => {
  console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// sequelize.sync({force: true})
//   .then(() => {
//     console.log("sync DB");
//         })
//         .catch((err) => {
//           console.log(err);
//         })

// User.hasMany(Advert, { foreignKey: 'adv_usrid'})
// Advert.belongsTo(User, { foreignKey: 'adv_usrid'})
// Category.hasMany(Advert, { foreignKey: 'adv_catid'})
// Advert.belongsTo(Category, { foreignKey: 'adv_catid'})

const app = express()
app.use(cors({
  origin: 'https://topla.herokuapp.com'
}))

app.use(bodyParser.json())

app.use(passport.initialize())
require('./services/passport')(passport)

app.use('/api/v1/users', usersRoutes)
app.use('/api/v1/categories', categoriesRoutes)
app.use('/api/v1/notices', advertsRoutes)
        
const PORT = process.env.PORT || 3001;

app.listen(PORT, function () {
    console.log('App is running on port: ' + PORT);
  });


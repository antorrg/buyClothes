import { Sequelize } from 'sequelize'
import models from '../../models/index.js'
import env from './envConfig.js'

const sequelize = new Sequelize(env.DatabaseUrl, {
  dialect: 'postgres',
  logging: false,
  native: false
})

Object.values(models).forEach((model) => model(sequelize))

const {
  Product,
  ProductVariant,
  FinalProduct,
  Category,
  Discipline,
  Genre,
  Trademark,
  Company,
  Rating,
  Sales,
  User,
  Customer,
  Landing,
  Cache
} = sequelize.models

// Relations here:
Product.belongsToMany(Category, { through: 'product_category', onDelete: 'CASCADE', onUpdate: 'CASCADE' })
Category.belongsToMany(Product, { through: 'product_category', onDelete: 'CASCADE', onUpdate: 'CASCADE' })

Product.belongsToMany(Discipline, { through: 'product_discipline', onDelete: 'CASCADE', onUpdate: 'CASCADE' })
Discipline.belongsToMany(Product, { through: 'product_discipline', onDelete: 'CASCADE', onUpdate: 'CASCADE' })

Product.belongsToMany(Genre, { through: 'product_genre', onDelete: 'CASCADE', onUpdate: 'CASCADE' })
Genre.belongsToMany(Product, { through: 'product_genre', onDelete: 'CASCADE', onUpdate: 'CASCADE' })

Product.belongsToMany(Trademark, { through: 'trademark_product', onDelete: 'CASCADE', onUpdate: 'CASCADE' })
Trademark.belongsToMany(Product, { through: 'trademark_product', onDelete: 'CASCADE', onUpdate: 'CASCADE' })

Product.hasMany(ProductVariant)
ProductVariant.belongsTo(Product, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })

ProductVariant.hasMany(Rating)
Rating.belongsTo(ProductVariant, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })

User.hasMany(Rating)
Rating.belongsTo(User, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })

User.hasOne(Customer)
Customer.belongsTo(User, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })

// -------------------------------------------------------------
const startApp = async (synced = false, forced = false) => {
  try {
    await sequelize.authenticate()
    if (synced === true) {
      await sequelize.sync({ force: forced })
      console.log(`✔️  Database synced successfully!!\n Force: ${forced}`)
    }
    console.log('🟢 Connection to Postgres established with Sequelize')
  } catch (error) {
    console.error('❌ Error connecting to Sequelize:', error.message)
  }
}

const closeDatabase = async () => {
  try {
    await sequelize.close()
    console.log('🛑 Closing connection to database.')
  } catch (error) {
    console.error('❌ Error closing database:', error)
  }
}

export {
  Product,
  ProductVariant,
  FinalProduct,
  Category,
  Discipline,
  Genre,
  Trademark,
  Company,
  Rating,
  Sales,
  User,
  Customer,
  Landing,
  Cache,
  sequelize,
  startApp,
  closeDatabase
}

import {Sequelize} from 'sequelize';
import models from './Models/index.js'
// import CreateProduct1 from'./Models/product1';
// import CreateUser from'./Models/user';
// import CreateImage from './Models/image'
// import CreateSize from './Models/size'
// import CreateCategory from './Models/category'
// import CreateExtra from './Models/extras'
// import CreateRating from './Models/rating'
// import CreateCompany from './Models/company'
// import CreateSales from './Models/sales';
// import CreateTrademarck from './Models/trademarck'
// import CreateGenre from './Models/genre'
// import CreateDiscipline from './Models/discipline'

import dotenv from 'dotenv'
dotenv.config();
const {DB_USER, DB_PASS, DB_HOST, DB_NAME, DB_DEPLOY}=process.env;



const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}`,
{logging: false,
native:false}
);
// Iterar sobre los modelos y crearlos con Sequelize
Object.values(models).forEach((model) => model(sequelize));

// CreateProduct1(sequelize);
// CreateUser(sequelize);
// CreateImage(sequelize);
// CreateCategory(sequelize);
// CreateSize(sequelize);
// CreateExtra(sequelize);
// CreateRating(sequelize);
// CreateCompany(sequelize);
// CreateSales(sequelize);
// CreateTrademarck(sequelize);
// CreateGenre(sequelize);

const {User, Product1, Image, Category, Size, Extra,Rating, Company, Sales, Trademarck, Genre, Discipline }= sequelize.models;

//Asociations:

Product1.belongsToMany (Category, {through: 'product_cats'});
Category.belongsToMany (Product1, {through: 'product_cats'});

Product1.belongsToMany (Size,{through: 'product_size'})
Size.belongsToMany (Product1,{through: 'product_size'})

Product1.belongsToMany (Extra,{through: 'product_extras'})
Extra.belongsToMany (Product1,{through: 'product_extras'})

Product1.belongsToMany (Genre,{through: 'product_genre'})
Genre.belongsToMany (Product1,{through: 'product_genre'})

Product1.belongsToMany (Trademarck,{through: 'product_trade'})
Trademarck.belongsToMany (Product1,{through: 'product_trade'})

Product1.hasMany(Image);
Image.belongsTo(Product1);

Product1.hasMany(Rating);
Rating.belongsTo(Product1);

User.hasMany(Rating);
Rating.belongsTo(User)



export {
    User,
    Product1,
    Image,
    Category,
    Size,
    Extra,
    Rating,
    Company,
    Sales,
    Trademarck,
    Genre,
    Discipline,

    sequelize
}

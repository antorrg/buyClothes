import {Sequelize} from 'sequelize';
import models from './Models/index.js'


import dotenv from 'dotenv'
dotenv.config();
const {DB_USER, DB_PASS, DB_HOST, DB_NAME, DB_DEPLOY}=process.env;



const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}`,
{logging: false,
native:false}
);


// Iterar sobre los modelos y crearlos con Sequelize
Object.values(models).forEach((model) => model(sequelize));



const {User, GeneralProduct, Product1, Image, Category, Size, Extra, Rating, Company, Sales, Trademarck, Genre, Discipline }= sequelize.models;

//Asociations:

GeneralProduct.belongsToMany (Category, {through: 'general_cats'});
Category.belongsToMany (GeneralProduct, {through: 'general_cats'});

GeneralProduct.belongsToMany (Genre,{through: 'general_genre'})
Genre.belongsToMany (GeneralProduct,{through: 'general_genre'})

GeneralProduct.belongsToMany (Trademarck,{through: 'general_trade'})
Trademarck.belongsToMany (GeneralProduct,{through: 'general_trade'})

GeneralProduct.belongsToMany (Discipline,{through: 'general_disc'})
Discipline.belongsToMany (GeneralProduct,{through: 'general_disc'})

Product1.belongsToMany (Size,{through: 'product_size'})
Size.belongsToMany (Product1,{through: 'product_size'})

Product1.belongsToMany (Extra,{through: 'product_extras'})
Extra.belongsToMany (Product1,{through: 'product_extras'})

GeneralProduct.hasMany(Product1);
Product1.belongsTo(GeneralProduct);

Product1.hasMany(Image);
Image.belongsTo(Product1);

Product1.hasMany(Rating);
Rating.belongsTo(Product1);

User.hasMany(Rating);
Rating.belongsTo(User)



export {
    User,
    GeneralProduct,
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

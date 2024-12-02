import {Sequelize} from 'sequelize';
import models from './Models/index.js'
import env from './envConfig.js'




const sequelize = new Sequelize(env.DbConnect,
{logging: false,
native:false}
);


// Iterar sobre los modelos y crearlos con Sequelize
Object.values(models).forEach((model) => model(sequelize));



const {User, GeneralProduct, Product1, Category, Extra, Rating, Company, Sales, Trademarck, Genre, Discipline, Attributes }= sequelize.models;

//Asociations:

GeneralProduct.belongsToMany (Category, {through: 'general_cats'});
Category.belongsToMany (GeneralProduct, {through: 'general_cats'});

GeneralProduct.belongsToMany (Attributes, {through: 'general_attributes'});
Attributes.belongsToMany (GeneralProduct, {through: 'general_attributes'});

GeneralProduct.belongsToMany (Genre,{through: 'general_genre'})
Genre.belongsToMany (GeneralProduct,{through: 'general_genre'})

GeneralProduct.belongsToMany (Trademarck,{through: 'general_trade'})
Trademarck.belongsToMany (GeneralProduct,{through: 'general_trade'})

GeneralProduct.belongsToMany (Discipline,{through: 'general_disc'})
Discipline.belongsToMany (GeneralProduct,{through: 'general_disc'})

Product1.belongsToMany (Extra,{through: 'product_extras'})
Extra.belongsToMany (Product1,{through: 'product_extras'})

GeneralProduct.hasMany(Product1);
Product1.belongsTo(GeneralProduct);

Product1.hasMany(Rating);
Rating.belongsTo(Product1);

User.hasMany(Rating);
Rating.belongsTo(User)



export {
    User,
    GeneralProduct,
    Product1,
    Category,
    Extra,
    Rating,
    Company,
    Sales,
    Trademarck,
    Genre,
    Discipline,
    Attributes,

    sequelize
}

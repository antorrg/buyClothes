import {Sequelize} from 'sequelize';
import models from './Models/index.js'
import env from './envConfig.js'


const sequelize = new Sequelize(env.DbConnect,
{logging: false,
native:false}
);

// Iterar sobre los modelos y crearlos con Sequelize
Object.values(models).forEach((model) => model(sequelize));

const { 
    GeneralProduct,
    Product1,
    Attributes,
    User,
    Rating,
    Company,
    Trademarck,
    Sales,
}= sequelize.models;

//Asociations:


GeneralProduct.belongsToMany (Attributes, {through: 'general_attributes'});
Attributes.belongsToMany (GeneralProduct, {through: 'general_attributes'});

GeneralProduct.belongsToMany (Trademarck, {through: 'general_trademarck'});
Trademarck.belongsToMany (GeneralProduct, {through: 'general_trademarck'});


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
    Rating,
    Company,
    Sales,
    Trademarck,
    Attributes,

    sequelize
}

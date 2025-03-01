import {Sequelize} from 'sequelize';
import models from '../Models/index.js'
import env from './envConfig.js'




const sequelize = new Sequelize(env.DatabaseUrl,
{logging: false,
native:false}
);


// Iterar sobre los modelos y crearlos con Sequelize
Object.values(models).forEach((model) => model(sequelize));

const {
    Product,
    ProductVariant,
    ProductAttributes,
    Attributes,
    Trademark,
    Company,
    Rating,
    Sales,
    User,
    Landing
} = sequelize.models;


//Asociations:


Product.belongsToMany (Attributes, {through: ProductAttributes, onDelete: "CASCADE", onUpdate: "CASCADE"});
Attributes.belongsToMany (Product, {through: ProductAttributes, onDelete: "CASCADE", onUpdate: "CASCADE"});

Product.belongsToMany (Trademark, {through: 'trademark_product', onDelete: "CASCADE", onUpdate: "CASCADE"});
Trademark.belongsToMany (Product, {through: 'trademark_product', onDelete: "CASCADE", onUpdate: "CASCADE"});


Product.hasMany(ProductVariant);
ProductVariant.belongsTo(Product,{ onDelete: "CASCADE", onUpdate: "CASCADE"});

ProductVariant.hasMany(Rating);
Rating.belongsTo(ProductVariant,{ onDelete: "CASCADE", onUpdate: "CASCADE"});

User.hasMany(Rating);
Rating.belongsTo(User,{ onDelete: "CASCADE", onUpdate: "CASCADE"})


export {
    User,
    Product,
    ProductVariant,
    ProductAttributes,
    Rating,
    Company,
    Sales,
    Trademark,
    Attributes,
    Landing,
    sequelize,
}
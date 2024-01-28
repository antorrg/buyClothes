import {Sequelize} from 'sequelize';
import CreateProduct1 from'./Models/product1';
import CreateUser from'./Models/user';
import dotenv from 'dotenv'
dotenv.config();
const {DB_USER, DB_PASS, DB_HOST, DB_NAME, DB_DEPLOY}=process.env;



const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}`,
{logging: false,
native:false}
);

CreateProduct1(sequelize);
CreateUser(sequelize);

const {User, Product1}= sequelize.models;


export {
    User,
    Product1,
    sequelize
}

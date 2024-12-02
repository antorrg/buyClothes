import dotenv from 'dotenv'
const envFile = process.env.NODE_ENV==='development'? '.env.development': process.env.NODE_ENV==='test'? '.env.test' : '.env.production';
dotenv.config({ path : envFile })

const status = process.env.NODE_ENV==='development'? 'development': process.env.NODE_ENV==='test'? 'test' : 'production'

const {NODE_ENV,PORT, DB_USER,DB_PASS, DB_HOST, DB_NAME, USER_IMAGE, SECRET_KEY, EMAIL, PASS, IMG, SUDO_AUTH } = process.env
const DbConnect = `postgres://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}`;

export default {
    Port: PORT,
    Status: status,
    DbConnect,
    UserImage: USER_IMAGE,
    SecretKey: SECRET_KEY,
    Email: EMAIL,
    Pass: PASS,
    Image: IMG,
    SudoAuth : SUDO_AUTH,
}
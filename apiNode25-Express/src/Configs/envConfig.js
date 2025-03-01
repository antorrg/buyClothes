import dotenv from "dotenv";


const configEnv = {
    development: ".env.development",
    production: ".env",
    test: ".env.test",
}
const envFile = configEnv[process.env.NODE_ENV] || ".env.development";
dotenv.config({ path: envFile });

const Status = Object.keys(configEnv).find(key => configEnv[key] === envFile) || 'production';
const {PORT, DATABASE_URL,} = process.env;



export default {
    Port : PORT,
    DatabaseUrl : DATABASE_URL,
    Status,
  
}

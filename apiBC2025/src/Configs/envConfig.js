import dotenv from 'dotenv'

const ENV_FILES = { development: '.env.development', test: '.env.test', production: '.env' }
dotenv.config({ path: ENV_FILES[process.env.NODE_ENV] })

const envConfig = {
  Port: parseInt(process.env.PORT || '3000'),
  Status: process.env.NODE_ENV,
  DatabaseUrl: process.env.DATABASE_URL || '',
  LogErrors: process.env.LOG_ERRORS,
  ExpiresIn: process.env.JWT_EXPIRES_IN,
  Secret: process.env.JWT_SECRET,
  UserImg: process.env.USER_IMG
}
export default envConfig

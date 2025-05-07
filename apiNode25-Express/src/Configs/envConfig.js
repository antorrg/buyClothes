import dotenv from 'dotenv'

const configEnv = {
  development: '.env.development',
  production: '.env',
  test: '.env.test'
}
const envFile = configEnv[process.env.NODE_ENV] || '.env.development'
dotenv.config({ path: envFile })

const Status = Object.keys(configEnv).find(key => configEnv[key] === envFile) || 'production'
const { PORT, DATABASE_URL, MP_ACCESS_TOKEN, USER_IMG, SECRET_KEY, JWT_EXPIRES_IN, DEFAULT_TTL } = process.env

export default {
  Port: PORT,
  DatabaseUrl: DATABASE_URL,
  Status,
  MpAccesToken: MP_ACCESS_TOKEN,
  UserImg: USER_IMG,
  SecretKey: SECRET_KEY,
  JwtExpiresIn: JWT_EXPIRES_IN,
  DefaultTtl: DEFAULT_TTL

}

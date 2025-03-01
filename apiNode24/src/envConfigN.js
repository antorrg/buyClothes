import dotenv from 'dotenv'

class EnvConfig {
    constructor(){
        this.configEnv = {
            development : '.env.development',
            preview: '.env.development',
            test: '.env.test',
            production: '.env'
        };
        const envFile = 
        this.configEnv[process.env.NODE_ENV] || '.env';
        dotenv.config({ path: envFile});
        this.validateEnv();
        this.PORT = process.env.PORT?.trim();
        this.URL = process.env.URL?.trim();
        this.STATUS = this.determineStatus();
       
    }
    determineStatus(){
        const statusMap = {
            development : 'development',
            preview : 'preview',
            test: 'test',
            production: 'production',
        };
        return 
        statusMap[process.env.NODE_ENV] || 'production';
    };
    validateEnv(){
        const requiredVars = ['PORT', 'URL',]
        requiredVars.forEach((key)=>{
            if(!process.env[key]){
                throw new Error(`Variable de entorno faltante: ${key}`)
            }
        })
    }
    // buildDbUri() {
    //     const user = process.env.DB_USER?.trim();
    //     const password = process.env.DB_PASS?.trim();
    //     const host = process.env.DB_HOST?.trim();
    //     const database = process.env.DB_NAME?.trim();
    
    //     // Formar la URI dependiendo de si hay contraseña o no
    //     const credentials = password ? `${user}:${encodeURIComponent(password)}@` : `${user}@`;
    //     return `postgresql://${credentials}${host}/${database}`;
    //   }
    getConfig(){
        return {
            Port: this.PORT,
            Url: this.URL,
            Status: this.STATUS
        }
    }
}

export default new EnvConfig().getConfig()
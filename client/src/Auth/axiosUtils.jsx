import axios from 'axios'




const interceptor = (logout) => {
 

    axios.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error.response && error.response.status === 401 || error.response && error.response.status === 403) {
                // Acceso no autorizado, redirigir al inicio de sesión
                redirectologin(logout)
            }
            return Promise.reject(error);
        }
        );
    };   
    const redirectologin =(logout)=>{
            setTimeout(()=>{
                logout();
                localStorage.clear(); 
            },2000);
    }
    
    const setAuthHeader = (token) => {
        //const token = localStorage.getItem('validToken');
        const config = {};
        
        if (token) {
            config.headers = {
                'x-access-token':`${token}`
            };
        }
        
        return config;
    };
    
    export {
        interceptor,
        setAuthHeader
    }
    // const redirectToLogin =  (logout) => {
    //     // Lógica para redirigir al usuario al inicio de sesión
    //     console.log('Console.log: Token expirado. Redirigiendo al inicio de sesión...');
    //     setTimeout(()=>{
    //         logout({ logoutParams: { returnTo: window.location.origin } });
    //         localStorage.clear(); //Esto en caso de que auth0 u otro servicio no limpie el storage
    //         window.location.reload(true);
    //     },2000)
        
    // };
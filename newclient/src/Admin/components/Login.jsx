// import {useState} from "react";
// import {useNavigate} from 'react-router-dom'
// import{handleLogin,handleLogout,handleRegister}from "./Auth/endpointAuth"

const Login = () => {
    const navigate = useNavigate()

    const [signup, setSignup] = useState(false)

    const [isLoading, setIsLoading] = useState(false)

    const onClose = () => {
        setIsLoading(false)
        setTimeout(()=>{
         navigate('/home')
        },500)
    }
    const closeLogin = ()=>{
      navigate('/')
    }

    const switchForm = () => {
        setSignup(prevSignup => !prevSignup);
    }


//* Formulary: 

    const [input, setInput] = useState({
        email: '',
        password: ''
    })
  

    const handleChange = (e) => {
        const {name, value} = e.target;
        setInput(prevInput => {
            return {
                ...prevInput,
                [name]: value
            }
        })
    }
    const handleSubmit = async() => {
        if(signup){
            console.log('signup: ', input)
            setIsLoading(true)
            await handleRegister(input, onClose)
        } else {
        console.log('signin ', input)
        setIsLoading(true)
        await handleLogin(input, onClose)
     }
     setInput({email: '', password: ''})
    }
    const permit =  (!input.email.trim()|| !input.password.trim())? true :false;
    
  return (
    <main class="form-signin w-100 m-auto rounded-2 shadow">
    <form style={{border: '1px solid #ccc', padding: '20px', borderRadius: '10px'}}>   
      <div class="d-flex justify-content-between align-items-center"> 
        <img class="mb-4" src="../vite.svg" alt="" width="40" height="auto"/>
        <button type="button" onClick={closeLogin}class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <h1 class="h3 mb-3 fw-normal">{signup ? 'Please sign up' : 'Please sign in'}</h1>
  
      <div class="form-floating">
        <input type="email" name='email'class="form-control" id="floatingInput" value={input.email} onChange={handleChange} placeholder="name@example.com"/>
        <label htmlFor="floatingInput">Email address</label>
      </div>

      <div class="form-floating mb-2">
        <input type="text" name= 'password' class="form-control" id="floatingPassword" value={input.password} onChange={handleChange} placeholder="Password"/>
        <label htmlFor="floatingPassword">Password</label>
      </div>
        {!isLoading?
      <div class="d-flex justify-content-between">
        <button class="btn btn-sm btn-primary w-40 py-2" onClick={handleSubmit}type="button" disabled={permit}>{signup?'Sign up' :'Sign in'}</button>
        <button class="btn btn-sm btn-primary w-40 py-2" onClick={switchForm} type="button">{signup? 'Go To Login':'Create account'}</button>
      </div>
      :
      <div class="d-flex justify-content-between">
           <button class="btn btn-primary" type="button" disabled>
             <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
            </button>
            <button class="btn btn-primary" type="button" disabled>
             <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                 Loading...
            </button>
      </div>
            }

    </form>
  </main>
  );
};

export default Login;

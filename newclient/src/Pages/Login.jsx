import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate()
  const [signup, setSignup] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const closeBtn = ()=>{
    navigate(-1)
  }
  const [input, setInput] = useState({
    email: '',
    password: '',
    confirmPass: ''
  })

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
  }

  const validate = () => {
    const newErrors = {}
    if (!input.email.includes('@')) newErrors.email = 'Email inválido'
    if (input.password.length < 6) newErrors.password = 'Mínimo 6 caracteres'
    if (signup && input.password !== input.confirmPass)
      newErrors.confirmPass = 'Las contraseñas no coinciden'
    return newErrors
  }

  const handleSubmit = async () => {
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setErrors({})
    setIsLoading(true)

    try {
      if (signup) {
        console.log('Registrando usuario:', input)
        // await api.register(input)
      } else {
        console.log('Logueando usuario:', input)
        // await api.login(input)
      }

      //navigate('/dashboard')
    } catch (err) {
      setErrors({ general: 'Error del servidor' })
    } finally {
     setTimeout(()=>{ 
      setIsLoading(false)
      setInput({
         email: '',
         password: '',
        confirmPass: ''
      })
      navigate(-1)
    },5000)
    }
  }

  return (
    <main className="form-signin w-100 m-auto rounded-2 shadow">
      <section
        style={{
          border: '1px solid #ccc',
          padding: '20px',
          borderRadius: '10px'
        }}
      >
        <div className="d-flex justify-content-between align-items-center">
          <img
            className="mb-4"
            src="https://firebasestorage.googleapis.com/v0/b/proyectopreact.appspot.com/o/images%2Fburro.jpeg?alt=media&token=f294ceaf-2a00-49e8-a9cc-711c0dc4264a"
            alt="Logo"
            style={{ width: '40px', height: 'auto' }}
          />
          <button
            type="button"
            className="btn-close"
            onClick={closeBtn}
            aria-label="Close"
          ></button>
        </div>

        <h1 className="h3 mb-3 fw-normal">
          {signup ? '¿Nuevo? Regístrese' : 'Inicie sesión'}
        </h1>

        <div className="form-floating mb-2">
          <input
            type="email"
            name="email"
            className="form-control"
            id="email"
            placeholder="name@example.com"
            value={input.email}
            onChange={handleChange}
          />
          <label htmlFor="email">Correo electrónico</label>
          {errors.email && <small className="text-danger">{errors.email}</small>}
        </div>

        <div className="form-floating mb-2">
          <input
            type="password"
            name="password"
            className="form-control"
            id="password"
            placeholder="Password"
            value={input.password}
            onChange={handleChange}
          />
          <label htmlFor="password">Contraseña</label>
          {errors.password && <small className="text-danger">{errors.password}</small>}
        </div>

        {signup && (
          <div className="form-floating mb-2">
            <input
              type="password"
              name="confirmPass"
              className="form-control"
              id="confirmPass"
              placeholder="Confirm Password"
              value={input.confirmPass}
              onChange={handleChange}
            />
            <label htmlFor="confirmPass">Confirmar Contraseña</label>
            {errors.confirmPass && (
              <small className="text-danger">{errors.confirmPass}</small>
            )}
          </div>
        )}

        {errors.general && (
          <div className="alert alert-danger mt-2">{errors.general}</div>
        )}

        {!isLoading? (
          <div className="d-flex justify-content-between mt-3">
            <button
              className="btn btn-sm btn-primary w-50 me-2"
              type="button"
              onClick={handleSubmit}
            >
              {signup ? 'Registrarse' : 'Ingresar'}
            </button>
            <button
              className="btn btn-sm btn-outline-secondary w-50"
              type="button"
              onClick={() => setSignup(!signup)}
            >
              {signup ? 'Ir a Login' : 'Registrarse'}
            </button>
          </div>
        ) : (
          <div className="d-flex justify-content-between mt-3">
            <button className="btn btn-sm btn-primary w-50 me-2" disabled>
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
              {'  '}
              Cargando...
            </button>
            <button className="btn btn-sm btn-outline-secondary w-50" disabled>
              Espera...
            </button>
          </div>
        )}
      </section>
    </main>
  )
}

export default Login

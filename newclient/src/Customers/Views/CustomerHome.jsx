import React from 'react'
import {Link} from 'react-router-dom'

const CustomerHome = () => {
  return (
    <div>
       <div className="container">
      <h1 className="h3">Panel de administracion de usuarios</h1>
      <Link to="/admin" className="btn btn-sm btn-outline-success me-3">
        Atras
      </Link>
      <Link to="/detail" className="btn btn-sm btn-outline-success me-3">
        Atras
      </Link>
    </div>
    </div>
  )
}

export default CustomerHome
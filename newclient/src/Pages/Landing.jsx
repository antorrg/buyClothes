import React from "react";
import {Link} from 'react-router-dom'
import {showWarnWithTime, showSuccess}from '../Utils/BaseEndpoints/toastify'

const Landing = () => {
  const verToast = ()=>{
    return showWarnWithTime(`Soy un alert de prueba y no me voy si no me cierran`)
  }
  const verToast2 = ()=>{
    return showSuccess(`Soy un alert de prueba y yo me rajo enseguida (tres segunditos nomás...)`)
  }
  return (
    <div className="container">
      <h1 className="h2">Esta es la landing page (pagina general)</h1>
      <div className="d-flex align-content-center ">
        <Link to="/home" className="btn btn-sm btn-outline-primary me-3">
          Home
        </Link>
        <Link to="/user" className="btn btn-sm btn-outline-success me-3">
          User
        </Link>
        <Link to="/admin" className="btn btn-sm btn-outline-danger me-3">
          Admin
        </Link>
        <Link to="/login" className="btn btn-sm btn-outline-danger me-3">
          Login
        </Link>
      <button className="btn btn-sm btn-outline-danger me-3" onClick={verToast}>Ver toast</button>
      <button className="btn btn-sm btn-outline-danger me-3" onClick={verToast2}>Ver toast2</button>
      </div>
    </div>
  );
};

export default Landing;

import React from "react";
import { Link } from "react-router-dom";

const AdminPanel = () => {
  return (
    <div className="container">
      <h1 className="h2">
        Este es el panel de Admin (requiere validacion y rol)
      </h1>
      <div className="d-flex align-content-center ">
        <Link to="/admin/users" className="btn btn-sm btn-outline-primary me-3">
          Ver usuarios
        </Link>
        <Link to="/" className="btn btn-sm btn-outline-success me-3">
          Volver
        </Link>
      </div>
    </div>
  );
};

export default AdminPanel;

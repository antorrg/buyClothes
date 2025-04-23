import { useState, useEffect, Suspense, lazy } from "react";
import { ToastContainer } from "react-toastify";
import { Routes, Route } from "react-router-dom";
import { Landing, Home, Detail, Login } from "./Pages/index";
const CustomApp = lazy(() => import("./Customers/CustomApp"));
const AdminApp = lazy(() => import("./Admin/AdminApp"));
import ProtectedRoutes from "./Utils/ProtectedRoutes";
import RoleBasedRoute from "./Utils/RoleBasedRoute";

function App() {
  const [theme, setTheme] = useState("light");

  //Cambiar tema
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    // Guardar preferencia en localStorage
    localStorage.setItem("theme", newTheme);
  };
  useEffect(() => {
    document.documentElement.setAttribute("data-bs-theme", theme);
  }, [theme]);

  return (
    <div className={`app ${theme}-mode`}>
      <button
        onClick={toggleTheme}
        className="btn btn-sm btn-outline-secondary position-fixed top-0 end-0 m-3"
      >
        {theme === "light" ? "🌙" : "☀️"}
      </button>
      <ToastContainer limit={2} theme={theme} />
      <Suspense fallback={<div>...loading</div>}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<Home />} />
          <Route path="/detail" element={<Detail />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/user/*"
            element={
              <RoleBasedRoute redirectTo="/login">
                <CustomApp />
              </RoleBasedRoute>
            }
          />
          {/* <Route path="/user/*" element={<CustomApp />} /> */}
          <Route
            path="/admin/*"
            element={
              <RoleBasedRoute
                allowedRoles={["Moderator", "Admin", "Super Admin"]}
                redirectTo="/login"
              >
                <AdminApp />
              </RoleBasedRoute>
            }
          />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;

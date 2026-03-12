// Login.jsx
import { useState } from "react";
import API from "../servicios/api";

function Login({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({
    username: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const endpoint = isLogin ? "/usuario/login" : "/usuario/signup";
      const response = await API.post(endpoint, form);
      
      if (isLogin) {
        localStorage.setItem("token", response.data.token);
        onLogin();
      } else {
        // Cambiar a modo login después del registro exitoso
        setIsLogin(true);
        setForm({ username: "", password: "" });
        alert("Usuario creado exitosamente. Por favor inicia sesión.");
      }
    } catch (error) {
      setError(
        isLogin 
          ? "Usuario o contraseña incorrectos" 
          : "Error al crear usuario. El usuario podría ya existir."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-blue-200 flex items-center justify-center p-6">
      <div className="bg-white shadow-2xl rounded-2xl w-full max-w-md p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          {isLogin ? "🔐 Iniciar Sesión" : "📝 Crear Cuenta"}
        </h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block font-medium mb-1">Usuario</label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500"
              placeholder="Ingresa tu usuario"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Contraseña</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500"
              placeholder="Ingresa tu contraseña"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg shadow-md transition duration-300"
          >
            {loading ? "Procesando..." : isLogin ? "Iniciar Sesión" : "Registrarse"}
          </button>

          <button
            type="button"
            onClick={() => {
              setIsLogin(!isLogin);
              setError("");
              setForm({ username: "", password: "" });
            }}
            className="w-full text-indigo-600 hover:text-indigo-800 text-sm"
          >
            {isLogin 
              ? "¿No tienes cuenta? Regístrate aquí" 
              : "¿Ya tienes cuenta? Inicia sesión aquí"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
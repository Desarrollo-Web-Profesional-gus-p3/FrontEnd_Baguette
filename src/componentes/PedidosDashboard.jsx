// PedidosDashboard.jsx
import { useState, useEffect } from "react";
import API from "../servicios/api";
import PedidoForm from "./PedidoForm";
import PedidoList from "./PedidoList";
import FiltrosPedidos from "./FiltrosPedidos";

function PedidosDashboard({ onLogout }) {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pedidoSeleccionado, setPedidoSeleccionado] = useState(null);
  const [filtros, setFiltros] = useState({
    nombre: "",
    pagado: "",
    sortBy: "createdAt",
    sortOrder: "descending"
  });

  const cargarPedidos = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      
      if (filtros.nombre) params.append("nombre", filtros.nombre);
      if (filtros.pagado) params.append("pagado", filtros.pagado);
      if (filtros.sortBy) params.append("sortBy", filtros.sortBy);
      if (filtros.sortOrder) params.append("sortOrder", filtros.sortOrder);
      
      const url = `/pedidos${params.toString() ? `?${params.toString()}` : ""}`;
      const response = await API.get(url);
      setPedidos(response.data);
    } catch (error) {
      console.error("Error cargando pedidos:", error);
      alert("Error al cargar los pedidos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarPedidos();
  }, [filtros]);

  const handlePedidoGuardado = () => {
    setPedidoSeleccionado(null);
    cargarPedidos();
  };

  const handleEditarPedido = (pedido) => {
    setPedidoSeleccionado(pedido);
  };

  const handleCancelarEdicion = () => {
    setPedidoSeleccionado(null);
  };

  const handleEliminarPedido = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar este pedido?")) {
      try {
        await API.delete(`/pedidos/${id}`);
        cargarPedidos();
        if (pedidoSeleccionado?._id === id) {
          setPedidoSeleccionado(null);
        }
      } catch (error) {
        alert("Error al eliminar el pedido");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-blue-200">
      {/* Header */}
      <div className="bg-white shadow-md p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">
            📦 Sistema de Pedidos
          </h1>
          <button
            onClick={onLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
          >
            Cerrar Sesión
          </button>
        </div>
      </div>

      {/* Contenido principal - Dos columnas */}
      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Columna izquierda - Formulario */}
          <div className="bg-white rounded-2xl shadow-xl p-6 h-fit">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              {pedidoSeleccionado ? "✏️ Editar Pedido" : "➕ Nuevo Pedido"}
            </h2>
            <PedidoForm 
              pedidoToEdit={pedidoSeleccionado}
              onPedidoGuardado={handlePedidoGuardado}
              onCancelarEdicion={handleCancelarEdicion}
            />
          </div>

          {/* Columna derecha - Lista y filtros */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              📋 Lista de Pedidos
            </h2>
            
            <FiltrosPedidos 
              filtros={filtros}
              setFiltros={setFiltros}
            />

            {loading ? (
              <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                <p className="mt-2 text-gray-600">Cargando pedidos...</p>
              </div>
            ) : (
              <PedidoList 
                pedidos={pedidos}
                onEditar={handleEditarPedido}
                onEliminar={handleEliminarPedido}
                pedidoSeleccionadoId={pedidoSeleccionado?._id}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PedidosDashboard;
// FiltrosPedidos.jsx
function FiltrosPedidos({ filtros, setFiltros }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFiltros(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const limpiarFiltros = () => {
    setFiltros({
      nombre: "",
      pagado: "",
      sortBy: "createdAt",
      sortOrder: "descending"
    });
  };

  return (
    <div className="mb-6 p-4 bg-gray-50 rounded-lg">
      <h3 className="font-semibold mb-3">🔍 Filtros</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm mb-1">Buscar por nombre</label>
          <input
            type="text"
            name="nombre"
            value={filtros.nombre}
            onChange={handleChange}
            placeholder="Nombre del cliente"
            className="w-full border rounded-lg px-3 py-2 text-sm"
          />
        </div>
        
        <div>
          <label className="block text-sm mb-1">Método de pago</label>
          <select
            name="pagado"
            value={filtros.pagado}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 text-sm"
          >
            <option value="">Todos</option>
            <option value="Efectivo">Efectivo</option>
            <option value="Transferencia">Transferencia</option>
            <option value="Tarjeta">Tarjeta</option>
            <option value="Depósito">Depósito</option>
          </select>
        </div>

        <div>
          <label className="block text-sm mb-1">Ordenar por</label>
          <select
            name="sortBy"
            value={filtros.sortBy}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 text-sm"
          >
            <option value="createdAt">Fecha de creación</option>
            <option value="fecha_solicitud">Fecha de solicitud</option>
            <option value="fecha_envio">Fecha de envío</option>
            <option value="total">Total</option>
            <option value="nombre">Nombre</option>
          </select>
        </div>

        <div>
          <label className="block text-sm mb-1">Orden</label>
          <select
            name="sortOrder"
            value={filtros.sortOrder}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 text-sm"
          >
            <option value="descending">Descendente</option>
            <option value="ascending">Ascendente</option>
          </select>
        </div>
      </div>
      
      {(filtros.nombre || filtros.pagado) && (
        <button
          onClick={limpiarFiltros}
          className="mt-3 text-sm text-indigo-600 hover:text-indigo-800"
        >
          Limpiar filtros
        </button>
      )}
    </div>
  );
}

export default FiltrosPedidos;
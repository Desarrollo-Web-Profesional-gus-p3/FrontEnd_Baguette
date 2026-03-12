// PedidoList.jsx
function PedidoList({ pedidos, onEditar, onEliminar, pedidoSeleccionadoId }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const formatCurrency = (amount) => {
    return `$${parseFloat(amount).toFixed(2)}`;
  };

  if (pedidos.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No hay pedidos registrados
      </div>
    );
  }

  return (
    <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
      {pedidos.map((pedido) => (
        <div
          key={pedido._id}
          className={`border rounded-lg p-4 cursor-pointer transition ${
            pedidoSeleccionadoId === pedido._id
              ? "bg-indigo-50 border-indigo-500"
              : "hover:bg-gray-50 border-gray-200"
          }`}
          onClick={() => onEditar(pedido)}
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-lg">{pedido.nombre}</h3>
              <p className="text-sm text-gray-600">📞 {pedido.telefono}</p>
              <div className="flex gap-4 mt-2 text-sm">
                <span>📅 Solicitud: {formatDate(pedido.fecha_solicitud)}</span>
                <span>🚚 Envío: {formatDate(pedido.fecha_envio)}</span>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <span className="font-bold text-indigo-600">
                  {formatCurrency(pedido.total)}
                </span>
                <span className="text-sm text-gray-600">
                  Pagado con: {pedido.pagado?.join(", ") || "Ninguno"}
                </span>
              </div>
              {pedido.comentario && (
                <p className="text-sm text-gray-500 mt-2 italic">
                  📝 {pedido.comentario}
                </p>
              )}
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEliminar(pedido._id);
              }}
              className="text-red-500 hover:text-red-700 p-2"
              title="Eliminar pedido"
            >
              ❌
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PedidoList;
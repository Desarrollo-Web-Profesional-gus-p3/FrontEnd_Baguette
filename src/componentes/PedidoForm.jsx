// PedidoForm.jsx (modificado)
import { useState, useEffect } from "react";
import API from "../servicios/api";

function PedidoForm({ pedidoToEdit, onPedidoGuardado, onCancelarEdicion }) {
  const [form, setForm] = useState({
    nombre: "",
    telefono: "",
    fecha_solicitud: "",
    fecha_envio: "",
    total: "",
    pagado: [],
    abono: "",
    comentario: ""
  });

  const [loading, setLoading] = useState(false);

  // Cargar datos del pedido a editar
  useEffect(() => {
    if (pedidoToEdit) {
      setForm({
        nombre: pedidoToEdit.nombre || "",
        telefono: pedidoToEdit.telefono || "",
        fecha_solicitud: pedidoToEdit.fecha_solicitud?.split('T')[0] || "",
        fecha_envio: pedidoToEdit.fecha_envio?.split('T')[0] || "",
        total: pedidoToEdit.total || "",
        pagado: pedidoToEdit.pagado || [],
        abono: pedidoToEdit.abono || "",
        comentario: pedidoToEdit.comentario || ""
      });
    } else {
      limpiarForm();
    }
  }, [pedidoToEdit]);

  const limpiarForm = () => {
    setForm({
      nombre: "",
      telefono: "",
      fecha_solicitud: "",
      fecha_envio: "",
      total: "",
      pagado: [],
      abono: "",
      comentario: ""
    });
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handlePagadoChange = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      setForm({
        ...form,
        pagado: [...form.pagado, value]
      });
    } else {
      setForm({
        ...form,
        pagado: form.pagado.filter((metodo) => metodo !== value)
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      
      if (pedidoToEdit) {
        // Editar pedido existente
        await API.patch(`/pedidos/${pedidoToEdit._id}`, form);
        alert("Pedido actualizado correctamente");
      } else {
        // Crear nuevo pedido
        await API.post("/pedidos", form);
        alert("Pedido guardado correctamente");
      }
      
      limpiarForm();
      onPedidoGuardado();
    } catch (error) {
      alert(`Error al ${pedidoToEdit ? "actualizar" : "guardar"} el pedido`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Nombre */}
      <div>
        <label className="block font-medium mb-1 text-sm">Nombre</label>
        <input
          type="text"
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
          required
          className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Teléfono */}
      <div>
        <label className="block font-medium mb-1 text-sm">Teléfono</label>
        <input
          type="text"
          name="telefono"
          value={form.telefono}
          onChange={handleChange}
          maxLength="10"
          required
          className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Métodos de Pago */}
      <div>
        <label className="block font-medium mb-2 text-sm">
          Métodos de Pago
        </label>
        <div className="grid grid-cols-2 gap-2">
          {["Efectivo", "Transferencia", "Tarjeta", "Depósito"].map((metodo) => (
            <label
              key={metodo}
              className="flex items-center space-x-2 bg-gray-100 p-2 rounded-lg cursor-pointer hover:bg-indigo-100 transition text-sm"
            >
              <input
                type="checkbox"
                value={metodo}
                checked={form.pagado.includes(metodo)}
                onChange={handlePagadoChange}
                className="accent-indigo-600"
              />
              <span>{metodo}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Fechas */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm mb-1">Fecha Solicitud</label>
          <input
            type="date"
            name="fecha_solicitud"
            value={form.fecha_solicitud}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Fecha Envío</label>
          <input
            type="date"
            name="fecha_envio"
            value={form.fecha_envio}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Total y Abono */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm mb-1">Total ($)</label>
          <input
            type="number"
            name="total"
            value={form.total}
            onChange={handleChange}
            required
            step="0.01"
            className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Abono ($)</label>
          <input
            type="number"
            name="abono"
            value={form.abono}
            onChange={handleChange}
            step="0.01"
            className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Comentario */}
      <div>
        <label className="block text-sm mb-1">Comentario</label>
        <textarea
          name="comentario"
          value={form.comentario}
          onChange={handleChange}
          rows="2"
          className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Botones */}
      <div className="flex gap-3">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg shadow-md transition duration-300 text-sm"
        >
          {loading ? "Guardando..." : (pedidoToEdit ? "Actualizar Pedido" : "Guardar Pedido")}
        </button>
        
        {pedidoToEdit && (
          <button
            type="button"
            onClick={onCancelarEdicion}
            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-lg transition text-sm"
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}

export default PedidoForm;
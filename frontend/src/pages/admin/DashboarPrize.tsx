import React from "react";
import { Card } from "../../components/admin/Card";
import { useEffect, useState } from "react";
import axios from "axios";

export default function CreatePrize() {
  const apiUrl = import.meta.env.VITE_URL;
  const [userCount, setUserCount] = useState<number | null>(null);
  const [predictionCountPending, setPredictionCountPending] = useState<
    number | null
  >(null);
  const [newPrize, setNewPrize] = useState({
    condition: "",
    image: "",
    description: "",
    type: "",
  });

  const fetchCreatePrize = async (prize: any) => {
    try {
      const url = `${apiUrl}/api/prize/createPrize`;
      const response = await axios.post(url, prize);
      return response;
    } catch (error) {
      console.error("Error en la búsqueda:", error);
    }
  };
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setNewPrize((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Aquí iría la lógica para enviar los datos a la API
    fetchCreatePrize(newPrize);
    console.log("Premio creado:", newPrize);
    alert("Premio creado exitosamente"); // Reemplazamos el toast por un alert simple
    // Reiniciar el formulario
    setNewPrize({
      condition: "",
      image: "",
      description: "",
      type: "",
    });
  };
  const handleClear = () => {
    // Reiniciar el formulario
    setNewPrize({
      condition: "",
      image: "",
      description: "",
      type: "",
    });
  };
  return (
    <div className="bg-[#7676801F] text-black  rounded-lg p-6">
      <h2 className="text-2xl font-bold text-white mb-6">Crear Nuevo Objeto</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="condition" className="block text-white mb-1">
            Condición
          </label>
          <input
            id="condition"
            name="condition"
            value={newPrize.condition}
            onChange={handleInputChange}
            className="w-full px-3 py-2 bg-white/20 text-white placeholder-white/60 rounded-md"
            placeholder="Ingrese la condición"
            required
          />
        </div>
        <div>
          <label htmlFor="image" className="block text-white mb-1">
            URL de la Imagen
          </label>
          <input
            id="image"
            name="image"
            value={newPrize.image}
            onChange={handleInputChange}
            className="w-full px-3 py-2 bg-white/20 text-white placeholder-white/60 rounded-md"
            placeholder="https://ejemplo.com/imagen.jpg"
            required
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-white mb-1">
            Descripción
          </label>
          <textarea
            id="description"
            name="description"
            value={newPrize.description}
            onChange={handleInputChange}
            className="w-full px-3 py-2 bg-white/20 text-white placeholder-white/60 rounded-md"
            placeholder="Describa el objeto"
            required
          />
        </div>
        <div>
          <label htmlFor="type" className="block text-white mb-1">
            Division
          </label>
          <select
            id="type"
            name="type"
            value={newPrize.type}
            onChange={handleInputChange}
            className="w-full px-3 py-2 bg-white/20 text-black rounded-md"
            required
          >
            <option value="">Seleccione una Division</option>
            <option value="1">Division 1</option>
            <option value="2">Division 2</option>
            <option value="3">Ambas</option>
          </select>
        </div>
        <div className="flex flex-shrink">
        <button
          onClick={handleClear}
          type="button"
          className="w-full bg-white border-purple border-[2px] text-purple px-4 py-2 rounded-xl font-semibold hover:bg-yellow-200 transition duration-300"
        >
          Limpiar el formulario
        </button>
        <button
          type="submit"
          className="w-full bg-white border-purple border-[2px] text-purple px-4 py-2 rounded-xl font-semibold hover:bg-yellow-200 transition duration-300"
        >
          Crear Objeto
        </button>
        </div>
      </form>
    </div>
  );
}

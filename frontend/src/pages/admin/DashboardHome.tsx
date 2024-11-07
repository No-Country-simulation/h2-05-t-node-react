import React from "react";
import { Card } from "../../components/admin/Card";
import { useEffect, useState } from "react";
import axios from "axios";


export default function DashboardHome() {
  const apiUrl = import.meta.env.VITE_URL;
  const [userCount, setUserCount] = useState<number | null>(null);
  const [predictionCountPending, setPredictionCountPending] = useState<number | null>(null);


  const fetchUserCount = async () => {
    try {
      const url = `${apiUrl}/api/users/count`;
      const response = await axios.get(url);
      //console.log(response.data.data);
      setUserCount(response.data.data); // Asume que el conteo está en `response.data.data`
    } catch (error) {
      console.error("Error en la búsqueda:", error);
    }
  };
  const fetchPredictionCountPending = async () => {
    try {
      const url = `${apiUrl}/api/prediction/count?status=pending`;
      const response = await axios.get(url);
      //console.log(response.data.data);
      setPredictionCountPending(response.data.data); // Asume que el conteo está en `response.data.data`
    } catch (error) {
      console.error("Error en la búsqueda:", error);
    }
  };
  const fetchPredictionCountCompleted = async () => {
    try {
      const url = `${apiUrl}/api/prediction/count?status=completed`;
      const response = await axios.get(url);
      //console.log(response.data.data);
      setPredictionCountPending(response.data.data); // Asume que el conteo está en `response.data.data`
    } catch (error) {
      console.error("Error en la búsqueda:", error);
    }
  };

  useEffect(() => {
    fetchPredictionCountPending();
    fetchUserCount();
  }, []);

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Card
      
        title="Usuarios Totales"
        description="Usuarios registrados en el sistema"
        value={userCount !== null ? userCount.toString() : "Carga..."}
      />
      <Card title="Predicciones" description="Pendientes" value={predictionCountPending !== null ? predictionCountPending.toString() : "Carga..."} />
      <Card title="Token Activos" description="Token entregados" value="0" />
    </div>
  );
}

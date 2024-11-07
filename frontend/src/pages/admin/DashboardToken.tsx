import React, { useState } from "react";
import {
  Search,
  Edit2,
  Save,
  Crown,
  FlameKindling,
  ShieldQuestion,
} from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Tipo para los resultados de búsqueda
type SearchResult = {
  apiId: number;
  name: string;
  photo: string;
  age: number;
};

// Tipo para los datos detallados del proyecto
type PlayerDetails = {
  apiId: string;
  division?: number;
  total_tokens?: number;
  assigned_tokens?: number;
  burning_percentage?: number;
  nationality?: string;
  name: string;
  photo?: string;
  age: number;
  goals?: number;
  assists_goals?: number;
  position?: string;
  games?: number;
  minutes_played?: number;
  cards_yellow?: number;
  cards_red?: number;
  achievements?: Array<any>;
};

type Archievement = {
  league: string;
  country: string;
  season: string;
  place: string;
  porcentage?: number;
};

export default function TokenCreation() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [burning, setBurning] = useState(0);
  const [divition, setDivition] = useState(0);
  const [seasons, setSeasons] = useState(0);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [selectedPlayer, setSelectedPlayer] = useState<PlayerDetails | null>(
    null
  );
  const [isSuccess, setIsSuccess] = useState(false);

  type ArchivementsType = { msg: string } | Archievement[];

  const [archivements, setArchivements] = useState<ArchivementsType | null>(
    null
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const apiUrl = import.meta.env.VITE_URL;

  const handleInputChangeArchievement = (index: number, value: number) => {
    if (Array.isArray(archivements)) {
      const updatedArchivements = [...archivements];
      updatedArchivements[index] = {
        ...updatedArchivements[index],
        porcentage: value,
      };
      setArchivements(updatedArchivements);
    }
  };

  // Función para eliminar un logro del listado
  const handleRemoveAchievement = (index: number) => {
    if (Array.isArray(archivements)) {
      const updatedArchivements = archivements.filter((_, i) => i !== index);
      setArchivements(updatedArchivements);
    }
  };

  const handleSearch = async () => {
    try {
      const url = `${apiUrl}/api_player_by_name?name=${searchQuery}`;
      console.log(url);
      const response = await axios.get(url);
      console.log(response.data.data);

      setSearchResults(response.data.data);
    } catch (error) {
      console.error("Error en la búsqueda:", error);
    }
  };

  const handleSelectPlayer = async (id: number) => {
    try {
      // Consulta las temporadas
      const url = `${apiUrl}/api_player_season_by_id?id=${id}`;
      const response = await axios.get(url);
      //console.log(response.data.data, id);
      const seasons = response.data.data;
      setSeasons(seasons.length);
      // Consultas los datos totales de todas las temporadas
      const url2 = `${apiUrl}/api_player_by_id_total_season?id=${id}&season=${JSON.stringify(
        seasons
      )}`;
      console.log(url2);
      const response2 = await axios.get(url2);
      const details = response2.data.data;
      console.log(details);

      setSelectedPlayer(details);
      setIsEditing(false);
    } catch (error) {
      console.error("Error en la búsqueda:", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSelectedPlayer((prev) => (prev ? { ...prev, [name]: value } : null));
  };

  const handleArchivements = async () => {
    try {
      const url = `${apiUrl}/api_player_trophies_by_id?id=${selectedPlayer?.apiId}`;
      const response = await axios.get(url);
      console.log(response.data.data, selectedPlayer?.apiId);
      const archivements = response.data.data;
      setArchivements(archivements);
    } catch (error) {
      console.error("Error en la búsqueda:", error);
    }
  };

  const handleBurning = () => {
    if (!selectedPlayer?.goals) {
      return "no hay datos para calcular";
    }
    if (!selectedPlayer?.assists_goals) {
      return "no hay datos para calcular";
    }
    const burn =
      selectedPlayer?.goals * 0.5 + selectedPlayer?.assists_goals * 0.5;
    setBurning(burn);
  };
  const handleDivition = () => {
    setIsModalOpen(true);
  };

  const selectDivision = (value) => {
    setDivition(value);
    setIsModalOpen(false);
  };
  const handleSave = async () => {
    try {
      const trophies = archivements;
      const url = `${apiUrl}/api/token-info/create_Token_Info`;
      const player = {
        apiId: selectedPlayer?.apiId,
        division: divition,
        burning_percentage: ((burning + totalQuema) / seasons).toPrecision(4),
        nationality: selectedPlayer?.nationality,
        name: selectedPlayer?.name,
        photo: selectedPlayer?.photo,
        age: selectedPlayer?.age,
        goals: selectedPlayer?.goals,
        assists_goals: selectedPlayer?.assists_goals,
        position: selectedPlayer?.position,
        games: selectedPlayer?.games,
        minutes_played: selectedPlayer?.minutes_played,
        cards_yellow: selectedPlayer?.cards_yellow,
        cards_red: selectedPlayer?.cards_red,
      };
      const response = await axios.post(url, { player, trophies });
      //console.log(response.data);
      // Mostrar mensaje de éxito y redirigir después de un tiempo
      setIsSuccess(true);
      setTimeout(() => {
        navigate("/dashboardAdmin");
      }, 2000); // 2 segundos para mostrar el mensaje antes de navegar
    } catch (error) {
      console.error("Error en la búsqueda:", error);
    }
  };
  // Calcula el total de "Quema"
  const totalQuema = Array.isArray(archivements)
    ? archivements.reduce(
        (acc: any, item: any) => acc + (item.porcentage || 0),
        0
      )
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 p-6">
      <div className="max-w-4xl mx-auto bg-white backdrop-blur-lg rounded-xl p-6">
        <h1 className="text-3xl font-bold text-blue mb-6">Creación de Token</h1>
        {isSuccess && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-4 shadow-lg">
              <p>La información fue guardada exitosamente.</p>
            </div>
          </div>
        )}

        {/* Búsqueda */}
        <div className="flex mb-6">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por nombre..."
            className="flex-grow px-4 py-2 rounded-l-md bg-[#7676801F] text-black placeholder-black/60"
          />
          <button
            onClick={handleSearch}
            className="bg-blue text-white px-4 py-2 rounded-r-md hover:bg-blue-700 transition duration-300"
          >
            Buscar
          </button>
        </div>

        {/* Resultados de búsqueda */}
        {!selectedPlayer && searchResults.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-black mb-2">
              Resultados:
            </h2>
            <div className="grid grid-cols-4 gap-4">
              {searchResults.map((result) => (
                <button
                  key={result.apiId}
                  onClick={() => handleSelectPlayer(result.apiId)}
                  className="w-48 h-52 flex flex-col items-center justify-center px-4 py-2 bg-[#7676801F] rounded-md text-black/80 hover:bg-violet-500 transition duration-300"
                >
                  <img
                    src={result.photo}
                    alt={`Foto de ${result.name}`}
                    className="mt-2 rounded-md w-32 h-32 object-cover"
                  />
                  {result.name} ({result.age})
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Detalles del proyecto seleccionado */}
        {selectedPlayer && (
          <div className="bg-[#F3F4F5] grid grid-cols-6 gap-4 rounded-xl p-6">
            <div className="col-start-1 col-end-3 justify-start items-center mb-4">
              <img
                src={selectedPlayer.photo}
                alt={`Foto de ${selectedPlayer.name}`}
                className=" rounded-md w-32 h-32 object-cover"
              />
            </div>
            <div className="col-start-3 col-end-6 ">
              <span className="font-semibold mb-4">Datos del Jugador</span>
              <div key={selectedPlayer.apiId} className="flex flex-shrink">
                <label className="text-black/80 text-sm mt-2 mb-1">
                  Nombre:{" "}
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="nombre"
                    value={selectedPlayer.name as string}
                    onChange={handleInputChange}
                    className="bg-black/10 text-black px-2 py-1 rounded"
                  />
                ) : (
                  <p className="ml-2 mt-2 *:text-black">
                    {selectedPlayer.name}
                  </p>
                )}
              </div>
              <div key={selectedPlayer.apiId + 1} className="flex flex-shrink">
                <label className="text-black/80 text-sm mb-1">
                  Nacionalidad:
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="nombre"
                    value={selectedPlayer.nationality as string}
                    onChange={handleInputChange}
                    className="bg-black/10 text-black px-2 py-1 rounded"
                  />
                ) : (
                  <p className="ml-2 text-black">
                    {selectedPlayer.nationality}
                  </p>
                )}
              </div>
              <div key={selectedPlayer.apiId + 2} className="flex flex-shrink">
                <label className="text-black/80 text-sm mb-1">Edad:</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="nombre"
                    value={selectedPlayer.age}
                    onChange={handleInputChange}
                    className="bg-black/10 text-black font-semibold px-2 py-1 rounded"
                  />
                ) : (
                  <p className="ml-2 text-black">{selectedPlayer.age}</p>
                )}
              </div>
              <div key={selectedPlayer.apiId + 3} className="flex flex-shrink">
                <label className="text-black/80 text-sm mb-1">Posicion:</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="nombre"
                    value={selectedPlayer.position as string}
                    onChange={handleInputChange}
                    className="bg-black/10 text-black font-semibold px-2 py-1 rounded"
                  />
                ) : (
                  <p className="ml-2 text-black">{selectedPlayer.position}</p>
                )}
              </div>
            </div>

            <div className="col-start-1 col-end-6 flex flex-shrink-0 gap-4 ">
              <div
                key={selectedPlayer.apiId + 4}
                className="flex flex-col w-17 h-16 bg-white shadow-2xl text-white px-4 py-2 rounded-md"
              >
                <label className="flex justify-center text-black/80 text-sm">
                  Goles
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="nombre"
                    value={selectedPlayer.goals}
                    onChange={handleInputChange}
                    className="bg-black/10 w-10 mr-1 text-black font-semibold items-center py-1 rounded"
                  />
                ) : (
                  <p className="flex justify-center text-black font-semibold">
                    {selectedPlayer.goals}
                  </p>
                )}
              </div>
              <div
                key={selectedPlayer.apiId + 5}
                className="flex flex-col w-17 h-16 bg-white shadow-2xl text-white px-4 py-2 rounded-md"
              >
                <label className="flex justify-center text-black/80 text-sm">
                  Partidos
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="nombre"
                    value={selectedPlayer.games}
                    onChange={handleInputChange}
                    className="bg-black/10 w-10 mr-1 text-black font-semibold items-center  px-2 py-1 rounded"
                  />
                ) : (
                  <p className="flex justify-center text-black font-semibold">
                    {selectedPlayer.games}
                  </p>
                )}
              </div>
              <div
                key={selectedPlayer.apiId + 6}
                className="flex flex-col w-17 h-16 bg-white shadow-2xl text-white px-4 py-2 rounded-md"
              >
                <label className="flex justify-center text-black/80 text-sm items-center ">
                  Minutos
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="nombre"
                    value={selectedPlayer.minutes_played}
                    onChange={handleInputChange}
                    className="bg-black/10 w-16 mr-2 text-black px-2 font-semibold py-1 items-center  rounded"
                  />
                ) : (
                  <p className="flex justify-center text-black font-semibold">
                    {selectedPlayer.minutes_played}
                  </p>
                )}
              </div>
              <div
                key={selectedPlayer.apiId + 7}
                className="flex flex-col w-17 h-16 bg-white shadow-2xl text-white px-4 py-2 rounded-md"
              >
                <label className="flex justify-center text-black/80 text-sm">
                  Asistencias
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="nombre"
                    value={selectedPlayer.assists_goals}
                    onChange={handleInputChange}
                    className="bg-black/10 w-10 mr-1 text-black font-semibold place-items-center px-2 py-1 rounded"
                  />
                ) : (
                  <p className="flex justify-center text-black font-semibold">
                    {selectedPlayer.assists_goals}
                  </p>
                )}
              </div>
              <div
                key={selectedPlayer.apiId + 18}
                className="flex flex-col w-17 h-16 bg-white shadow-2xl text-white px-4 py-2 rounded-md"
              >
                <label className="flex justify-center text-black/80 text-sm">
                  Rojas
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="nombre"
                    value={selectedPlayer.cards_red}
                    onChange={handleInputChange}
                    className="  bg-black/10 w-10 mr-1  place-items-center font-semibold text-black px-2  py-1 rounded"
                  />
                ) : (
                  <p className="flex justify-center text-black font-semibold">
                    {selectedPlayer.cards_red}
                  </p>
                )}
              </div>
              <div
                key={selectedPlayer.apiId + 9}
                className="flex flex-col w-17 h-16 bg-white shadow-2xl text-white px-4 py-2 rounded-md"
              >
                <label className="flex justify-center text-black/80 text-sm">
                  Amarillas
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="nombre"
                    value={selectedPlayer.cards_yellow}
                    onChange={handleInputChange}
                    className="bg-black/10 w-10 mr-1 font-semibold text-black px-2 py-1 rounded"
                  />
                ) : (
                  <p className="flex justify-center text-black font-semibold">
                    {selectedPlayer.cards_yellow}
                  </p>
                )}
              </div>
            </div>
            <div className="col-start-1 col-end-6 flex flex-shrink gap-2">
              {Array.isArray(archivements) ? (
                <ul>
                  {archivements.map((item, index) => (
                    <li
                      key={index}
                      className="flex items-center space-y-4 space-x-12"
                    >
                      <div className="flex flex-shrink">
                        <p className="flex flex-col w-[130px] ">
                          <strong>League:</strong> {item.league}
                        </p>
                        <p className="flex flex-col w-[130px]">
                          <strong>Country:</strong> {item.country}
                        </p>
                        <p className="flex flex-col w-[130px]">
                          <strong>Season:</strong> {item.season}
                        </p>
                        <p className="flex flex-col w-[130px]">
                          <strong>Place:</strong> {item.place}
                        </p>
                      </div>
                      <p className="flex flex-col w-[130px]">
                        <strong>Quema:</strong>
                        <input
                          type="number"
                          placeholder="Ingresa un numero"
                          value={item.porcentage ?? ""}
                          onChange={(e) =>
                            handleInputChangeArchievement(
                              index,
                              Number(e.target.value)
                            )
                          }
                          className="border px-2 py-1"
                        />
                      </p>
                      <button
                        onClick={() => handleRemoveAchievement(index)}
                        className="text-red-500 font-bold"
                      >
                        &times;
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                archivements?.msg && <p>{archivements.msg}</p>
              )}
            </div>

            {burning != 0 && (
              <div className="col-start-1 col-end-6 flex flex-shrink gap-2">
                <label className="flex justify-center font-bold  text-black ">
                Estadisticas: 
                </label>
                <p className="flex justify-center text-black font-semibold">
                  {burning}%,
                </p>
                <label className="flex justify-center font-bold  text-black ">
                Logros:
                </label>
                <p className="flex justify-center text-black font-semibold">
                    {totalQuema}%
                </p>
                <label className="flex justify-center font-bold  text-black ">
                Temporadas :
                </label>
                <p className="flex justify-center text-black font-semibold">
                  {seasons}
                </p>
                <label className="flex justify-center font-bold  text-black ">
                  Calculo de quema:
                </label>
                <p className="flex justify-center text-red-700 font-bold">
                  {((burning + totalQuema) / seasons).toPrecision(4)}%
                </p>
              </div>
            )}
            {/* Modal */}
            {isModalOpen && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <h2 className="text-xl font-semibold mb-4">
                    Elige una División
                  </h2>
                  <div className="space-y-2">
                    <button
                      onClick={() => selectDivision(1)}
                      className="w-full px-4 py-2 bg-[#7676801F] shadow-xl text-black rounded-md hover:bg-violet-400"
                    >
                      División oro
                    </button>
                    <button
                      onClick={() => selectDivision(2)}
                      className="w-full px-4 py-2 bg-[#7676801F] shadow-xl text-black rounded-md hover:bg-violet-400"
                    >
                      División plata
                    </button>
                    <button
                      onClick={() => selectDivision(3)}
                      className="w-full px-4 py-2 bg-[#7676801F] shadow-xl text-black rounded-md hover:bg-violet-400"
                    >
                      División bronce
                    </button>
                  </div>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="mt-4 text-blue-500 underline"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            )}
            {/* Selected Division */}
            {divition != 0 && (
              <p className="text-black  font-bold col-start-1 col-end-6 flex flex-shrink mt-4">
                División seleccionada: {divition}
              </p>
            )}
            <div className="col-start-1 col-end-6 flex flex-shrink gap-2">
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="mt-4 bg-black text-white px-4 py-2 rounded-md hover:bg-slate-600 transition duration-300 flex items-center"
              >
                <Edit2 className="w-6 h-6 mr-2" />
                Editar
              </button>
              <button
                onClick={handleArchivements}
                className="mt-4 bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-800 transition duration-300 flex items-center"
              >
                <Crown className="w-7 h-7 mr-2" />
                Consultar Logros
              </button>
              <button
                onClick={handleBurning}
                className="mt-4 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-800 transition duration-300 flex items-center"
              >
                <FlameKindling className="w-6 h-6 mr-2" />
                Quema
              </button>
              <button
                onClick={handleDivition}
                className="mt-4 y-4 bg-cyan-600 text-white px-4 py-2 rounded-md hover:bg-cyan-800 transition duration-300 flex items-center"
              >
                <ShieldQuestion className="w-6 h-6 mr-2" />
                Division
              </button>

              <button
                onClick={handleSave}
                className="mt-4 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-900 transition duration-300 flex items-center"
              >
                <Save className="w-7 h-7 mr-2" />
                Crear Token
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

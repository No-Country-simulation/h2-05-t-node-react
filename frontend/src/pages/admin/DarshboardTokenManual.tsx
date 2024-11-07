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

// Tipo para los datos detallados del proyecto
type PlayerDetails = {
  apiId?: string;
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

export default function TokenCreationManual() {
  const navigate = useNavigate();

  const [divition, setDivition] = useState(0);
  const [selectedPlayer, setSelectedPlayer] = useState<PlayerDetails>({
    division: 0,
    burning_percentage: 0,
    nationality: "",
    name: "",
    photo: "",
    age: 0,
    goals: 0,
    assists_goals: 0,
    position: "",
    games: 0,
    minutes_played: 0,
    cards_yellow: 0,
    cards_red: 0,
  });
  type ArchivementsType = Archievement[];

  const [archivements, setArchivements] = useState<ArchivementsType>();
  const [isSuccess, setIsSuccess] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(true);

  const apiUrl = import.meta.env.VITE_URL;
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
  
    if (name in selectedPlayer) {
      setSelectedPlayer((prev) => ({
        ...prev,
        [name]: name === "age" ? parseInt(value) : value,
      }) as PlayerDetails);
    }
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
      const trophies = archivements || [];
      console.log(selectedPlayer);

      const playerData = {
        ...selectedPlayer,
        division: divition,
      };
      console.log(playerData);
      const response = await axios.post(
        `${apiUrl}/api/token-info/create_Token_Info`,
        { player: playerData, trophies }
      );
      setIsSuccess(true);
      setTimeout(() => navigate("/dashboardAdmin"), 2000);
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

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
        <div className="flex flex-shrink">
          <label className="text-black/80 w-[100px] text-sm mb-1">
            Nombre:
          </label>
          <input
            type="text"
            name="name"
            placeholder="...."
            onChange={handleInputChange}
            className="bg-black/10 text-black w-[270px] px-2 py-1 rounded ml-2"
          />
        </div>
        <div className="flex flex-shrink">
          <label className="text-black/80 w-[100px] text-sm mb-1">Foto:</label>
          <input
            type="text"
            name="photo"
            placeholder="url.."
            onChange={handleInputChange}
            className="bg-black/10 text-black w-[270px] px-2 py-1 rounded ml-2"
          />
        </div>

        <div className="flex flex-shrink">
          <label className="text-black/80 w-[100px] text-sm mb-1">
            Nacionalidad:
          </label>
          <input
            type="text"
            name="nationality"
            placeholder="...."
            onChange={handleInputChange}
            className="bg-black/10 text-black w-[270px] px-2 py-1 rounded ml-2"
          />
        </div>

        <div className="flex flex-shrink">
          <label className="text-black/80 w-[100px] text-sm mb-1">Edad:</label>
          <input
            type="text"
            name="age"
            placeholder="...."
            onChange={handleInputChange}
            className="bg-black/10 text-black w-[270px] font-semibold px-2 py-1 rounded ml-2"
          />
        </div>

        <div className="flex flex-shrink">
          <label className="text-black/80 w-[100px] text-sm mb-1">
            Posición:
          </label>
          <input
            type="text"
            name="position"
            placeholder="...."
            onChange={handleInputChange}
            className="bg-black/10 text-black w-[270px] font-semibold px-2 py-1 rounded ml-2"
          />
        </div>

        <div className="col-start-1 col-end-6 flex gap-4 mt-4">
          <div className="flex flex-col w-17 h-16 bg-white shadow-2xl text-white px-4 py-2 rounded-md">
            <label className="flex justify-center text-black/80 text-sm">
              Goles
            </label>
            <input
              type="text"
              name="goals"
              placeholder="0.."
              onChange={handleInputChange}
              className="bg-black/10 w-10 text-black  font-semibold py-1 rounded text-center"
            />
          </div>
          <div className="flex flex-col w-17 h-16 bg-white shadow-2xl text-white px-4 py-2 rounded-md">
            <label className="flex justify-center text-black/80 text-sm">
              Partidos
            </label>
            <input
              type="text"
              name="games"
              placeholder="0.."
              onChange={handleInputChange}
              className="bg-black/10 w-10 text-black font-semibold py-1 rounded text-center"
            />
          </div>
          <div className="flex flex-col w-17 h-16 bg-white shadow-2xl text-white px-4 py-2 rounded-md">
            <label className="flex justify-center text-black/80 text-sm">
              Minutos
            </label>
            <input
              type="text"
              name="minutes_played"
              placeholder="0.."
              onChange={handleInputChange}
              className="bg-black/10 w-16 text-black font-semibold py-1 rounded text-center"
            />
          </div>
          <div className="flex flex-col w-17 h-16 bg-white shadow-2xl text-white px-4 py-2 rounded-md">
            <label className="flex justify-center text-black/80 text-sm">
              Asistencias
            </label>
            <input
              type="text"
              name="assists_goals"
              placeholder="0.."
              onChange={handleInputChange}
              className="bg-black/10 w-10 text-black font-semibold py-1 rounded text-center"
            />
          </div>
          <div className="flex flex-col w-17 h-16 bg-white shadow-2xl text-white px-4 py-2 rounded-md">
            <label className="flex justify-center text-black/80 text-sm">
              Rojas
            </label>
            <input
              type="text"
              name="cards_red"
              placeholder="0.."
              onChange={handleInputChange}
              className="bg-black/10 w-10 text-black font-semibold py-1 rounded text-center"
            />
          </div>
          <div className="flex flex-col w-17 h-16 bg-white shadow-2xl text-white px-4 py-2 rounded-md">
            <label className="flex  justify-center text-black/80 text-sm">
              Amarillas
            </label>
            <input
              type="text"
              name="cards_yellow"
              placeholder="0.."
              onChange={handleInputChange}
              className="bg-black/10 w-10 text-black font-semibold py-1 rounded text-center"
            />
          </div>
          <div className="flex flex-col w-17 h-16 bg-white shadow-2xl text-white px-4 py-2 rounded-md">
            <label className="flex  justify-center text-black/80 text-sm">
              Quema
            </label>
            <input
              type="text"
              name="burning_percentage"
              placeholder="0.."
              onChange={handleInputChange}
              className="bg-black/10 w-10 text-black font-semibold py-1 rounded text-center"
            />
          </div>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold mb-4">Elige una División</h2>
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
            Aceptar Cambios
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
    </div>
  );
}

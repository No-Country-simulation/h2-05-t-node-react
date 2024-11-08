import Container from "../../../components/common/Container"
import PlayerDataItem from "../../../components/scoutPlayers/PlayerDataItem"

import YellowCardIcon from "../../../assets/icons/YellowCardIcon"
import RedCardIcon from "../../../assets/icons/RedCardIcon"
import { useEffect, useState } from "react"

const PlayerDetails = () => {
  const [playerData, setPlayerData] = useState(null);

  useEffect(() => {
    const storedPlayerData = localStorage.getItem("playerData");
    if (storedPlayerData) {
      setPlayerData(JSON.parse(storedPlayerData))
    }
  }, [])

  // Solo logros con 1er puesto
  const filteredAchievements = Array.isArray(playerData?.achievements)
    ? playerData.achievements
      .filter(achievement => achievement?.place === "Winner")
      .sort((a, b) => {
        const seasonA = parseInt(a.season.split('/')[0], 10); // Extraer el año de la temporada
        const seasonB = parseInt(b.season.split('/')[0], 10); // Extraer el año de la temporada
        return seasonB - seasonA; // Ordenar de más reciente a más antiguo
      })
    : [];

  console.log(filteredAchievements)

  return (
    <Container>
      <div className="flex flex-col gap-3">
        <h2 className="font-medium text-black">Datos del jugador</h2>
        <section className="shadow-soft rounded-lg">
          <PlayerDataItem playerData={playerData || {}} />
        </section>

        <div className="flex justify-between mt-3">
          <h2 className="font-medium text-black">Estadísticas</h2>
          {/* <span className="text-red-500">Filtrar</span> */}
        </div>
        <section>
          <div className="flex justify-between mt-2">
            <div className="w-[86px] h-[74px] flex justify-center items-center flex-col shadow-soft rounded-lg">
              <p className="text-tertiary">Goles</p>
              <p className="text-regular-18 font-medium">{playerData?.goals}</p>
            </div>
            <div className="w-[86px] h-[74px] flex justify-center items-center flex-col shadow-soft rounded-lg">
              <p className="text-tertiary">Partidos</p>
              <p className="text-regular-18 font-medium">{playerData?.games}</p>
            </div>
            <div className="w-[86px] h-[74px] flex justify-center items-center flex-col shadow-soft rounded-lg">
              <p className="text-tertiary">Minutos</p>
              <p className="text-regular-18 font-medium">{playerData?.minutes_played}</p>
            </div>
            <div className="w-[86px] h-[74px] flex justify-center items-center flex-col shadow-soft rounded-lg">
              <p className="text-tertiary">Asistencia</p>
              <p className="text-regular-18 font-medium">{playerData?.assists_goals}</p>
            </div>
          </div>

          <div className="shadow-soft rounded-lg mt-4">
            <div className="h-[36px] flex justify-between items-center px-3">
              <div className="flex gap-3">
                <YellowCardIcon />
                <p className="text-regular-14">Tarjetas amarillas</p>
              </div>
              <p>{playerData?.cards_yellow}</p>
            </div>

            <div className="h-[36px] flex justify-between items-center px-3 border-t border-t-primary">
              <div className="flex gap-3">
                <RedCardIcon />
                <p className="text-regular-14">Tarjetas rojas</p>
              </div>
              <p>{playerData?.cards_red}</p>
            </div>
          </div>
        </section>

        <div className="flex justify-between mt-3">
          <h2 className="font-medium text-black">Logros</h2>
          {/* <span className="text-red-500">Filtrar</span> */}
        </div>
        <div className="shadow-soft rounded-lg my-4">
          {
            filteredAchievements?.map((item, index) => (
              <div key={index} className="h-[36px] flex justify-between items-center px-5 border-t-primary border-t">
                <p className="text-regular-14">{item?.league}</p>
                <p className="text-tertiary text-regular">{item?.season}</p>
              </div>
            ))
          }
        </div>
      </div>
    </Container>
  )
}
export default PlayerDetails
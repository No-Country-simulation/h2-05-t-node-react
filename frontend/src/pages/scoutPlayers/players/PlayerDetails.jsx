import Container from "../../../components/common/Container"
import PlayerDataItem from "../../../components/scoutPlayers/PlayerDataItem"
import WhistleIcon from "../../../assets/icons/WhistleIcon"
import StadiumIcon from "../../../assets/icons/StadiumIcon"
import CalendarIcon from "../../../assets/icons/CalendarIcon"
import YellowCardIcon from "../../../assets/icons/YellowCardIcon"
import RedCardIcon from "../../../assets/icons/RedCardIcon"

const playerInfoList = [
  { id: 1, imgCountry: 'flag', titleData: 'Nacionalidad', textData: 'Argentina' },
  { id: 2, iconData: CalendarIcon, titleData: 'Edad', textData: 33 },
  { id: 3, iconData: StadiumIcon, titleData: 'Posición', textData: 'Delantero' },
  { id: 4, iconData: WhistleIcon, titleData: 'Posición', textData: 'Delantero' },
]

const PlayerDetails = () => {
  return (
    <Container>
      <div className="flex flex-col gap-3">
        <h2 className="font-medium text-black">Datos del jugador</h2>
        <section className="shadow-soft rounded-lg">
          {
            playerInfoList.map(item => (
              <PlayerDataItem key={item.id} item={item} />
            ))
          }
        </section>

        <div className="flex justify-between mt-3">
          <h2 className="font-medium text-black">Estadísticas</h2>
          <span className="text-red-500">Filtrar</span>
        </div>
        <section>
          <div className="flex justify-between mt-2">
            <div className="w-[86px] h-[74px] flex justify-center items-center flex-col shadow-soft rounded-lg">
              <p className="text-tertiary">Goles</p>
              <p className="text-regular-18 font-medium">672</p>
            </div>
            <div className="w-[86px] h-[74px] flex justify-center items-center flex-col shadow-soft rounded-lg">
              <p className="text-tertiary">Partidos</p>
              <p className="text-regular-18 font-medium">779</p>
            </div>
            <div className="w-[86px] h-[74px] flex justify-center items-center flex-col shadow-soft rounded-lg">
              <p className="text-tertiary">Minutos</p>
              <p className="text-regular-18 font-medium">672</p>
            </div>
            <div className="w-[86px] h-[74px] flex justify-center items-center flex-col shadow-soft rounded-lg">
              <p className="text-tertiary">Asistencia</p>
              <p className="text-regular-18 font-medium">672</p>
            </div>
          </div>

          <div className="shadow-soft rounded-lg mt-4">
            <div className="h-[36px] flex justify-between items-center px-3">
              <div className="flex gap-3">
                <YellowCardIcon />
                <p className="text-regular-14">Tarjetas amarillas</p>
              </div>
              <p>12</p>
            </div>

            <div className="h-[36px] flex justify-between items-center px-3 border-t border-t-primary">
              <div className="flex gap-3">
                <RedCardIcon />
                <p className="text-regular-14">Tarjetas rojas</p>
              </div>
              <p>12</p>
            </div>
          </div>
        </section>

        <div className="flex justify-between mt-3">
          <h2 className="font-medium text-black">Logros</h2>
          <span className="text-red-500">Filtrar</span>
        </div>
        <div className="shadow-soft rounded-lg my-4">
          <div className="h-[36px] flex justify-between items-center px-5">
            <p className="text-regular-14">Balón de oro</p>
            <p className="text-tertiary text-regular">2019</p>
          </div>

          <div className="h-[36px] flex justify-between items-center px-5 border-t border-t-primary">
            <p className="text-regular-14">Copa america</p>
            <p className="text-tertiary text-regular">2019</p>
          </div>
        </div>
      </div>
    </Container>
  )
}
export default PlayerDetails
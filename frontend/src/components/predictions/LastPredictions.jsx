import TickIcon from "../../assets/icons/TickIcon"
import BarcelonaImg from '../../assets/img/barcelona.png'
import RealMadridImg from '../../assets/img/realMadrid.png'
import LaLigaImg from '../../assets/img/LaLiga.png'
import Container from "../common/Container"

const LastPredictions = () => {
    return (
        <Container>
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-regular-18 text-blue font-semibold">Pasadas</h1>
            </div>

            <section>
                <div className="flex justify-between items-center px-5 rounded-xl shadow-soft py-2 text-regular">
                    <h2>Predicción</h2>
                    <h2>Partido</h2>
                    <h2>Puntos</h2>
                </div>

                <div className="flex flex-col mt-2 justify-center rounded-xl shadow-soft">
                    <div className="flex py-1.5 gap-2 px-5">
                        <img className="w-18px h-[18px]" src={LaLigaImg} alt="" />
                        <span className="capitalize text-regular text-secondary">Liga Española</span>
                    </div>

                    <div className=" border-t-gray-400 border-t">
                        <div className="flex justify-between items-center py-3 px-5">
                            <div className="flex flex-col text-regular-14">
                                <span className="text-secondary">Resultado final</span>
                                <span className="capitalize">Real Madrid</span>
                            </div>

                            <div className="flex flex-col items-start gap-1">
                                <div className='flex gap-2'>
                                    {/* <img className='w-5 h-5 object-contain' src={item.homeTeam == completedMatch.homeTeam ? completedMatch.team_home_badge : completedMatch.team_away_badge} alt={`Img Equipo`} /> */}
                                    <img className='w-5 h-5 object-contain' src={RealMadridImg} alt={`Img Equipo`} />
                                    <span className="text-regular text-secondary capitalize sm:w-auto sm:whitespace-normal sm:overflow-visible sm:text-clip overflow-hidden text-ellipsis whitespace-nowrap w-[100px]">Real Madrid</span>
                                </div>
                                <div className='flex gap-2'>
                                    {/* <img className='w-5 h-5 object-contain' src={item.awayTeam == completedMatch.awayTeam ? completedMatch.team_away_badge : completedMatch.team_home_badge} alt={`Img Equipo`} /> */}
                                    <img className='w-5 h-5 object-contain' src={BarcelonaImg} alt={`Img Equipo`} />
                                    <span className="text-regular text-secondary capitalize sm:w-auto sm:whitespace-normal sm:overflow-visible sm:text-clip overflow-hidden text-ellipsis whitespace-nowrap w-[100px]">Barcelona</span>
                                </div>
                            </div>

                            <span className="text-blue">13 puntos</span>
                        </div>
                        <div className="flex items-center border-t-gray-400 border-t py-1 px-5">
                            <TickIcon />
                            <span className="text-sm text-secondary ms-2 mt-0.5">Ganaste 13 puntos con esta predicción</span>
                        </div>
                    </div>
                </div>
            </section>
        </Container>
    )
}
export default LastPredictions
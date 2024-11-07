import DefaultTeam from '../../assets/img/DefaultTeam.png'
import ButtonSolid from '../common/ButtonSolid'
import Container from "../common/Container"
import { ProgressSpinner } from 'primereact/progressspinner'
import SkeletonList from '../common/SkeletonList'

const ActivePredictions = ({ setVisible, userPredictions, loading }) => {
    const { results } = userPredictions || {}
    const activePredictionsList = results?.filter(item => item?.status === "pending")

    function getTeamName(item) {
        const predictionType = item.predictionInfos[0].selectedPredictionType;
        const match = item.predictionInfos[0].match;

        if (predictionType === 'win_home') {
            return match.home_team;
        } else if (predictionType === 'win_away') {
            return match.away_team;
        } else if (predictionType === 'draw') {
            return 'empate';
        } else { // nombre del jugador
            return predictionType
        }
    }


    return (
        <Container>
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-regular-18 text-blue font-semibold">Activas</h1>
                <ButtonSolid onClick={() => setVisible(true)}>Hacer Predicción</ButtonSolid>
            </div>

            <section>
                <div className="flex justify-between items-center px-5 rounded-xl shadow-soft py-2 text-regular">
                    <h2>Predicción</h2>
                    <h2>Partido</h2>
                    <h2>Puntos</h2>
                </div>

                {
                    loading ?
                        <SkeletonList length={3} height='120px' />
                        :
                        activePredictionsList?.length == 0 ?
                        <p className='text-center bg-gradiente mt-2 text-white py-3 rounded-lg'>Aún no tienes predicciones</p>
                        :
                        activePredictionsList?.map(item => (
                            <div key={item.id} className="flex flex-col mt-2 justify-center rounded-xl shadow-soft">
                                <div className="flex py-1.5 gap-2 px-5">
                                    <img className="w-18px h-[18px]" src={item.predictionInfos[0].match.league_img || DefaultTeam} alt="Liga" onError={(e) => { e.target.src = DefaultTeam }} />
                                    <span className="capitalize text-black text-regular text-secondary">{item.predictionInfos[0].match.league}</span>
                                </div>

                                <div className="border-t-gray-400 border-t">
                                    <div className="flex justify-between items-center py-3 px-5">
                                        <div className="flex flex-col text-regular-14">
                                            <span className="text-secondary">Resultado final</span>
                                            {/* Resultado de predicción */}
                                            <span className="capitalize">{getTeamName(item)}</span>
                                        </div>

                                        <div className="flex flex-col items-start gap-1">
                                            {/* Equipo local */}
                                            <div className='flex gap-2'>
                                                <img className='w-5 h-5 object-contain' src={item.predictionInfos[0].match.home_team_img} alt={`${item.predictionInfos[0].match.home_team}`} />
                                                <span className="text-regular text-secondary capitalize w-[100px] overflow-hidden text-ellipsis whitespace-nowrap">{item.predictionInfos[0].match.home_team}</span>
                                            </div>
                                            {/* Equipo visitante */}
                                            <div className='flex gap-2'>
                                                <img className='w-5 h-5 object-contain' src={item.predictionInfos[0].match.away_team_img} alt={`${item.predictionInfos[0].match.away_team}`} />
                                                <span className="text-regular text-secondary capitalize w-[100px] overflow-hidden text-ellipsis whitespace-nowrap">{item.predictionInfos[0].match.away_team}</span>
                                            </div>
                                        </div>

                                        <span className="text-blue">{item.total_points}</span>
                                    </div>
                                    <div className="flex items-center border-t-gray-400 border-t py-1 px-5">
                                        <div>
                                            <ProgressSpinner style={{ width: '14.84px', height: '14.84px' }} className="custom-spinner" strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s" />
                                        </div>
                                        <span className="text-sm text-secondary ms-2">Pendiente</span>
                                    </div>
                                </div>
                            </div>
                        ))
                }
            </section>
        </Container>
    )
}

export default ActivePredictions

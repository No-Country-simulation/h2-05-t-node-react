import { useEffect, useState } from "react"
import ArrowForwardIcon from "../../assets/icons/ArrowForwardIcon"
import RedMarkIcon from "../../assets/icons/RedMarkIcon"
import DefaultTeam from "../../assets/img/defaultTeam.png"
import TickIcon from "../../assets/icons/TickIcon"
import Container from "../common/Container"
import ButtonSolid from "../common/ButtonSolid"
import { isFutureDate } from '../../utils/isFutureDate'
import axios from "axios"
import { getCurrentDate } from "../../utils/getCurrentDate"
import { Dialog } from "primereact/dialog"
import ButtonOutline from "../common/ButtonOutline"
import AlertMessage from "../common/AlertMessage"

const API_URL = import.meta.env.VITE_API_URL;

const Predictions = () => {
    const [loading, setLoading] = useState(false)
    const [visible, setVisible] = useState(false)
    const [selectedOption, setSelectedOption] = useState('')
    const [specificMatch, setSpecificMatch] = useState()
    const [completedMatch, setCompletedMatch] = useState(null)
    const [showAlert, setShowAlert] = useState(false)
    const currentDate = getCurrentDate()

    console.log(specificMatch)
    useEffect(() => {
        const storedMatch = localStorage.getItem('completedMatch');
        if (storedMatch) {
            setCompletedMatch(JSON.parse(storedMatch));
        }
    }, []);

    console.log({ completedMatch })

    useEffect(() => {
        setLoading(true)
        if (completedMatch?.homeTeam && completedMatch?.awayTeam) {
            axios.get(`${API_URL}/api_match?from=${completedMatch.match_date}&to=${completedMatch.match_date}&league=${completedMatch.league_id}&match_id=${completedMatch.match_id}`)
                .then(res => {
                    const filteredMatch = res.data.data.filter(match => match.match_id === completedMatch.match_id);
                    setSpecificMatch(filteredMatch.length > 0 ? filteredMatch[0] : null);
                })
                .catch(error => console.log(error.message))
                .finally(() => setLoading(false))
        }
    }, [completedMatch]);

    const handleSubmitPrediction = e => {
        e.preventDefault();
        if (!selectedOption) return

        setSelectedOption(null)
        setShowAlert(true)
        console.log('prediccion enviada: ', selectedOption)
    }

    return (
        <Container>
            <div className="flex justify-between py-2">
                <span className="font-medium">Tus predicciones</span>
                <div className="flex gap-2 items-center">
                    <span className="text-purple">Ver todas</span>
                    <ArrowForwardIcon />
                </div>
            </div>

            {/* LISTADO DE PREDICCIONES REALIZADAS */}

            {/* SI NO HAY PREDICCIONES */}
            <div className="flex justify-between items-center shadow-soft rounded-xl py-2 ps-5 mb-2">
                <div className="flex flex-col text-regular-14">
                    <span>No hiciste predicciones</span>
                    <span className="text-secondary">
                        {/* Partido Finalizado */}
                        {/* Partido con fecha futura */}
                        {/* Partido en vivo */}

                        {
                            completedMatch?.match_status == 'Finished'
                                ?
                                'Suerte la próxima'
                                :
                                isFutureDate(currentDate, completedMatch?.match_date)
                                    ?
                                    'Puedes hacer un máximo de 2 predicciones para días futuros'
                                    :
                                    'Predice antes de que termine el partido'
                        }
                    </span>
                </div>
                <div>
                    <span className="px-1 text-blue">0</span>
                    <span className="pe-5 text-blue">puntos</span>
                </div>

            </div>

            {/* SI GANO */}
            <div className="shadow-soft rounded-xl mb-2">
                <div className="flex justify-between items-center py-3 px-5">
                    <div className="flex flex-col text-regular-14">
                        <span className="text-secondary">Resultado final</span>
                        <span className="capitalize">Barcelona</span>
                    </div>
                    <span className="text-blue">13 puntos</span>
                </div>
                <div className="flex items-center border-t-gray-400 border-t py-1 px-5">
                    <TickIcon />
                    <span className="text-sm text-secondary ms-2 mt-0.5">Ganaste 13 puntos con esta predicción</span>
                </div>
            </div>

            {/* SI PERDIO */}
            <div className="shadow-soft rounded-xl">
                <div className="flex justify-between items-center py-3 px-5">
                    <div className="flex flex-col text-regular-14">
                        <span className="text-secondary">Gol</span>
                        <span className="capitalize">Lionel Messi</span>
                    </div>
                    <span className="text-secondary line-through">13 puntos</span>
                </div>
                <div className="flex items-center border-t-gray-400 border py-1 px-5">
                    <RedMarkIcon />
                    <span className="text-sm text-secondary ms-2 mt-0.5">No ganaste puntos con esta predicción</span>
                </div>
            </div>

            {/* SI ES UN PARTIDO EN VIVO O UN PARTIDO FUTURO */}
            {/* SI EL USUARIO NO TIENE PREDICCIONES DISPONIBLES SE INHABILITARA EL BOTON Y SE MOSTRARA MENSAJE */}

            {
                completedMatch?.match_status !== 'Finished' &&

                <div className="mx-auto mt-5">
                    <ButtonSolid onClick={() => setVisible(true)} >Hacer Predicción</ButtonSolid>
                </div>
            }

            <div className="py-2 mt-4">
                <span className="font-medium">Pronóstico general</span>
            </div>

            <div className="flex flex-col justify-center shadow-soft rounded-xl">
                <span className="py-2 px-5 text-secondary text-sm">Resultado final</span>

                <div className="w-full bg-soft-gray flex justify-center gap-10 py-5">
                    <div className="flex flex-col items-center">
                        <span className="text-center text-regular text-secondary w-[90px] overflow-hidden text-ellipsis whitespace-nowrap">{completedMatch?.homeTeam}</span>
                        <span className="text-title font-semibold text-blue mt-1.5">{parseInt(specificMatch?.home_prob) || ' - '}%</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="text-regular text-secondary">Empate</span>
                        <span className="text-title font-semibold text-blue mt-1.5">{parseInt(specificMatch?.draw_prob) || ' - '}%</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="text-center text-regular text-secondary w-[90px] overflow-hidden text-ellipsis whitespace-nowrap">{completedMatch?.awayTeam}</span>
                        <span className="text-title font-semibold text-blue mt-1.5">{parseInt(specificMatch?.away_prob) || ' - '}%</span>
                    </div>
                </div>
            </div>





            {/* MODALDIRECTPREDICTION */}
            <div className="card flex justify-content-center">
                <Dialog
                    visible={visible}
                    onHide={() => { if (!visible) return; setVisible(false); }}
                    className="w-[50vw] min-h-[100vh] !important" // 92.5vh
                    breakpoints={{ '960px': '75vw', '641px': '100vw' }}>

                    <div className='flex flex-col items-center justify-center'>
                        <span className='font-semibold text-title text-black'>Predice el resultado</span>
                        <span className='text-[18px]'>Selecciona una opción</span>
                    </div>

                    <form onSubmit={handleSubmitPrediction} className='w-[90%] mx-auto flex flex-col mt-10 text-black'>
                        <div className='h-[410px] p-1 flex flex-col gap-5 overflow-hidden overflow-scroll scrollbar-hide'>

                            <div className='rounded-lg'>
                                <div className='flex justify-between text-[18px] font-semibold'>
                                    <div onClick={() => setSelectedOption(completedMatch?.homeTeam)} className={`h-[122px] w-[150px] flex flex-col justify-center items-center shadow-soft rounded-lg ${selectedOption == completedMatch?.homeTeam ? 'border border-2 border-blue' : ''}`}>
                                        <img className="w-[53px] h-[53px]" src={completedMatch?.team_home_badge} alt={`imagen ${completedMatch?.homeTeam}`} />
                                        <span className="text-center">{completedMatch?.homeTeam}</span>
                                    </div>
                                    <div onClick={() => setSelectedOption(completedMatch?.awayTeam)} className={`h-[122px] w-[150px] flex flex-col justify-center items-center shadow-soft rounded-lg ${selectedOption == completedMatch?.awayTeam ? 'border border-2 border-blue' : ''}`}>
                                        <img className="w-[53px] h-[53px]" src={completedMatch?.team_away_badge} alt={`imagen ${completedMatch?.awayTeam}`} />
                                        <span className="text-center">{completedMatch?.awayTeam}</span>
                                    </div>
                                </div>

                                <div onClick={() => setSelectedOption('Empate')} className={`w-full h-[54px] flex justify-center items-center mx-auto text-[18px] font-semibold shadow-soft mt-3 rounded-lg ${selectedOption == 'Empate' ? 'border border-2 border-blue' : ''}`}>
                                    <span className="mb-1">Empate</span>
                                </div>
                            </div>
                        </div>

                        <div className='flex mt-5 gap-1 justify-between'>
                            <ButtonSolid onClick={() => setVisible(false)} className='w-full'>Predecir</ButtonSolid>
                            <ButtonOutline className='w-full'>Hacer combinada</ButtonOutline>
                        </div>
                    </form>

                    <div className='w-[90%] mx-auto py-7'>
                        <span className='text-black text-regular font-semibold'>Resumen:</span>
                        <div className='flex gap-2 text-regular text-black'>
                            <div className="flex gap-2">
                                <span>{completedMatch?.homeTeam}</span>
                                <img className="w[21px] h-[21px]" src={completedMatch?.team_home_badge} alt={`imagen ${completedMatch?.homeTeam}`} onError={(e) => { e.target.src = DefaultTeam }} />
                            </div>
                            <span>vs.</span>
                            <div className="flex gap-2">
                                <span>{completedMatch?.awayTeam}</span>
                                <img className="w[21px] h-[21px]" src={completedMatch?.team_away_badge} alt={`imagen ${completedMatch?.awayTeam}`} onError={(e) => { e.target.src = DefaultTeam }} />
                            </div>
                        </div>
                        <div className='flex justify-between text-regular-14 mb-3'>
                            <span>Resultado final: {selectedOption}</span>
                            <span>15</span>
                        </div>

                        <div className='flex justify-between text-title text-blue'>
                            <span>Puntos Totales</span>
                            <span>15</span>
                        </div>
                    </div>
                </Dialog>

                <AlertMessage redirect={false} showAlert={showAlert} setShowAlert={setShowAlert}>Se ha añadido tu predicción</AlertMessage>
            </div>
        </Container>
    )
}
export default Predictions
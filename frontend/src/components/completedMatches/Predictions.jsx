import { useEffect, useState } from "react"
import ArrowForwardIcon from "../../assets/icons/ArrowForwardIcon"
import RedMarkIcon from "../../assets/icons/RedMarkIcon"
import TickIcon from "../../assets/icons/TickIcon"
import Container from "../common/Container"
import ButtonSolid from "../common/ButtonSolid"
import { isFutureDate } from '../../utils/isFutureDate'
import axios from "axios"
import { getCurrentDate } from "../../utils/getCurrentDate"
import ModalPredictResultOrGoal from "../predictions/ModalPredictResultOrGoal"

// const API_URL = import.meta.env.VITE_API_URL;

const Predictions = () => {
    const [loading, setLoading] = useState(false)
    const [visible, setVisible] = useState(false)
    // const [selectedOption, setSelectedOption] = useState('')
    const [specificMatch, setSpecificMatch] = useState()
    const [completedMatch, setCompletedMatch] = useState(null)
    // const [showAlert, setShowAlert] = useState(false)
    const [visiblePredictResultOrGoal, setVisiblePredictResultOrGoal] = useState(false)
    const currentDate = getCurrentDate()

    // console.log(specificMatch)
    useEffect(() => {
        const storedMatch = localStorage.getItem('completedMatch');
        if (storedMatch) {
            setCompletedMatch(JSON.parse(storedMatch));
        }
    }, []);

    // console.log(completedMatch)

    useEffect(() => {
        setLoading(true)
        if (completedMatch?.homeTeam && completedMatch?.awayTeam) {
            axios.get(`https://apifootboll.onrender.com/api_match?from=${completedMatch.match_date}&to=${completedMatch.match_date}&league=${completedMatch.league_id}&match_id=${completedMatch.match_id}`)
                .then(res => {
                    const filteredMatch = res.data.data.filter(match => match.match_id === completedMatch.match_id);
                    setSpecificMatch(filteredMatch.length > 0 ? filteredMatch[0] : null);
                })
                .catch(error => console.log(error.message))
                .finally(() => setLoading(false))
        }
    }, [completedMatch]);

    // const handleSubmitPrediction = e => {
    //     e.preventDefault();
    //     if (!selectedOption) return

    //     setSelectedOption(null)
    //     setShowAlert(true)
    //     console.log('prediccion enviada: ', selectedOption)
    // }

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
                    <ButtonSolid onClick={() => setVisiblePredictResultOrGoal(true)} >Hacer Predicción</ButtonSolid>
                </div>
            }

            <div className="py-2 mt-4">
                <span className="font-medium">Pronóstico general</span>
            </div>

            <div className="flex flex-col justify-center shadow-soft rounded-xl mb-5">
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

            <ModalPredictResultOrGoal
                selectedMatch={completedMatch}
                setVisible={setVisible}
                visiblePredictResultOrGoal={visiblePredictResultOrGoal}
                setVisiblePredictResultOrGoal={setVisiblePredictResultOrGoal} />

        </Container>
    )
}
export default Predictions
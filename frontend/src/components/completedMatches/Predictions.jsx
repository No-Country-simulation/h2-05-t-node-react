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
import API_URL from "../../config"

// const API_URL = import.meta.env.VITE_API_URL;

const Predictions = () => {
    const [loading, setLoading] = useState(false)
    const [visible, setVisible] = useState(false)
    // const [selectedOption, setSelectedOption] = useState('')
    const [odds, setOdds] = useState([])
    const [selectedMatch, setSelectedMatch] = useState(null)
    const [userPredictions, setUserPredictions] = useState([])
    // const [showAlert, setShowAlert] = useState(false)
    const [visiblePredictResultOrGoal, setVisiblePredictResultOrGoal] = useState(false)
    const currentDate = getCurrentDate()
    const [user, setUser] = useState(null)

    useEffect(() => {
        const storedMatch = localStorage.getItem('selectedMatch');
        if (storedMatch) {
            setSelectedMatch(JSON.parse(storedMatch));
        }
    }, []);

    useEffect(() => {
        const storedUser = localStorage.getItem('user')
        if (storedUser) {
            const { token, user } = JSON.parse(storedUser)
            setUser(user)
        }
    }, [])


    // useEffect(() => {
    //     if (!user?.id) return

    //     setLoading(true)
    //     axios.post(`${API_URL}/api/prediction-record/history`, {
    //         userId: user?.id,
    //         filters: {
    //             status: "pending"
    //         }
    //     })
    //         .then(res => {
    //             console.log(res.data.data)
    //             setUserPredictions(res.data.data)
    //         })
    //         .catch(error => console.log(error))
    //         .finally(() => setLoading(false))
    // }, [user?.id])

    useEffect(() => {
        setLoading(true)

        // Verifica que selectedMatch esté correctamente inicializado antes de hacer la petición
        if (selectedMatch?.fixtureId && selectedMatch?.leagueId) {
            axios.get(`https://apifootboll.onrender.com/api_odds?league=${selectedMatch.leagueId}&season=2024&fixture=${selectedMatch.fixtureId}`)
                .then(res => {
                    console.log(res.data.data.odds)
                    setOdds(res.data.data.odds)
                })
                .catch(error => console.log(error.message))
                .finally(() => setLoading(false))
        } else {
            setLoading(false); // En caso de que falten datos
        }
    }, [selectedMatch]); // La petición se vuelve a hacer cuando selectedMatch cambie

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
                            selectedMatch?.match_status == 'Finished'
                                ?
                                'Suerte la próxima'
                                :
                                isFutureDate(currentDate, selectedMatch?.match_date)
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
                        <span className="capitalize">Nombre Equipo</span>
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
                        <span className="capitalize">Nombre Jugador</span>
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
                selectedMatch?.status.long !== 'Match Finished' &&

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
                        <span className="text-center text-regular text-secondary w-[90px] overflow-hidden text-ellipsis whitespace-nowrap">{selectedMatch?.teams.home.name || '-'}</span>
                        <span className="text-title font-semibold text-blue mt-1.5">{odds[0]?.odd || ' - '}%</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="text-regular text-secondary">Empate</span>
                        <span className="text-title font-semibold text-blue mt-1.5">{odds[1]?.odd || ' - '}%</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="text-center text-regular text-secondary w-[90px] overflow-hidden text-ellipsis whitespace-nowrap">{selectedMatch?.teams.away.name || '-'}</span>
                        <span className="text-title font-semibold text-blue mt-1.5">{odds[2]?.odd || ' - '}%</span>
                    </div>
                </div>
            </div>

            <ModalPredictResultOrGoal
                selectedMatch={selectedMatch}
                setVisible={setVisible}
                visiblePredictResultOrGoal={visiblePredictResultOrGoal}
                setVisiblePredictResultOrGoal={setVisiblePredictResultOrGoal} />

        </Container>
    )
}
export default Predictions
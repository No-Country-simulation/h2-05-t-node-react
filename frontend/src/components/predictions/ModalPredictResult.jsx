import { Dialog } from "primereact/dialog";
import ButtonSolid from "../common/ButtonSolid";
import ButtonOutline from "../common/ButtonOutline";
import DefaultTeam from '../../assets/img/defaultTeam.png'
import { useEffect, useState } from "react";
import AlertMessage from "../common/AlertMessage";
import ArrowBackPurpleIcon from "../../assets/icons/ArrowBackPurpleIcon";
import ModalMakeChained from "./ModalMakeChained";
import axios from "axios";
import API_URL from "../../config";

const ModalPredictResult = ({ setVisible, setVisiblePredictResultOrGoal, selectedMatch, visiblePredictResult, setVisiblePredictResult }) => {
    const [selectedOption, setSelectedOption] = useState(null)
    const [visibleMakeChained, setVisibleMakeChained] = useState(false)
    const [showAlert, setShowAlert] = useState(false)
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const storedUser = localStorage.getItem('user')
        if (storedUser) {
            const { token, user } = JSON.parse(storedUser)
            setUser(user)
        }
    }, [])

    const closeAllModalsPredictions = () => {
        if (!visiblePredictResult) return

        // setSelectedOption(null)

        setVisiblePredictResult(false)
        setVisiblePredictResultOrGoal(false)
        setVisible(false)
    }

    const createUserPrediction = () => {
        const {
            fixtureId,
            date,
            leagueName,
            leagueId,
            leagueLogo,
            teams: {
                home: { name: homeTeamName, logo: homeTeamLogo },
                away: { name: awayTeamName, logo: awayTeamLogo }
            }
        } = selectedMatch || {};

        let predictionType = ''
        if (homeTeamName == selectedOption) {
            predictionType = 'win_home'
        } else if (awayTeamName == selectedOption) {
            predictionType = 'win_away'
        } else {
            predictionType = 'draw'
        }

        return {
            userId: user?.id,
            prediction: {
                predictionType: "match",
                selectedPredictionType: predictionType, // "win_home" | "win_away" | "draw"
                fee: 1.3,
                quotaType: "daily",
                date: date,
            },
            matchData: {
                id_apiMatch: String(fixtureId),
                home_team: homeTeamName,
                home_team_img: homeTeamLogo,
                away_team: awayTeamName,
                away_team_img: awayTeamLogo,
                league: leagueName,
                league_id: leagueId,
                league_img: leagueLogo,
                match_date: date
            },
            type: "simple",
        }
    }

    const handleSubmitPrediction = e => {
        e.preventDefault();
        if (!selectedOption) return

        const newUserPrediction = createUserPrediction()
        console.log(newUserPrediction)

        setLoading(true)
        axios.post(`${API_URL}/api/prediction/createPrediction`, newUserPrediction)
            .then(res => {
                console.log(res.data)
                setShowAlert(true)
                setSelectedOption(null)
                // CERRAR TODOS LOS MODALES
                setVisiblePredictResult(false)
                setVisiblePredictResultOrGoal(false)
                setVisible(false)
            })
            .catch(error => console.log(error))
            .finally(() => setLoading(false))
    }

    return (
        <div className="card flex justify-content-center">
            <Dialog
                visible={visiblePredictResult}
                onHide={closeAllModalsPredictions}
                className="w-[50vw] min-h-[100vh] !important"
                breakpoints={{ '960px': '75vw', '641px': '100vw' }}>
                <ArrowBackPurpleIcon onClick={() => { if (!visiblePredictResult) return; setVisiblePredictResult(false); }} />

                <div className='flex flex-col items-center justify-center'>
                    <span className='font-semibold text-title text-black'>Predice el resultado</span>
                    <span className='text-[18px]'>Selecciona una opción</span>
                </div>

                <form onSubmit={handleSubmitPrediction} className='w-[90%] mx-auto flex flex-col mt-10 text-black'>
                    <div className='h-[410px] p-1 flex flex-col gap-5 overflow-hidden overflow-scroll scrollbar-hide'>

                        <div className='rounded-lg'>
                            <div className='flex justify-between text-[18px] font-semibold'>
                                <div onClick={() => setSelectedOption(selectedMatch?.teams.home.name)} className={`h-[122px] w-[150px] flex flex-col justify-center items-center shadow-soft rounded-lg ${selectedOption == selectedMatch?.teams.home.name ? 'border border-2 border-blue' : ''}`}>
                                    <img className="w-[53px] h-[53px]" src={selectedMatch?.teams.home.logo} alt={`imagen ${selectedMatch?.teams.home.name}`} onError={(e) => { e.target.src = DefaultTeam }} />
                                    <span className="text-center max-w-[143px] overflow-hidden text-ellipsis whitespace-nowrap">{selectedMatch?.teams.home.name}</span>
                                </div>
                                <div onClick={() => setSelectedOption(selectedMatch?.teams.away.name)} className={`h-[122px] w-[150px] flex flex-col justify-center items-center shadow-soft rounded-lg ${selectedOption == selectedMatch?.teams.away.name ? 'border border-2 border-blue' : ''}`}>
                                    <img className="w-[53px] h-[53px]" src={selectedMatch?.teams.away.logo} alt={`imagen ${selectedMatch?.teams.away.name}`} onError={(e) => { e.target.src = DefaultTeam }} />
                                    <span className="text-center max-w-[143px] overflow-hidden text-ellipsis whitespace-nowrap">{selectedMatch?.teams.away.name}</span>
                                </div>
                            </div>

                            <div onClick={() => setSelectedOption('Empate')} className={`w-full h-[54px] flex justify-center items-center mx-auto text-[18px] font-semibold shadow-soft mt-3 rounded-lg ${selectedOption == 'Empate' ? 'border border-2 border-blue' : ''}`}>
                                <span className="mb-1">Empate</span>
                            </div>
                        </div>
                    </div>

                    <div className='flex mt-5 gap-1 justify-between'>
                        <ButtonSolid onClick={closeAllModalsPredictions} className='w-full'>Predecir</ButtonSolid>
                        <ButtonOutline onClick={closeAllModalsPredictions} className='w-full'>Hacer combinada</ButtonOutline>
                    </div>
                </form>

                <div className='w-[90%] mx-auto py-7'>
                    <span className='text-black text-regular font-semibold'>Resumen:</span>
                    <div className='flex gap-2 text-regular text-black'>
                        <div className="flex gap-2">
                            <span>{selectedMatch?.teams.home.name}</span>
                            <img className="w[21px] h-[21px]" src={selectedMatch?.teams.home.logo} alt={`imagen ${selectedMatch?.teams.home.name}`} onError={(e) => { e.target.src = DefaultTeam }} />
                        </div>
                        <span>vs.</span>
                        <div className="flex gap-2">
                            <span>{selectedMatch?.teams.away.name}</span>
                            <img className="w[21px] h-[21px]" src={selectedMatch?.teams.away.logo} alt={`imagen ${selectedMatch?.teams.away.name}`} onError={(e) => { e.target.src = DefaultTeam }} />
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

            {/* MODAL PARA INICIAR UNA COMBINADA */}
            {/* <ModalMakeChained
                visibleMakeChained={visibleMakeChained}
                setVisibleMakeChained={setVisibleMakeChained}
                selectedMatch={selectedMatch}
                visiblePredictResult={visiblePredictResult}
                setVisiblePredictResult={setVisiblePredictResult}
                setVisiblePredictResultOrGoal={setVisiblePredictResultOrGoal}
                setVisible={setVisible}
            /> */}

            {/* ALERT PREDICCION SIMPLE */}
            <AlertMessage redirect={false} showAlert={showAlert} setShowAlert={setShowAlert}>Se ha añadido tu predicción</AlertMessage>
        </div>
    )
}
export default ModalPredictResult
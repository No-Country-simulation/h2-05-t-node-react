import { Dialog } from "primereact/dialog"
import { useEffect, useState } from "react"
import ButtonSolid from "../common/ButtonSolid"
import ButtonOutline from "../common/ButtonOutline"
import BlueSoccerJerseyIcon from '../../assets/icons/BlueSoccerJerseyIcon'
import ArrowBackPurpleIcon from "../../assets/icons/ArrowBackPurpleIcon"
import axios from "axios"
import API_URL from "../../config"
import AlertSuccessMessage from "../common/AlertSuccessMessage"

const ModalPredictGoal = ({ setVisible, setVisiblePredictResultOrGoal, selectedMatch, visiblePredictGoal, setVisiblePredictGoal }) => {
    const [user, setUser] = useState(null)
    const [playersList, setPlayersList] = useState([])
    const [loading, setLoading] = useState(false)
    const [selectedOption, setSelectedOption] = useState(null)
    const [showAlert, setShowAlert] = useState(false)

    const getDate = (dateString) => {
        const date = new Date(dateString)
        return date.toISOString().split('T')[0]
    }

    useEffect(() => {
        const storedUser = localStorage.getItem('user')
        if (storedUser) {
            const { token, user } = JSON.parse(storedUser)
            setUser(user)
        }
    }, [])

    console.log(selectedMatch)

    useEffect(() => {
        if (!selectedMatch) return
        setLoading(true)

        const fetchPlayers = async () => {
            try {
                const homeTeamResponse = await axios.get(
                    `https://apifootboll.onrender.com/api_NewTeam?team=${selectedMatch?.teams.home.id}&season=2024&page=1`
                )

                const awayTeamResponse = await axios.get(
                    `https://apifootboll.onrender.com/api_NewTeam?team=${selectedMatch?.teams.away.id}&season=2024&page=1`
                )

                const combinedPlayersList = [
                    ...homeTeamResponse.data.data.filteredData,
                    ...awayTeamResponse.data.data.filteredData
                ]

                setPlayersList(combinedPlayersList)
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }

        fetchPlayers()
    }, [selectedMatch])

    const closeAllModalsPredictions = () => {
        if (!visiblePredictGoal) return

        setSelectedOption(null)

        setVisiblePredictGoal(false)
        setVisiblePredictResultOrGoal(false)
        setVisible(false)
    }

    const createUserPrediction = (type) => {
        const {
            fixtureId,
            date,
            leagueId,
            leagueLogo,
            leagueName,
            teams: {
                home: { name: homeTeamName, logo: homeTeamLogo },
                away: { name: awayTeamName, logo: awayTeamLogo }
            }
        } = selectedMatch || {};

        return {
            userId: user?.id,
            prediction: {
                predictionType: "player",
                selectedPredictionType: selectedOption, // nombre del jugador
                fee: 1.3,
                quotaType: "daily",
                date: getDate(date),
            },
            matchData: {
                id_apiMatch: String(fixtureId),
                home_team: homeTeamName,
                home_team_img: homeTeamLogo,
                away_team: awayTeamName,
                away_team_img: awayTeamLogo,
                league: leagueName,
                league_id: String(leagueId),
                league_img: leagueLogo,
                match_date: getDate(date)
            },
            type: type,
        }
    }

    const handleSubmitPrediction = (type, e) => {
        e.preventDefault();
        if (!selectedOption) return

        const newUserPrediction = createUserPrediction(type)

        console.log(newUserPrediction)
        setLoading(true)
        axios.post(`${API_URL}/api/prediction/createPrediction`, newUserPrediction)
            .then(res => {
                setShowAlert(true)
                setSelectedOption(null)
                setVisiblePredictGoal(false);
                setVisiblePredictResultOrGoal(false);
                setVisible(false);
                console.log(res.data)
            })
            .catch(error => console.log(error))
            .finally(() => setLoading(false))
    }


    return (
        <div className="card flex justify-content-center">
            <Dialog
                visible={visiblePredictGoal}
                onHide={closeAllModalsPredictions}
                className="w-[50vw] min-h-[97vh] !important"
                breakpoints={{ '960px': '75vw', '641px': '100vw' }}>
                <ArrowBackPurpleIcon onClick={() => { if (!visiblePredictGoal) return; setVisiblePredictGoal(false); }} />

                <div className='flex flex-col items-center justify-center'>
                    <span className='font-semibold text-title text-black'>¿Qué jugador anota gol?</span>
                    <span className='text-[18px]'>Selecciona una opción</span>
                </div>

                <form className='w-[90%] mx-auto flex flex-col mt-7 text-black'>
                    <div className="max-h-[480px] p-1 flex flex-col gap-1.5 rounded-lg overflow-y-scroll scrollbar-hide">
                        {playersList?.map(item => (
                            <div
                                key={item.player.id}
                                onClick={() => setSelectedOption(item.player.name)}
                                className={`h-[54px] min-h-[54px] max-h-[54px] px-5 flex items-center gap-3 rounded-lg shadow-soft ${selectedOption == item.player.name ? 'border border-2 border-blue' : ''}`}>
                                <BlueSoccerJerseyIcon playerNumber={''} />
                                <div className="flex flex-col">
                                    <p className="text-regular-18 text-secondary font-semibold capitalize">{item.player.name}</p>
                                    <span className="text-xs text-tertiary"></span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className='flex mt-7 gap-1 justify-between'>
                        <ButtonSolid onClick={(e) => handleSubmitPrediction('simple', e)} disabled={!selectedOption || loading} className='w-full'>Predecir</ButtonSolid>
                        <ButtonOutline onClick={(e) => handleSubmitPrediction('chained', e)} disabled={!selectedOption || loading} className='w-full'>Hacer combinada</ButtonOutline>
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
                        <div>
                            <span>Goles: {selectedOption}</span>
                        </div>
                        <span>15</span>
                    </div>

                    <div className='flex justify-between text-title text-blue'>
                        <span>Puntos Totales</span>
                        <span>15</span>
                    </div>
                </div>

                <AlertSuccessMessage redirect={false} showAlert={showAlert} setShowAlert={setShowAlert}>
                    Se ha añadido tu predicción
                </AlertSuccessMessage>
            </Dialog>
        </div>
    )
}
export default ModalPredictGoal
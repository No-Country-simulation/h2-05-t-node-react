import { useEffect, useState } from "react"
import { Dialog } from "primereact/dialog"
import { useNavigate } from "react-router-dom"
import InProgressIcon from "../../assets/icons/InProgressIcon"
import ButtonSolid from "../common/ButtonSolid"
import ButtonOutline from "../common/ButtonOutline"
import DefaultTeam from '../../assets/img/defaultTeam.png'
import AlertSuccessMessage from "../common/AlertSuccessMessage"
import axios from "axios"
import API_URL from "../../config"
import AlertTimeOut from "../common/AlertTimeOut"
import { getCurrentDate } from "../../utils/getCurrentDate"
import { compareDates } from "../../utils/compareDates"

const initialSelectedPredictionData = {
    teamHomeLogo: '',
    teamAwayLogo: '',
    teamHome: '',
    teamAway: '',
}

const MatchDetail = ({ league }) => {
    const { matches } = league
    const [selectedPredictionData, setSelectedPredictionData] = useState(initialSelectedPredictionData)
    const [visible, setVisible] = useState(false)
    const [selectedOption, setSelectedOption] = useState('')
    const [selectedMatch, setselectedMatch] = useState(null)
    const [showAlert, setShowAlert] = useState(false)
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState(null)
    const [userPrediction, setUserPrediction] = useState(null)
    const [leagueData, setLeagueData] = useState({})
    const [finishedMatch, setFinishedMatch] = useState(false)
    const currentDate = getCurrentDate()
    const navigate = useNavigate()

    useEffect(() => {
        const storedUser = localStorage.getItem('user')
        if (storedUser) {
            const { token, user } = JSON.parse(storedUser)
            setUser(user)
        }
    }, [])

    useEffect(() => {
        if (league && league.league) {
            const { id, name, logo } = league.league;
            setLeagueData({ id, name, logo });
        }
    }, [league]);

    const handleSelectedMatch = (match) => {
        console.log('League ID:', league?.id)
        const matchWithLeagueId = { ...match, leagueId: league?.league.id, leagueName: league?.league.name, leagueLogo: league?.league.logo }
        localStorage.setItem('selectedMatch', JSON.stringify(matchWithLeagueId))
        navigate('/matches-completed');
    }

    const createUserPrediction = () => {
        const {
            fixtureId,
            date,
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

        let quotaTypeResult = compareDates(currentDate, selectedMatch?.date) // daily || future

        return {
            userId: user?.id,
            prediction: {
                predictionType: "match",
                selectedPredictionType: predictionType, // "win_home" | "win_away" | "draw"
                fee: 1.3,
                quotaType: quotaTypeResult,
                date: getDate(date),
            },
            matchData: {
                id_apiMatch: String(fixtureId),
                home_team: homeTeamName,
                home_team_img: homeTeamLogo,
                away_team: awayTeamName,
                away_team_img: awayTeamLogo,
                league: leagueData?.name,
                league_id: String(leagueData?.id),
                league_img: leagueData.logo,
                match_date: getDate(date)
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
                setVisible(false)
                setShowAlert(true)
            })
            .catch(error => console.log(error))
            .finally(() => setLoading(false))
    }

    const handleShowPredictionModal = (match, predictionSelected) => {
        if (match.status.long == 'Match Finished') return setFinishedMatch(true)

        setVisible(true)
        setSelectedOption(predictionSelected)
        setSelectedPredictionData({
            teamHomeLogo: match.teams.home.logo,
            teamAwayLogo: match.teams.away.logo,
            teamHome: match.teams.home.name,
            teamAway: match.teams.away.name,
        })
    }

    const getTime = (dateTimeString) => {
        return dateTimeString.split("T")[1].split(":").slice(0, 2).join(":");
    }

    const getDate = (dateString) => {
        const date = new Date(dateString)
        return date.toISOString().split('T')[0]
    }

    return (
        <>
            {
                matches.map((item) => (
                    <div key={item.fixtureId} className="p-[18px] bg-[#F3F4F5] border-b-gray border">

                        <div onClick={() => handleSelectedMatch(item)} className="flex items-center justify-around text-center">
                            {/* Equipo local */}
                            <div className="w-[83px]">
                                <div>
                                    <img className="mx-auto w-[54px] h-[54px] object-contain" src={item.teams.home.logo} alt={`img ${item.teams.home.name}`} onError={(e) => { e.target.src = DefaultTeam }} />
                                    <p className="capitalize text-xs mt-[2px] max-w-[80px] truncate overflow-hidden whitespace-nowrap">{item.teams.home.name}</p>
                                </div>
                                <div onClick={(e) => {
                                    e.stopPropagation()
                                    setselectedMatch(item)
                                    handleShowPredictionModal(item, item.teams.home.name);
                                }}
                                    className="h-[27px] text-sm mt-3 shadow-soft-md border rounded-md bg-white flex items-center justify-center">
                                    1.2
                                </div>
                            </div>

                            <div className="w-[83px]">
                                <div className="flex flex-col justify-center items-center">
                                    <InProgressIcon />
                                    <span className="text-[17px] font-bold mt-2">
                                        {
                                            item.status.elapsed == null
                                                ? getTime(item.date)
                                                : `${item.goals.home} - ${item.goals.away}`
                                        }
                                    </span>
                                    <span className="capitalize text-xs semibold">
                                        {
                                            item.status.long == 'Match Finished' ? 'Finalizado'
                                                : item.status.long == 'Not Started' ? 'Pendiente'
                                                    : item.status.long == 'First Half' ? '🔴 ' + item.status.elapsed + `'`
                                                        : item.status.long == 'Second Half' ? '🔴 ' + item.status.elapsed + `'`
                                                            : item.status.elapsed !== null ? 'M. tiempo'
                                                                // : item.status.long == 'Postponed' ? 'Postergado'
                                                                : 'Pendiente'
                                        }
                                    </span>
                                </div>
                                <div
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        setselectedMatch(item)
                                        handleShowPredictionModal(item, 'Empate');
                                    }}
                                    className="h-[27px] text-sm mt-3 shadow-soft-md border rounded-md bg-white flex items-center justify-center">
                                    2.4
                                </div>
                            </div>

                            {/* Equipo visitante */}
                            <div className="w-[83px]">
                                <div>
                                    <img className="mx-auto w-[54px] h-[54px] object-contain" src={item.teams.away.logo} alt={`img ${item.teams.away.name}`} onError={(e) => { e.target.src = DefaultTeam }} />
                                    <p className="capitalize text-xs mt-[2px] max-w-[80px] truncate overflow-hidden whitespace-nowrap">{item.teams.away.name}</p>
                                </div>
                                <div
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        setselectedMatch(item)
                                        handleShowPredictionModal(item, item.teams.away.name);
                                    }}
                                    className="h-[27px] text-sm mt-3 shadow-soft-md border rounded-md bg-white flex items-center justify-center">
                                    1.2
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            }


            {/* MODALDIRECTPREDICTION */}
            <div className="card flex justify-content-center">
                <Dialog
                    visible={visible}
                    position="bottom"
                    onHide={() => { if (!visible) return; setVisible(false); }}
                    className="w-[50vw] min-h-[97vh] !important"
                    breakpoints={{ '960px': '75vw', '641px': '100vw' }}>

                    <div className='flex flex-col items-center justify-center'>
                        <span className='font-semibold text-title text-black'>Predice el resultado</span>
                        <span className='text-[18px]'>Selecciona una opción</span>
                    </div>

                    <form onSubmit={handleSubmitPrediction} className='w-[90%] mx-auto flex flex-col mt-10 text-black'>
                        <div className='h-[410px] p-1 flex flex-col gap-5 overflow-hidden overflow-scroll scrollbar-hide'>

                            <div className='rounded-lg'>
                                <div className='flex justify-between text-[18px] font-semibold'>
                                    <div onClick={() => setSelectedOption(selectedPredictionData.teamHome)} className={`h-[122px] w-[150px] flex flex-col justify-center items-center shadow-soft rounded-lg ${selectedOption == selectedPredictionData.teamHome ? 'border border-2 border-blue' : ''}`}>
                                        <img className="w-[53px] h-[53px]" src={selectedPredictionData.teamHomeLogo} alt={`imagen ${selectedPredictionData.teamHome}`} onError={(e) => { e.target.src = DefaultTeam }} />
                                        <span className="text-center max-w-[143px] overflow-hidden text-ellipsis whitespace-nowrap">{selectedPredictionData.teamHome}</span>
                                    </div>
                                    <div onClick={() => setSelectedOption(selectedPredictionData.teamAway)} className={`h-[122px] w-[150px] flex flex-col justify-center items-center shadow-soft rounded-lg ${selectedOption == selectedPredictionData.teamAway ? 'border border-2 border-blue' : ''}`}>
                                        <img className="w-[53px] h-[53px]" src={selectedPredictionData.teamAwayLogo} alt={`imagen ${selectedPredictionData.teamAway}`} onError={(e) => { e.target.src = DefaultTeam }} />
                                        <span className="text-center max-w-[143px] overflow-hidden text-ellipsis whitespace-nowrap">{selectedPredictionData.teamAway}</span>
                                    </div>
                                </div>

                                <div onClick={() => setSelectedOption('Empate')} className={`w-full h-[54px] flex justify-center items-center mx-auto text-[18px] font-semibold shadow-soft mt-3 rounded-lg ${selectedOption == 'Empate' ? 'border border-2 border-blue' : ''}`}>
                                    <span className="mb-1">Empate</span>
                                </div>
                            </div>
                        </div>

                        <div className='flex mt-5 gap-1 justify-between'>
                            {/* onClick={() => setVisible(false)} */}
                            <ButtonSolid disabled={loading} className='w-full'>{loading ? 'Guardando..' : 'Predecir'}</ButtonSolid>
                            <ButtonOutline onClick={() => setVisible(false)} className='w-full'>Hacer combinada</ButtonOutline>
                        </div>
                    </form>

                    <div className='w-[90%] mx-auto py-7'>
                        <span className='text-black text-regular font-semibold'>Resumen:</span>
                        <div className='flex gap-2 text-regular text-black'>
                            <div className="flex gap-2">
                                <span>{selectedPredictionData.teamHome}</span>
                                <img className="w[21px] h-[21px]" src={selectedPredictionData.teamHomeLogo} alt={`imagen ${selectedPredictionData.teamHome}`} onError={(e) => { e.target.src = DefaultTeam }} />
                            </div>
                            <span>vs.</span>
                            <div className="flex gap-2">
                                <span>{selectedPredictionData.teamAway}</span>
                                <img className="w[21px] h-[21px]" src={selectedPredictionData.teamAwayLogo} alt={`imagen ${selectedPredictionData.teamAway}`} onError={(e) => { e.target.src = DefaultTeam }} />
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

                {/* {
                    loading ?
                        <AlertMessage redirect={false} showAlert={showAlert} loading={loading} setShowAlert={setShowAlert}>
                            Realizando predicción...
                        </AlertMessage>
                        : */}
                <AlertSuccessMessage redirect={false} showAlert={showAlert} setShowAlert={setShowAlert}>
                    Se ha añadido tu predicción
                </AlertSuccessMessage>
                <AlertTimeOut showAlert={finishedMatch} setShowAlert={setFinishedMatch}>
                    No podés predecir un partido finalizado
                </AlertTimeOut>
                {/* } */}
            </div>
        </>
    )
}
export default MatchDetail
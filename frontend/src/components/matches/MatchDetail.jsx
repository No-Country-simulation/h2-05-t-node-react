import { useState } from "react"
import InProgressIcon from "../../assets/icons/InProgressIcon"
import { Dialog } from "primereact/dialog"
import ButtonSolid from "../common/ButtonSolid"
import ButtonOutline from "../common/ButtonOutline"
import DefaultTeam from '../../assets/img/defaultTeam.png'
import { useNavigate } from "react-router-dom"
import AlertMessage from "../common/AlertMessage"

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
    const [showAlert, setShowAlert] = useState(false)
    const navigate = useNavigate()

    const handleSelectedMatch = (match) => {
        localStorage.setItem('completedMatch', JSON.stringify(match))
        navigate('/matches-completed');
    }
 
    const handleSubmitPrediction = e => {
        e.preventDefault();
        if (!selectedOption) return

        setShowAlert(true)
        console.log('prediccion enviada: ', selectedOption)
    }

    const handleShowPredictionModal = (match, predictionSelected) => {
        if (match.match_status == 'Finished') return

        setVisible(true)
        setSelectedOption(predictionSelected)
        setSelectedPredictionData({
            teamHomeLogo: match.team_home_badge,
            teamAwayLogo: match.team_away_badge,
            teamHome: match.homeTeam,
            teamAway: match.awayTeam,
        })
    }

    return (
        <>
            {
                matches.map((item) => (
                    <div key={item.match_id} className="p-[18px] bg-[#F3F4F5] border-b-gray border">

                        <div onClick={() => handleSelectedMatch(item)} className="flex items-center justify-around text-center">
                            <div className="w-[83px]">
                                <div>
                                    <img className="mx-auto w-[54px] h-[54px] object-contain" src={item.team_home_badge} alt={`img ${item.homeTeam}`} onError={(e) => { e.target.src = DefaultTeam }} />
                                    <p className="capitalize text-xs mt-[2px] max-w-[80px] truncate overflow-hidden whitespace-nowrap">{item.homeTeam}</p>
                                </div>
                                <div onClick={(e) => {
                                    e.stopPropagation()
                                    handleShowPredictionModal(item, item.homeTeam);
                                }}
                                    className="h-[27px] text-sm mt-3 shadow-soft-md border rounded-md bg-white flex items-center justify-center">
                                    1.2
                                </div>
                            </div>

                            <div className="w-[83px]">
                                <div className="flex flex-col justify-center items-center">
                                    <InProgressIcon />
                                    <span className="text-xl font-bold mt-2">{item.hometeam_score} - {item.awayteam_score}</span>
                                    <span className="capitalize text-xs semibold">
                                        {
                                            item.match_status == 'Finished' ? 'Finalizado'
                                                : item.match_status == '' ? 'Pendiente'
                                                    : item.match_status == 'Half Time' ? 'Medio tiempo'
                                                        : `🔴 ` + item.match_status + `'`
                                        }
                                    </span>
                                </div>
                                <div
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        handleShowPredictionModal(item, 'Empate');
                                    }}
                                    className="h-[27px] text-sm mt-3 shadow-soft-md border rounded-md bg-white flex items-center justify-center">
                                    2.4
                                </div>
                            </div>

                            <div className="w-[83px]">
                                <div>
                                    <img className="mx-auto w-[54px] h-[54px] object-contain" src={item.team_away_badge} alt={`img ${item.awayTeam}`} onError={(e) => { e.target.src = DefaultTeam }} />
                                    <p className="capitalize text-xs mt-[2px] max-w-[80px] truncate overflow-hidden whitespace-nowrap">{item.awayTeam}</p>
                                </div>
                                <div
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        handleShowPredictionModal(item, item.awayTeam);
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
                            <ButtonSolid onClick={() => setVisible(false)} className='w-full'>Predecir</ButtonSolid>
                            <ButtonOutline className='w-full'>Hacer combinada</ButtonOutline>
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

                <AlertMessage redirect={false} showAlert={showAlert} setShowAlert={setShowAlert}>Se ha añadido tu predicción</AlertMessage>
            </div>
        </>
    )
}
export default MatchDetail
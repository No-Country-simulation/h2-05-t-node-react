import { useState } from "react"
import InProgressIcon from "../../assets/icons/InProgressIcon"
import { Dialog } from "primereact/dialog"
import ButtonSolid from "../common/ButtonSolid"
import ButtonOutline from "../common/ButtonOutline"
import { useNavigate } from "react-router-dom"

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
    const navigate = useNavigate()

    const handleSelectedMatch = (match) => {
        // Si es un partido terminado redirige a la pantalla de partidos finalizados
        if (match.match_status == 'Finished') {
            localStorage.setItem('completedMatch', JSON.stringify(match))
            navigate('/matches-completed');
        }

        // Sino despliega el modal para hacer la prediccion
        setVisible(true)
        setSelectedPredictionData({
            teamHomeLogo: match.team_home_badge,
            teamAwayLogo: match.team_away_badge,
            teamHome: match.homeTeam,
            teamAway: match.awayTeam,
        })
    }

    const handleSubmitPrediction = e => {
        e.preventDefault();
        if (!selectedOption) return

        console.log('prediccion enviada: ', selectedOption)
    }

    return (
        <>
            {
                matches.map((item) => (
                    <div key={item.match_id} className="p-[18px] bg-[#F3F4F5] border-b-gray border">

                        <div onClick={() => handleSelectedMatch(item)} className="flex items-center justify-around text-center">
                            <div className="w-[83px]">
                                <div>
                                    <img className="mx-auto w-[54px] h-[54px] object-contain" src={item.team_home_badge} alt={`img ${item.homeTeam}`} />
                                    <p className="capitalize text-xs mt-[4px]">{item.homeTeam}</p>
                                </div>
                                <div className="h-[27px] text-sm mt-3 shadow-soft-md border rounded-md bg-white flex items-center justify-center">
                                    1.2
                                </div>
                            </div>

                            <div className="w-[83px]">
                                <div className="flex flex-col justify-center items-center">
                                    <InProgressIcon />
                                    <span className="text-xl font-bold mt-2">{item.hometeam_score} - {item.awayteam_score}</span>
                                    <span className="uppercase text-xs">{item.match_status == 'Finished' && 'Finalizado'}</span>
                                </div>
                                <div className="h-[27px] text-sm mt-3 shadow-soft-md border rounded-md bg-white flex items-center justify-center">
                                    2.4
                                </div>
                            </div>

                            <div className="w-[83px]">
                                <div>
                                    <img className="mx-auto w-[54px] h-[54px] object-contain" src={item.team_away_badge} alt={`img ${item.awayTeam}`} />
                                    <p className="capitalize text-xs mt-[2px]">{item.awayTeam}</p>
                                </div>
                                <div className="h-[27px] text-sm mt-3 shadow-soft-md border rounded-md bg-white flex items-center justify-center">
                                    1.2
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            }


            <div className="card flex justify-content-center">
                <Dialog
                    visible={visible}
                    onHide={() => { if (!visible) return; setVisible(false); }}
                    className="w-[50vw] min-h-[92vh] !important"
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
                                        <img className="w-[53px] h-[53px]" src={selectedPredictionData.teamHomeLogo} alt={`imagen ${selectedPredictionData.teamHome}`} />
                                        <span className="text-center">{selectedPredictionData.teamHome}</span>
                                    </div>
                                    <div onClick={() => setSelectedOption(selectedPredictionData.teamAway)} className={`h-[122px] w-[150px] flex flex-col justify-center items-center shadow-soft rounded-lg ${selectedOption == selectedPredictionData.teamAway ? 'border border-2 border-blue' : ''}`}>
                                        <img className="w-[53px] h-[53px]" src={selectedPredictionData.teamAwayLogo} alt={`imagen ${selectedPredictionData.teamAway}`} />
                                        <span className="text-center">{selectedPredictionData.teamAway}</span>
                                    </div>
                                </div>

                                <div onClick={() => setSelectedOption('Empate')} className={`w-full h-[54px] flex justify-center items-center mx-auto text-[18px] font-semibold shadow-soft mt-3 rounded-lg ${selectedOption == 'Empate' ? 'border border-2 border-blue' : ''}`}>
                                    <span className="mb-1">Empate</span>
                                </div>
                            </div>
                        </div>

                        <div className='flex mt-5 gap-1 justify-between'>
                            <ButtonSolid className='w-full'>Predecir</ButtonSolid>
                            <ButtonOutline className='w-full'>Hacer combinada</ButtonOutline>
                        </div>
                    </form>

                    <div className='w-[90%] mx-auto py-7'>
                        <span className='text-black text-regular font-semibold'>Resumen:</span>
                        <div className='flex gap-2 text-regular text-black'>
                            <div className="flex gap-2">
                                <span>{selectedPredictionData.teamHome}</span>
                                <img className="w[21px] h-[21px]" src={selectedPredictionData.teamHomeLogo} alt={`imagen ${selectedPredictionData.teamHome}`} />
                            </div>
                            <span>vs.</span>
                            <div className="flex gap-2">
                                <span>{selectedPredictionData.teamAway}</span>
                                <img className="w[21px] h-[21px]" src={selectedPredictionData.teamAwayLogo} alt={`imagen ${selectedPredictionData.teamAway}`} />
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
            </div>
        </>
    )
}
export default MatchDetail
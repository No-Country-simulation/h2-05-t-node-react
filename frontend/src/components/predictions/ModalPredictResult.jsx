import { Dialog } from "primereact/dialog";
import ButtonSolid from "../common/ButtonSolid";
import ButtonOutline from "../common/ButtonOutline";
import DefaultTeam from '../../assets/img/defaultTeam.png'
import { useState } from "react";
import AlertMessage from "../common/AlertMessage";

const ModalPredictResult = ({ setVisible, setVisiblePredictResultOrGoal, selectedMatch, visiblePredictResult, setVisiblePredictResult }) => {
    const [selectedOption, setSelectedOption] = useState(null)
    const [showAlert, setShowAlert] = useState(false)

    const closeAllModalsPredictions = () => {
        if (!visiblePredictResult) return

        setSelectedOption(null)

        setVisiblePredictResult(false)
        setVisiblePredictResultOrGoal(false)
        setVisible(false)
    }

    const handleSubmitPrediction = e => {
        e.preventDefault()
        if (!selectedOption) return

        console.log('prediccion enviada: ' + selectedOption)

        setShowAlert(true)

        setSelectedOption(null)

        // CERRAR TODOS LOS MODALES
        setVisiblePredictResult(false)
        setVisiblePredictResultOrGoal(false)
        setVisible(false)
    }

    return (
        <div className="card flex justify-content-center">
            <Dialog
                visible={visiblePredictResult}
                onHide={closeAllModalsPredictions}
                className="w-[50vw] min-h-[100vh] !important"
                breakpoints={{ '960px': '75vw', '641px': '100vw' }}>

                <div className='flex flex-col items-center justify-center'>
                    <span className='font-semibold text-title text-black'>Predice el resultado</span>
                    <span className='text-[18px]'>Selecciona una opción</span>
                </div>

                <form onSubmit={handleSubmitPrediction} className='w-[90%] mx-auto flex flex-col mt-10 text-black'>
                    <div className='h-[410px] p-1 flex flex-col gap-5 overflow-hidden overflow-scroll scrollbar-hide'>

                        <div className='rounded-lg'>
                            <div className='flex justify-between text-[18px] font-semibold'>
                                <div onClick={() => setSelectedOption(selectedMatch.homeTeam)} className={`h-[122px] w-[150px] flex flex-col justify-center items-center shadow-soft rounded-lg ${selectedOption == selectedMatch?.homeTeam ? 'border border-2 border-blue' : ''}`}>
                                    <img className="w-[53px] h-[53px]" src={selectedMatch?.team_home_badge} alt={`imagen ${selectedMatch?.homeTeam}`} onError={(e) => { e.target.src = DefaultTeam }} />
                                    <span className="text-center max-w-[143px] overflow-hidden text-ellipsis whitespace-nowrap">{selectedMatch?.homeTeam}</span>
                                </div>
                                <div onClick={() => setSelectedOption(selectedMatch.awayTeam)} className={`h-[122px] w-[150px] flex flex-col justify-center items-center shadow-soft rounded-lg ${selectedOption == selectedMatch?.awayTeam ? 'border border-2 border-blue' : ''}`}>
                                    <img className="w-[53px] h-[53px]" src={selectedMatch?.team_away_badge} alt={`imagen ${selectedMatch?.awayTeam}`} onError={(e) => { e.target.src = DefaultTeam }} />
                                    <span className="text-center max-w-[143px] overflow-hidden text-ellipsis whitespace-nowrap">{selectedMatch?.awayTeam}</span>
                                </div>
                            </div>

                            <div onClick={() => setSelectedOption('Empate')} className={`w-full h-[54px] flex justify-center items-center mx-auto text-[18px] font-semibold shadow-soft mt-3 rounded-lg ${selectedOption == 'Empate' ? 'border border-2 border-blue' : ''}`}>
                                <span className="mb-1">Empate</span>
                            </div>
                        </div>
                    </div>

                    <div className='flex mt-5 gap-1 justify-between'>
                        <ButtonSolid onClick={() => setVisiblePredictResult(false)} className='w-full'>Predecir</ButtonSolid>
                        <ButtonOutline className='w-full'>Hacer combinada</ButtonOutline>
                    </div>
                </form>

                <div className='w-[90%] mx-auto py-7'>
                    <span className='text-black text-regular font-semibold'>Resumen:</span>
                    <div className='flex gap-2 text-regular text-black'>
                        <div className="flex gap-2">
                            <span>{selectedMatch?.homeTeam}</span>
                            <img className="w[21px] h-[21px]" src={selectedMatch?.team_home_badge} alt={`imagen ${selectedMatch?.homeTeam}`} onError={(e) => { e.target.src = DefaultTeam }} />
                        </div>
                        <span>vs.</span>
                        <div className="flex gap-2">
                            <span>{selectedMatch?.awayTeam}</span>
                            <img className="w[21px] h-[21px]" src={selectedMatch?.team_away_badge} alt={`imagen ${selectedMatch?.awayTeam}`} onError={(e) => { e.target.src = DefaultTeam }} />
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
    )
}
export default ModalPredictResult
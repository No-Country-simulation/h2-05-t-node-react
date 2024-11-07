import { Dialog } from "primereact/dialog"
import { useState } from "react"
import ArrowBackPurpleIcon from "../../assets/icons/ArrowBackPurpleIcon"
import DefaultTeam from "../../assets/img/defaultTeam.png"
import AlertMessage from "../common/AlertMessage"
import BallIcon from "../../assets/icons/BallIcon"
import SoccerJerseyIcon from "../../assets/icons/SoccerJerseyIcon"

const ModalMakeChained = ({ setVisibleMakeChained, setVisiblePredictGoal, setVisible, setVisiblePredictResultOrGoal, selectedMatch, visiblePredictResult, setVisiblePredictResult }) => {
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
                visible={setVisibleMakeChained}
                onHide={closeAllModalsPredictions}
                className="w-[50vw] min-h-[100vh] !important"
                breakpoints={{ '960px': '75vw', '641px': '100vw' }}>
                <ArrowBackPurpleIcon onClick={() => { if (!visiblePredictResult) return; setVisiblePredictResult(false); }} />

                <div className='flex flex-col items-center justify-center'>
                    <span className='font-semibold text-title text-black'>¿Con qué vas a combinar?</span>
                    <span className='text-[18px]'>Selecciona una opción</span>
                </div>

                {/* SECTION GOLES Y PARTIDOS */}
                <section className="h-[520px]">
                    <div className="w-[90%] h-[200px] mx-auto flex flex-col justify-between mt-[35px] rounded-xl">
                        <div className="shadow-soft rounded-lg">
                            <div className='flex justify-center gap-2 text-regular py-1.5 text-black'>
                                <div className="flex gap-2">
                                    <span>{selectedMatch?.homeTeam}</span>
                                    <img className="w[21px] h-[21px]" src={selectedMatch?.team_home_badge} alt={`img ${selectedMatch?.homeTeam}`} onError={(e) => { e.target.src = DefaultTeam }} />
                                </div>
                                <span>vs.</span>
                                <div className="flex gap-2">
                                    <span>{selectedMatch?.awayTeam}</span>
                                    <img className="w[21px] h-[21px]" src={selectedMatch?.team_away_badge} alt={`img ${selectedMatch?.awayTeam}`} onError={(e) => { e.target.src = DefaultTeam }} />
                                </div>
                            </div>
                            <div onClick={() => setVisiblePredictGoal(true)} className="h-[77px] border-t border-t-primary flex gap-4 items-center px-5">
                                <SoccerJerseyIcon />
                                <span className="font-semibold text-regular-18">Goles</span>
                            </div>
                        </div>
                        <div onClick={() => setVisiblePredictResult(true)} className="h-[77px] shadow-soft flex gap-3 items-center px-5 rounded-xl">
                            <BallIcon className='text-blue' />
                            <span className="font-semibold text-regular-18 ms-2">Otro partido</span>
                        </div>
                    </div>
                </section>

                {/* DIV RESUMEN */}
                <div className='w-[90%] mx-auto py-7'>
                    <span className='text-black text-regular font-semibold'>Resumen:</span>
                    <div className='flex gap-2 text-regular text-black'>
                        <div className="flex gap-2">
                            <span>{selectedMatch?.homeTeam}</span>
                            <img className="w[21px] h-[21px]" src={selectedMatch?.team_home_badge} alt={`img ${selectedMatch?.homeTeam}`} onError={(e) => { e.target.src = DefaultTeam }} />
                        </div>
                        <span>vs.</span>
                        <div className="flex gap-2">
                            <span>{selectedMatch?.awayTeam}</span>
                            <img className="w[21px] h-[21px]" src={selectedMatch?.team_away_badge} alt={`img ${selectedMatch?.awayTeam}`} onError={(e) => { e.target.src = DefaultTeam }} />
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

            {/*  */}

            <AlertMessage redirect={false} showAlert={showAlert} setShowAlert={setShowAlert}>Se ha añadido tu predicción</AlertMessage>
        </div>
    )
}
export default ModalMakeChained
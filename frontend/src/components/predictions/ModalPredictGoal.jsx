import { Dialog } from "primereact/dialog"
import { useState } from "react"
import ButtonSolid from "../common/ButtonSolid"
import ButtonOutline from "../common/ButtonOutline"
import AlertMessage from "../common/AlertMessage"
import BlueSoccerJerseyIcon from '../../assets/icons/BlueSoccerJerseyIcon'
import ArrowBackPurpleIcon from "../../assets/icons/ArrowBackPurpleIcon"

const players = [
    { id: 1, name: 'Thibaut Courtois', number: 1 },
    { id: 2, name: 'Dani Carvajal', number: 2 },
    { id: 3, name: 'David Alaba', number: 4 },
    { id: 4, name: 'Antonio Rüdiger', number: 22 },
    { id: 5, name: 'Ferland Mendy', number: 23 },
    { id: 6, name: 'Eduardo Camavinga', number: 12 },
    { id: 7, name: 'Federico Valverde', number: 15 },
    { id: 8, name: 'Aurélien Tchouaméni', number: 18 },
    { id: 9, name: 'Jude Bellingham', number: 5 },
    { id: 10, name: 'Vinícius Júnior', number: 7 },
    { id: 11, name: 'Rodrygo Goes', number: 11 },
]

const ModalPredictGoal = ({ setVisible, setVisiblePredictResultOrGoal, selectedMatch, visiblePredictGoal, setVisiblePredictGoal }) => {
    const [playersList, setPlayersList] = useState(players)
    const [selectedOption, setSelectedOption] = useState(null)
    const [showAlert, setShowAlert] = useState(false)

    const closeAllModalsPredictions = () => {
        if (!visiblePredictGoal) return

        setSelectedOption(null)

        setVisiblePredictGoal(false)
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
        setVisiblePredictGoal(false)
        setVisiblePredictResultOrGoal(false)
        setVisible(false)
    }

    return (
        <div className="card flex justify-content-center">
            <Dialog
                visible={visiblePredictGoal}
                onHide={closeAllModalsPredictions}
                className="w-[50vw] min-h-[100vh] !important"
                breakpoints={{ '960px': '75vw', '641px': '100vw' }}>
                <ArrowBackPurpleIcon onClick={() => { if (!visiblePredictGoal) return; setVisiblePredictGoal(false); }} />

                <div className='flex flex-col items-center justify-center'>
                    <span className='font-semibold text-title text-black'>¿Qué jugador anota gol?</span>
                    <span className='text-[18px]'>Selecciona una opción</span>
                </div>

                <form onSubmit={handleSubmitPrediction} className='w-[90%] mx-auto flex flex-col mt-7    text-black'>
                    <div className="max-h-[480px] p-1 flex flex-col gap-1.5 rounded-lg overflow-y-scroll scrollbar-hide">
                        {playersList?.map(item => (
                            <div
                                key={item.id}
                                onClick={() => setSelectedOption(item.name)}
                                className={`h-[54px] min-h-[54px] max-h-[54px] px-5 flex items-center gap-3 rounded-lg shadow-soft ${selectedOption == item.name ? 'border border-2 border-blue' : ''}`}>
                                <BlueSoccerJerseyIcon playerNumber={item.number} />
                                <div className="flex flex-col">
                                    <p className="text-regular-18 text-secondary font-semibold capitalize">{item.name}</p>
                                    <span className="text-xs text-tertiary">{item.number}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className='flex mt-7 gap-1 justify-between'>
                        <ButtonSolid onClick={() => setVisiblePredictGoal(false)} className='w-full'>Predecir</ButtonSolid>
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
                        <div>
                            <span>Goles: {selectedOption}</span>
                            <span>Jugador 10</span>
                        </div>
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
export default ModalPredictGoal
import { useState } from "react";
import { Dialog } from "primereact/dialog";
import BlueStadiumIcon from "../../assets/icons/BlueStadiumIcon";
import SoccerJerseyIcon from "../../assets/icons/SoccerJerseyIcon";
import ArrowBackPurpleIcon from "../../assets/icons/ArrowBackPurpleIcon";
import ModalPredictResult from "./ModalPredictResult";
import ModalPredictGoal from "./ModalPredictGoal";

const ModalPredictResultOrGoal = ({ setVisible, selectedMatch, visiblePredictResultOrGoal, setVisiblePredictResultOrGoal }) => {
    const [visiblePredictResult, setVisiblePredictResult] = useState(false)
    const [visiblePredictGoal, setVisiblePredictGoal] = useState(false)

    return (
        <>
            <div className="card flex justify-content-center">
                <Dialog
                    position="bottom"
                    visible={visiblePredictResultOrGoal}
                    onHide={() => { if (!visiblePredictResultOrGoal) return; setVisiblePredictResultOrGoal(false); }}
                    className="w-[50vw] min-h-[97vh] !important"
                    breakpoints={{ '960px': '75vw', '641px': '100vw' }}>
                    <ArrowBackPurpleIcon onClick={() => { if (!visiblePredictResultOrGoal) return; setVisiblePredictResultOrGoal(false); }} />

                    <div className='flex flex-col items-center justify-center'>
                        <span className='font-semibold text-title text-black'>¿Que vas a predecir?</span>
                        <span className='text-[18px]'>Selecciona una opción</span>
                    </div>

                    <section className="w-[90%] h-[179px] mx-auto flex flex-col justify-around mt-[35px] rounded-xl">
                        <div onClick={() => setVisiblePredictResult(true)} className="h-[77px] shadow-soft flex gap-3 items-center px-5 rounded-xl">
                            <BlueStadiumIcon />
                            <span className="font-semibold text-regular-18">Resultado final</span>
                        </div>
                        <div onClick={() => setVisiblePredictGoal(true)} className="h-[77px] shadow-soft flex gap-4 items-center px-5 rounded-xl">
                            <SoccerJerseyIcon />
                            <span className="font-semibold text-regular-18">Goles</span>
                        </div>
                    </section>
                </Dialog>
            </div>

            {/* MODAL PARA PREDECIR UN RESULTADO */}
            <ModalPredictResult
                selectedMatch={selectedMatch}
                visiblePredictResult={visiblePredictResult}
                setVisiblePredictResult={setVisiblePredictResult}
                setVisiblePredictResultOrGoal={setVisiblePredictResultOrGoal}
                setVisible={setVisible}
            />

            {/* MODAL PARA PREDECIR UN GOL */}
            <ModalPredictGoal
                selectedMatch={selectedMatch}
                visiblePredictGoal={visiblePredictGoal}
                setVisiblePredictGoal={setVisiblePredictGoal}
                setVisiblePredictResultOrGoal={setVisiblePredictResultOrGoal}
                setVisible={setVisible}
            />
        </>
    )
}
export default ModalPredictResultOrGoal
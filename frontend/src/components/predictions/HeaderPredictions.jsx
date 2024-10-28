import { Link } from "react-router-dom"
import ArrowBackIcon from "../../assets/icons/ArrowBackIcon"
import ButtonOutline from "../common/ButtonOutline";
import ModalMakePrediction from "./ModalMakePrediction";
import { useState } from "react";
import Navbar30NextDays from "../common/Navbar30NextDays";
import { getCurrentDate } from "../../utils/getCurrentDate";
import { getNext30Days } from "../../utils/getNext30Days";
import { convertToOriginalFormat } from "../../utils/convertToOriginalFormat";

const HeaderPredictions = () => {
    const currentDate = getCurrentDate()
    const dateList = getNext30Days(currentDate)
    const [selectedDate, setSelectedDate] = useState(0)
    const [visible, setVisible] = useState(false)
    const predictionDate = dateList[selectedDate] === "Todas" ? currentDate : convertToOriginalFormat(dateList[selectedDate]);

    return (
        <section className="bg-gradiente">
            <div className="w-[90%] mx-auto flex flex-col">
                <Link to='/matches' className="w-[90px] flex items-center gap-2 mt-7 text-white text-sm p-2 ps-0">
                    <ArrowBackIcon />
                    <span>Partidos</span>
                </Link>

                <div className="text-white flex flex-col items-center mb-5 mt-1">
                    <h1 className="font-semibold text-title">Tus predicciones</h1>
                    <span className="text-[59px] h-[60px]">4</span>
                    <span className="mt-3.5 text-primary">Predicciones disponibles</span>
                </div>

                {/* <div className="h-[48px] rounded-lg bg-white flex items-center justify-between p-2">
                    <div className="w-[35%] text-regular flex justify-end">
                        <span className="w-[110px] lg:w-full text-secondary">¿Te quedaste sin predicciones?</span>
                    </div>
                    <ButtonSolid>Comprar predicciones</ButtonSolid>
                </div> */}

                <Navbar30NextDays dateList={dateList} selectedDate={selectedDate} setSelectedDate={setSelectedDate} />

                <div className="mt-5 mb-7">
                    <ButtonOutline onClick={() => setVisible(true)} className='bg-white mx-auto px-5'>Hacer Predicción</ButtonOutline>
                </div>
            </div>

            <ModalMakePrediction dateFormatDM={dateList[selectedDate]} predictionDate={predictionDate} visible={visible} setVisible={setVisible} />
        </section>
    )
}
export default HeaderPredictions
import { Link } from "react-router-dom"
import ArrowBackIcon from "../../assets/icons/ArrowBackIcon"
import Button from "../common/Button"

const HeaderPredictions = () => {
    return (
        <section className="h-[286px] bg-gradiente">
            <div className="w-[90%] mx-auto flex flex-col">
                <Link to='/matches' className="w-[90px] flex items-center gap-2 mt-7 text-white text-sm p-2 ps-0">
                    <ArrowBackIcon />
                    <span>Partidos</span>
                </Link>

                <div className="text-white flex flex-col items-center mb-5 mt-1">
                    <h1 className="font-semibold text-title">Tus predicciones</h1>
                    <span className="text-[59px] h-[60px]">5</span>
                    <span className="mt-3.5 text-primary">Predicciones disponibles</span>
                </div>

                <div className="h-[48px] rounded-lg bg-white flex items-center justify-between p-2">
                    <div className="w-[35%] text-regular flex justify-end">
                        <span className="w-[110px] lg:w-full text-secondary">¿Te quedaste sin predicciones?</span>
                    </div>
                    <Button>Compras predicciones</Button>
                </div>
            </div>
        </section>
    )
}
export default HeaderPredictions
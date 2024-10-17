import ArrowForwardIcon from "../assets/icons/ArrowForwardIcon"
import RedMarkIcon from "../assets/icons/RedMarkIcon"
import TickIcon from "../assets/icons/TickIcon"
import Container from "../components/common/Container"

const CompletedPredictionsPage = () => {
    return (
        <Container>
            <div className="flex justify-between py-2">
                <span className="font-medium">Tus predicciones</span>
                <div className="flex gap-2 items-center">
                    <span className="text-purple">Ver todas</span>
                    <ArrowForwardIcon />
                </div>
            </div>

            {/* LISTADO DE PREDICCIONES REALIZADAS */}

            {/* SI NO HAY PREDICCIONES */}
            <div className="flex justify-between items-center shadow-soft rounded-xl py-2 px-5">
                <div className="flex flex-col text-regular-14">
                    <span>No hiciste predicciones</span>
                    <span className="text-secondary">Suerte la próxima</span>
                </div>
                <span className="text-blue">0 puntos</span>
            </div>

            {/* SI GANO */}
            <div className="shadow-soft rounded-xl">
                <div className="flex justify-between items-center py-3 px-5">
                    <div className="flex flex-col text-regular-14">
                        <span className="text-secondary">Resultado final</span>
                        <span className="capitalize">Barcelona</span>
                    </div>
                    <span className="text-blue">13 puntos</span>
                </div>
                <div className="flex items-center border-t-gray-400 border py-1 px-5">
                    <TickIcon />
                    <span className="text-sm text-secondary ms-2 mt-0.5">Ganaste 13 puntos con esta predicción</span>
                </div>
            </div>

            {/* SI PERDIO */}
            <div className="shadow-soft rounded-xl">
                <div className="flex justify-between items-center py-3 px-5">
                    <div className="flex flex-col text-regular-14">
                        <span className="text-secondary">Gol</span>
                        <span className="capitalize">Lionel Messi</span>
                    </div>
                    <span className="text-secondary line-through">13 puntos</span>
                </div>
                <div className="flex items-center border-t-gray-400 border py-1 px-5">
                    <RedMarkIcon />
                    <span className="text-sm text-secondary ms-2 mt-0.5">No ganaste puntos con esta predicción</span>
                </div>
            </div>


            <div className="py-2 mt-1">
                <span className="font-medium">Pronóstico general</span>
            </div>

            <div className="flex flex-col justify-center shadow-soft rounded-xl">
                <span className="py-2 px-5 text-secondary text-sm">Resultado final</span>

                <div className="w-full bg-soft-gray flex justify-center gap-10 py-5">
                    <div className="flex flex-col items-center">
                        <span className="text-regular text-secondary">Osasuna</span>
                        <span className="text-title font-semibold text-blue mt-1.5">48%</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="text-regular text-secondary">Empate</span>
                        <span className="text-title font-semibold text-blue mt-1.5">12%</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="text-regular text-secondary">Barcelona</span>
                        <span className="text-title font-semibold text-blue mt-1.5">40%</span>
                    </div>
                </div>
            </div>
        </Container>
    )
}
export default CompletedPredictionsPage
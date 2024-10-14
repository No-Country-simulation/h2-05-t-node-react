import { Link, NavLink } from "react-router-dom"
import ArrowBackBlueIcon from '../assets/icons/ArrowBackBlueIcon'
import ArrowForwardIcon from '../assets/icons/ArrowForwardIcon'
import BarcelonaImg from '../assets/img/barcelona.png'
import RealMadridImg from '../assets/img/realMadrid.png'

const MatchesCompletedPage = () => {
    return (
        <main className="h-[286px]" >
            <section className="w-[90%] mx-auto flex flex-col">
                <Link to='/matches' className="w-[90px] flex items-center gap-2 mt-7 text-blue text-sm p-2 ps-0">
                    <ArrowBackBlueIcon />
                    <span>Partidos</span>
                </Link>

                <div className="flex items-center py-[18px] justify-around gap-8 text-center">
                    <div className="w-[83px]">
                        <img className="mx-auto w-[88px] h-[88px] object-contain" src={RealMadridImg} alt="" />
                        <p className="capitalize text-secondary text-xs mt-[2px]">real madrid</p>
                    </div>

                    <div className="flex flex-col mb-3 justify-top">
                        <span className="text-base text-secondary font-semibold capitalize">finalizado</span>
                        <span className="text-medium ">3 - 3</span>
                    </div>

                    <div className="w-[83px]">
                        <img className="mx-auto w-[88px] h-[88px] object-contain" src={BarcelonaImg} alt="" />
                        <p className="capitalize text-secondary text-xs mt-[2px]">barcelona</p>
                    </div>
                </div>
            </section>

            <nav className='flex h-[53px] px-5 shadow-md'>
                <NavLink
                    to='/matches-completed'
                    // className={({ isActive }) => `w-[50%] flex justify-center items-center font-medium cursor-pointer border-b-[3.5px] ${isActive ? 'text-blue border-b-blue' : 'border-b-transparent'}`}>
                    className='w-[50%] flex justify-center items-center text-secondary font-medium cursor-pointer'>
                    Predicciones
                </NavLink>
                <NavLink
                    to='/matches-completed'
                    // className={({ isActive }) => `w-[50%] flex justify-center items-center font-medium cursor-pointer border-b-[3.5px] ${isActive ? 'text-blue border-b-blue' : 'border-b-transparent'}`}>
                    className='w-[50%] flex justify-center items-center text-secondary font-medium cursor-pointer'>
                    Detalles
                </NavLink>
                <NavLink
                    to='/matches-completed'
                    // className={({ isActive }) => `w-[50%] flex justify-center items-center font-medium cursor-pointer border-b-[3.5px] ${isActive ? 'text-blue border-b-blue' : 'border-b-transparent'}`}>
                    className='w-[50%] flex justify-center items-center text-secondary font-medium cursor-pointer'>
                    Clasificación
                </NavLink>
            </nav>

            <section className="w-[90%] mx-auto flex flex-col gap-3 mt-7">
                <div className="flex justify-between py-2">
                    <span className="font-medium">Tus predicciones</span>
                    <div className="flex gap-2 items-center">
                        <span className="text-purple">Ver todas</span>
                        <ArrowForwardIcon />
                    </div>
                </div>

                <div className="flex justify-between items-center shadow-soft rounded-xl py-2 px-5">
                    <div className="flex flex-col text-regular-14">
                        <span>No hiciste predicciones</span>
                        <span className="text-tertiary">Suerte la próxima</span>
                    </div>
                    <span className="text-blue">0 puntos</span>
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
            </section>
        </main >
    )
}
export default MatchesCompletedPage
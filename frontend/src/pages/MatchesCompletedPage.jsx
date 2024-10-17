import { Link, NavLink, Outlet } from "react-router-dom"
import ArrowBackBlueIcon from '../assets/icons/ArrowBackBlueIcon'
import BarcelonaImg from '../assets/img/barcelona.png'
import RealMadridImg from '../assets/img/realMadrid.png'

const MatchesCompletedPage = () => {
    return (
        <main>
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
                    to='predictions'
                    className={({ isActive }) => `w-[50%] flex justify-center items-center font-medium cursor-pointer border-b-[3.5px] ${isActive || window.location.pathname === '/matches-completed' ? 'text-blue border-b-blue' : 'border-b-transparent'}`}>
                    Predicciones
                </NavLink>
                <NavLink
                    to='details'
                    className={({ isActive }) => `w-[50%] flex justify-center items-center font-medium cursor-pointer border-b-[3.5px] ${isActive ? 'text-blue border-b-blue' : 'border-b-transparent'}`}>
                    Detalles
                </NavLink>
                <NavLink
                    to='classification'
                    className={({ isActive }) => `w-[50%] flex justify-center items-center font-medium cursor-pointer border-b-[3.5px] ${isActive ? 'text-blue border-b-blue' : 'border-b-transparent'}`}>
                    Clasificación
                </NavLink>
            </nav>

            <Outlet />
        </main >
    )
}
export default MatchesCompletedPage
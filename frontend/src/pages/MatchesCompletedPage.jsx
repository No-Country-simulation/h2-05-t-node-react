import { Link, NavLink, Outlet } from "react-router-dom"
import ArrowBackBlueIcon from '../assets/icons/ArrowBackBlueIcon'
import { useEffect, useState } from "react"

const MatchesCompletedPage = () => {
    const [completedMatch, setCompletedMatch] = useState(null)

    useEffect(() => {
        const storedMatch = localStorage.getItem('completedMatch');
        if (storedMatch) {
            setCompletedMatch(JSON.parse(storedMatch));
        }
    }, []);

    return (
        <main>
            <section className="w-[90%] mx-auto flex flex-col">
                <Link onClick={() => localStorage.clear()} to='/matches' className="w-[90px] flex items-center gap-2 mt-7 text-blue text-sm p-2 ps-0">
                    <ArrowBackBlueIcon />
                    <span>Partidos</span>
                </Link>

                <div className="flex items-center py-[18px] justify-around gap-8 text-center">
                    <div className="w-[83px]">
                        <img className="mx-auto w-[88px] h-[88px] object-contain" src={completedMatch?.team_home_badge} alt={`Img ${completedMatch?.awayTeam}`} />
                        <p className="capitalize text-secondary text-xs mt-[2px]">{completedMatch?.homeTeam}</p>
                    </div>

                    <div className="flex flex-col mb-3 justify-top">
                        <span className="text-base text-secondary font-semibold capitalize">finalizado</span>
                        <span className="text-medium ">{`${completedMatch?.hometeam_score} - ${completedMatch?.awayteam_score}`}</span>
                    </div>

                    <div className="w-[83px]">
                        <img className="mx-auto w-[88px] h-[88px] object-contain" src={completedMatch?.team_away_badge} alt={`Img ${completedMatch?.awayTeam}`} />
                        <p className="capitalize text-secondary text-xs mt-[2px]">{completedMatch?.awayTeam}</p>
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
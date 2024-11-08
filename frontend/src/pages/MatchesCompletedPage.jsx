import { useEffect, useState } from "react"
import { Link, NavLink, Outlet } from "react-router-dom"
import { formatDateToMD } from '../utils/formatDateToMD'
import DefaultTeam from '../assets/img/defaultTeam.png'
import ArrowBackBlueIcon from '../assets/icons/ArrowBackBlueIcon'
import Footer from "../components/layout/Footer"

const MatchesCompletedPage = () => {
    const [selectedMatch, setSelectedMatch] = useState(null)
    let date = formatDateToMD(selectedMatch?.match_date)

    useEffect(() => {
        const storedMatch = localStorage.getItem('selectedMatch')
        if (storedMatch) {
            setSelectedMatch(JSON.parse(storedMatch))
        }
    }, [])

    function getDate(dateString) {
        const date = new Date(dateString)
        return date.toISOString().split('T')[0]
    }

    const getTime = (dateTimeString) => {
        return dateTimeString.split("T")[1].split(":").slice(0, 2).join(":");
    }

    return (
        <main className="flex flex-col min-h-screen">
            <section className="w-[90%] mx-auto flex flex-col">
                {/* onClick={() => localStorage.removeItem('selectedMatch')} */}
                <Link to='/matches' className="w-[90px] flex items-center gap-2 mt-7 text-blue text-sm p-2 ps-0">
                    <ArrowBackBlueIcon />
                    <span>Partidos</span>
                </Link>

                <div className="flex items-center py-[18px] justify-around gap-8 text-center">
                    {/* Equipo local */}
                    <div className="w-[83px]">
                        <img className="mx-auto w-[88px] h-[88px] object-contain" src={selectedMatch?.teams.home.logo} alt={`Img ${selectedMatch?.teams.home.name}`} onError={(e) => { e.target.src = DefaultTeam }} />
                        <p className="capitalize text-secondary text-xs mt-[2px] max-w-[80px] truncate overflow-hidden whitespace-nowrap">{selectedMatch?.teams.home.name}</p>
                    </div>

                    {/* Estado partido */}
                    <div className="flex flex-col mb-3 justify-top">
                        <span className="text-base text-secondary font-semibold capitalize">
                            {
                                selectedMatch?.status.long == 'Match Finished' ? 'Finalizado'
                                    : selectedMatch?.status.long == 'Not Started' ? formatDateToMD(getDate(selectedMatch?.date))
                                        : selectedMatch?.status.long == 'First Half' ? '🔴 ' + selectedMatch?.status.elapsed + `'`
                                            : selectedMatch?.status.long == 'Second Half' ? '🔴 ' + selectedMatch?.status.elapsed + `'`
                                                : selectedMatch?.status.elapsed !== null ? 'M. tiempo'
                                                    : 'Pendiente'
                            }
                        </span>
                        <span className="text-medium ">
                            {
                                selectedMatch?.status.long === 'Not Started' && selectedMatch?.date ? (
                                    getTime(selectedMatch.date)
                                ) : (
                                    `${selectedMatch?.score.fulltime.home ?? selectedMatch?.score.halftime.home ?? "-"} - 
            ${selectedMatch?.score.fulltime.away ?? selectedMatch?.score.halftime.away ?? "-"}`
                                )
                            }
                        </span>
                    </div>

                    {/* Equipo visitante */}
                    <div className="w-[83px]">
                        <img className="mx-auto w-[88px] h-[88px] object-contain" src={selectedMatch?.teams.away.logo} alt={`Img ${selectedMatch?.teams.away.name}`} onError={(e) => { e.target.src = DefaultTeam }} />
                        <p className="capitalize text-secondary text-xs mt-[2px] max-w-[80px] truncate overflow-hidden whitespace-nowrap">{selectedMatch?.teams.away.name}</p>
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

            <div className="flex-grow h-[300px] overflow-scroll scrollbar-hide">
                <Outlet />
            </div>

            <Footer />
        </main >
    )
}
export default MatchesCompletedPage
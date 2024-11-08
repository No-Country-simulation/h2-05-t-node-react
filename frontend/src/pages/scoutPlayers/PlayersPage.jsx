import { Link, NavLink, Outlet, useLocation, useParams } from "react-router-dom"
import Footer from "../../components/layout/Footer"
import ArrowBackBlueIcon from "../../assets/icons/ArrowBackBlueIcon"
import DefaultUser from "../../assets/img/user.png"
import { useEffect, useState } from "react"

const PlayersPage = () => {
    const { id } = useParams()
    const [playerData, setPlayerData] = useState(null);

    useEffect(() => {
        const storedPlayerData = localStorage.getItem("playerData");
        if (storedPlayerData) {
            setPlayerData(JSON.parse(storedPlayerData))
        }
    }, [])

    return (
        <main className="flex flex-col min-h-screen">
            <section className="w-[90%] mx-auto flex flex-col">
                <Link to='/scout-players/ranking' className="w-[140px] flex items-center gap-2 mt-7 text-blue text-sm p-2 ps-0">
                    <ArrowBackBlueIcon />
                    <span>Scout Players</span>
                </Link>

                <div className="flex flex-col items-center pt-[30px] pb-[18px] justify-around gap-3 text-center">
                    <img className="w-[125.31px] h-[125.31px]" src={playerData?.photo} alt="Player" onError={(e) => { e.target.src = DefaultUser }} />
                    <h1 className="text-title font-semibold uppercase">
                        {playerData?.name.trim().includes(' ')
                            ? playerData?.name.trim().split(' ').slice(-1)
                            : playerData?.name.trim()
                        } / usdt
                    </h1>
                </div>
            </section>

            <nav className='flex h-[53px] shadow-md'>
                <NavLink
                    to='details'
                    className={({ isActive }) => `w-[50%] flex justify-center items-center font-medium cursor-pointer border-b-[3.5px] ${isActive || window.location.pathname === `/scout-players/ranking/players/${id}` ? 'text-blue border-b-blue' : 'border-b-transparent'}`}>
                    Detalles
                </NavLink>
                <NavLink
                    to='token'
                    className={({ isActive }) => `w-[50%] flex justify-center items-center font-medium cursor-pointer border-b-[3.5px] ${isActive ? 'text-blue border-b-blue' : 'border-b-transparent'}`}>
                    Token
                </NavLink>
            </nav>

            <div className="flex-grow h-[300px] overflow-scroll scrollbar-hide">
                <Outlet />
            </div>

            <Footer />
        </main >
    )
}
export default PlayersPage
import { Link, NavLink, Outlet, useNavigate, useParams } from "react-router-dom"
import Footer from "../../components/layout/Footer"
import ArrowBackBlueIcon from "../../assets/icons/ArrowBackBlueIcon"
import DefaultUser from "../../assets/img/user.png"

const PlayersPage = () => {
    const { id } = useParams()
    console.log({ idPlayer: id })

    return (
        <main className="flex flex-col min-h-screen">
            <section className="w-[90%] mx-auto flex flex-col">
                <Link to='/scout-players/ranking' className="w-[140px] flex items-center gap-2 mt-7 text-blue text-sm p-2 ps-0">
                    <ArrowBackBlueIcon />
                    <span>Scout Players</span>
                </Link>

                <div className="flex flex-col items-center pt-[30px] pb-[18px] justify-around gap-3 text-center">
                    <img className="w-[125.31px] h-[125.31px]" src={DefaultUser} alt="Player" onError={(e) => { e.target.src = DefaultUser }} />
                    <h1 className="text-title font-semibold">Nombre jugador</h1>
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

            <div className="flex-grow">
                <Outlet />
            </div>

            <Footer />
        </main >
    )
}
export default PlayersPage
import { NavLink } from "react-router-dom"

const NavbarScoutPlayers = () => {
    return (
        <nav className='flex h-[53px] shadow-md'>
            <NavLink
                to='ranking'
                className={({ isActive }) => `w-[32%] text-sm flex justify-center items-center font-medium cursor-pointer border-b-[3.5px] ${isActive || window.location.pathname === '/scout-players' ? 'text-blue border-b-blue' : 'text-tertiary border-b-transparent'}`}>
                Ranking
            </NavLink>
            <NavLink
                to='market'
                className={({ isActive }) => `w-[32%] text-sm flex justify-center items-center font-medium cursor-pointer border-b-[3.5px] ${isActive ? 'text-blue border-b-blue' : 'text-tertiary border-b-transparent'}`}>
                Market
            </NavLink>
            <NavLink
                to='statistics'
                className={({ isActive }) => `w-[36%] text-sm flex justify-center items-center font-medium cursor-pointer border-b-[3.5px] ${isActive ? 'text-blue border-b-blue' : 'text-tertiary border-b-transparent'}`}>
                Estadísticas token
            </NavLink>
        </nav>
    )
}
export default NavbarScoutPlayers
import { NavLink } from "react-router-dom"

const NavbarDivisions = () => {
    return (
        <nav className='flex h-[53px] shadow-md'>
            <NavLink
                to='ranking'
                className={({ isActive }) => `w-[50%] flex justify-center items-center font-medium cursor-pointer border-b-[3.5px] ${isActive || window.location.pathname === '/divisions' ? 'text-blue border-b-blue' : 'text-tertiary border-b-transparent'}`}>
                Ranking
            </NavLink>
            <NavLink
                to='rewards'
                className={({ isActive }) => `w-[50%] flex justify-center items-center font-medium cursor-pointer border-b-[3.5px] ${isActive ? 'text-blue border-b-blue' : 'text-tertiary border-b-transparent'}`}>
                Rewards
            </NavLink>
            <NavLink
                to='quests'
                className={({ isActive }) => `w-[50%] flex justify-center items-center font-medium cursor-pointer border-b-[3.5px] ${isActive ? 'text-blue border-b-blue' : 'text-tertiary border-b-transparent'}`}>
                Quests
            </NavLink>
        </nav>
    )
}
export default NavbarDivisions
import { NavLink } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className='w-full flex h-[53px] shadow-md'>
            <NavLink
                to='/login'
                className={({ isActive }) => `w-[50%] flex justify-center items-center font-medium cursor-pointer border-b-[3.5px] ${isActive ? 'text-blue border-b-blue' : 'border-b-transparent'}`}>
                Iniciar Sesión
            </NavLink>
            <NavLink
                to='/register'
                className={({ isActive }) => `w-[50%] flex justify-center items-center font-medium cursor-pointer border-b-[3.5px] ${isActive ? 'text-blue border-b-blue' : 'border-b-transparent'}`}>
                Registrate
            </NavLink>
        </nav>
    );
}

export default Navbar;

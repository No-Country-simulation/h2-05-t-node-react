import { NavLink } from 'react-router-dom';
import ScoutIcon from '../../assets/icons/ScoutIcon';
import CupIcon from '../../assets/icons/CupIcon';
import BallIcon from '../../assets/icons/BallIcon';

const Footer = () => {
    return (
        <footer className="flex justify-center gap-11 px-10 pt-4 pb-5 w-full bg-blue rounded-t-lg mt-5 text-xs font-medium tracking-tight text-center">
            <NavLink
                to='/scout-players'
                className={({ isActive }) => `flex flex-col items-center transition duration-500 ${isActive ? 'text-white' : 'text-opacity-30 text-white'}`}>
                <ScoutIcon className={({ isActive }) => isActive ? 'text-white' : 'text-opacity-30 text-white'} />
                <p className='mt-2.5'>Scout players</p>
            </NavLink>

            <NavLink
                to='/matches'
                className={({ isActive }) => `flex flex-col items-center transition duration-500 ${isActive ? 'text-white' : 'text-opacity-30 text-white'}`}>
                <BallIcon className={({ isActive }) => isActive ? 'text-white' : 'text-opacity-30 text-white'} />
                <p className='mt-2.5'>Partidos</p>
            </NavLink>

            <NavLink
                to='/divisions'
                className={({ isActive }) => `flex flex-col items-center transition duration-500 ${isActive ? 'text-white' : 'text-opacity-30 text-white'}`}>
                <CupIcon className={({ isActive }) => isActive ? 'text-white' : 'text-opacity-30 text-white'} />
                <p className='mt-2.5'>Divisiones</p>
            </NavLink>
        </footer>
    );
};

export default Footer;

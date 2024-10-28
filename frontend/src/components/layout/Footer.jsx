import { NavLink } from 'react-router-dom';
import ScoutIcon from '../../assets/icons/ScoutIcon';
import CupIcon from '../../assets/icons/CupIcon';
import BallIcon from '../../assets/icons/BallIcon';
import HomeIcon from '../../assets/icons/HomeIcon';

const Footer = () => {
    return (
        <footer className="flex justify-center gap-9 pt-4 pb-5 w-full bg-blue rounded-t-lg mt-5 text-xs font-medium tracking-tight text-center">
            <NavLink
                to='/'
                className={({ isActive }) => `flex flex-col items-center ${isActive ? 'text-white' : 'text-opacity-30 text-white'}`}>
                <HomeIcon className={({ isActive }) => isActive ? 'text-white' : 'text-opacity-30 text-white'} />
                <p className='mt-[11px] text-regular'>Home</p>
            </NavLink>
            <NavLink
                to='/scout-players'
                className={({ isActive }) => `flex flex-col items-center ${isActive ? 'text-white' : 'text-opacity-30 text-white'}`}>
                <ScoutIcon className={({ isActive }) => isActive ? 'text-white' : 'text-opacity-30 text-white'} />
                <p className='mt-[11px] text-regular'>Scout players</p>
            </NavLink>

            <NavLink
                to='/matches'
                className={({ isActive }) => `flex flex-col items-center ${isActive ? 'text-white' : 'text-opacity-30 text-white'}`}>
                <BallIcon className={({ isActive }) => isActive ? 'text-white' : 'text-opacity-30 text-white'} />
                <p className='mt-[11px] text-regular'>Partidos</p>
            </NavLink>

            <NavLink
                to='/divisions'
                className={({ isActive }) => `flex flex-col items-center ${isActive ? 'text-white' : 'text-opacity-30 text-white'}`}>
                <CupIcon className={({ isActive }) => isActive ? 'text-white' : 'text-opacity-30 text-white'} />
                <p className='mt-[11px] text-regular'>Divisiones</p>
            </NavLink>
        </footer>
    );
};

export default Footer;

import { useState } from 'react'
import ScoutIcon from '../../assets/icons/ScoutIcon'
import CupIcon from '../../assets/icons/CupIcon'
import BallIcon from '../../assets/icons/BallIcon'

const Footer = () => {
    // Obtener el estado desde param /seccion para que al 
    // recargar la pagina no vuelva por defecto a 'partidos'
    const [active, setActive] = useState('partidos')

    return (
        <footer className="flex justify-center mt-5 text-xs font-medium tracking-tight text-center">
            <ul className="flex gap-11 px-10 pt-4 pb-5 w-full bg-blue-500 rounded-t-lg">
                <li onClick={() => setActive('scout players')} className='flex flex-col items-center cursor-pointer'>
                    <ScoutIcon active={active} />
                    <p className={`mt-2.5 text-white ${active === 'scout players' ? '' : 'text-opacity-30'}`}>Scout players</p>
                </li>

                <li onClick={() => setActive('partidos')} className='flex flex-col items-center cursor-pointer'>
                    <BallIcon active={active} />
                    <p className={`mt-2.5 text-white ${active === 'partidos' ? '' : 'text-opacity-30'}`}>Partidos</p>
                </li>

                <li onClick={() => setActive('divisiones')} className='flex flex-col items-center cursor-pointer'>
                    <CupIcon active={active} />
                    <p className={`mt-2.5 text-white ${active === 'divisiones' ? '' : 'text-opacity-30'}`}>Divisiones</p>
                </li>
            </ul>
        </footer >
    )
}
export default Footer
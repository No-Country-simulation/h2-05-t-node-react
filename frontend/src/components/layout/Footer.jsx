import { useState } from 'react'
import ScoutIcon from '../../assets/icons/ScoutIcon'
import CupIcon from '../../assets/icons/CupIcon'
import BallIcon from '../../assets/icons/BallIcon'

const Footer = () => {
    // Obtener el estado desde param /seccion para que al 
    // recargar la pagina no vuelva por defecto a 'partidos'
    const [active, setActive] = useState('partidos')

    const handleActiveItem = (item) => {
        setActive(item)
    }

    return (
        <footer className="flex flex-col text-xs font-medium tracking-tight text-center">
            <ul className="flex justify-between px-10 pt-4 pb-5 w-full bg-blue-500 rounded-t-lg">
                <li onClick={() => handleActiveItem('scout players')} className='flex flex-col items-center cursor-pointer'>
                    <ScoutIcon active={active} />
                    <p className={`mt-2.5 text-white ${active === 'scout players' ? '' : 'text-opacity-30'}`}>Scout players</p>
                </li>

                <li onClick={() => handleActiveItem('partidos')} className='flex flex-col items-center cursor-pointer'>
                    <BallIcon active={active} />
                    <p className={`mt-2.5 text-white ${active === 'partidos' ? '' : 'text-opacity-30'}`}>Partidos</p>
                </li>

                <li onClick={() => handleActiveItem('divisiones')} className='flex flex-col items-center cursor-pointer'>
                    <CupIcon active={active} />
                    <p className={`mt-2.5 text-white ${active === 'divisiones' ? '' : 'text-opacity-30'}`}>Divisiones</p>
                </li>
            </ul>
        </footer >
    )
}
export default Footer
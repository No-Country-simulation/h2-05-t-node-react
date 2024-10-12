import { Link } from "react-router-dom"

const Navbar = () => {
    return (
        < nav className='w-full flex h-[53px] shadow-[0px_0px_10px_rgba(0,0,0,0.2)]' >
            <div className='w-[50%] flex justify-center items-center font-medium cursor-pointer'>
                <Link to='/login'>Iniciar Sesión</Link>
            </div>
            <div className='w-[50%] flex justify-center items-center font-medium cursor-pointer'>
                <Link to='/register'>Registrate</Link>
            </div>
        </nav >
    )
}
export default Navbar
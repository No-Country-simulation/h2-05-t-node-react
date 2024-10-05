import { useState } from "react"
import ButtonForm from "../common/ButtonForm"
import Input from "../common/Input"
import InputPassword from "../common/InputPassword"

const LoginForm = () => {
    const [showPassword, setShowPassword] = useState(false)

    const handleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    return (
        <form className='flex flex-col mx-auto items-center mt-8 w-[80%]'>
            <div className='w-full text-sm'>
                <Input htmlFor='emailOrPhone' text='Ingresa tu email o teléfono' id='emailOrPhone' />
            </div>
            <div className='w-full text-sm mt-4'>
                <InputPassword htmlFor='password' text='Contraseña' id='password' showPassword={showPassword} handleShowPassword={handleShowPassword} />
            </div>

            <a href="#" className='mt-3.5 mb-8 text-sm text-center text-blue-500 underline'>¿Olvidaste tu contraseña?</a>

            <ButtonForm text='Iniciar sesión' />
        </form>
    )
}
export default LoginForm
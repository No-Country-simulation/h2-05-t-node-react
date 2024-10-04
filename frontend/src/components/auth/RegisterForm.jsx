import { useState } from "react"
import Input from "../common/Input"
import InputPassword from "../common/InputPassword"
import ButtonForm from "../common/ButtonForm"


const RegisterForm = () => {
    const [showPassword, setShowPassword] = useState({
        password: false,
        repeatedPassword: false
    })

    const handleShowPassword = (name) => {
        setShowPassword(prevState => ({
            ...prevState,
            [name]: !prevState[name]
        }))
    }

    return (
        <form className='flex flex-col mx-auto items-center mt-8 w-[80%]'>
            <div className='w-full text-sm'>
                <Input htmlFor='username' text='Nombre de usuario' id='username' />
            </div>
            <div className='w-full text-sm mt-4'>
                <Input htmlFor='emailOrPhone' text='Ingresa tu email o teléfono' id='emailOrPhone' />
            </div>
            <div className='w-full text-sm mt-4'>
                <InputPassword htmlFor='password' text='Contraseña' id='password' showPassword={showPassword.password} handleShowPassword={() => handleShowPassword('password')} />
            </div>
            <div className='w-full text-sm mt-4 mb-8'>
                <InputPassword htmlFor='repeatedPassword' text='Repetir contraseña' id='repeatedPassword' showPassword={showPassword.repeatedPassword} handleShowPassword={() => handleShowPassword('repeatedPassword')} />
            </div>

            <ButtonForm text='Registrarse' />
        </form>
    )
}
export default RegisterForm
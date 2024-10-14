import { useState } from "react"
import Input from "../common/Input"
import InputPassword from "../common/InputPassword"
import Button from "../common/Button"

const initialFormValues = {
    emailOrPhone: '',
    password: ''
}

const LoginForm = () => {
    const [formValues, setFormValues] = useState(initialFormValues)
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState({})

    const handleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const handleValidation = () => {
        let newErrors = {}

        if (!formValues.emailOrPhone || !formValues.emailOrPhone.trim()) {
            newErrors.emailOrPhone = 'El email o teléfono es obligatorio.'
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValues.emailOrPhone) && !/^\d{10}$/.test(formValues.emailOrPhone)) {
            newErrors.emailOrPhone = 'Debes ingresar un email válido o un teléfono de 10 dígitos.'
        }

        if (!formValues.password || !formValues.password.trim()) {
            newErrors.password = 'La contraseña es obligatoria.'
        }

        setError(newErrors)

        return Object.keys(newErrors).length === 0
    }

    const handleChange = (e) => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        const isValid = handleValidation()

        if (!isValid) return

        console.log(formValues)
    }

    return (
        <form onSubmit={handleSubmit} className='flex flex-col mx-auto items-center mt-8 w-[80%]'>
            <div className='w-full text-sm'>
                <Input autoFocus name='emailOrPhone' handleChange={handleChange} value={formValues.emailOrPhone} htmlFor='emailOrPhone' text='Ingresa tu email o teléfono' id='emailOrPhone' />
                {error.emailOrPhone && <p className="text-red-500 text-sm mt-1">{error.emailOrPhone}</p>}
            </div>
            <div className='w-full text-sm mt-4'>
                <InputPassword name='password' handleChange={handleChange} value={formValues.password} htmlFor='password' text='Contraseña' id='password' showPassword={showPassword} handleShowPassword={handleShowPassword} />
                {error.password && <p className="text-red-500 text-sm mt-1">{error.password}</p>}
            </div>

            <a href="#" className='mt-3.5 mb-8 text-sm text-center text-blue underline'>¿Olvidaste tu contraseña?</a>

            <Button>Iniciar sesión</Button>
        </form>
    )
}
export default LoginForm
import { useState } from "react"
import Input from "../common/Input"
import InputPassword from "../common/InputPassword"
import ButtonSolid from '../common/ButtonSolid';
import { useNavigate } from "react-router-dom"

const initialFormValues = {
    username: '',
    emailOrPhone: '',
    password: '',
}

const RegisterForm = () => {
    const [formValues, setFormValues] = useState(initialFormValues)
    const [repeatedPassword, setRepeatedPassword] = useState('')
    const [showPassword, setShowPassword] = useState({
        password: false,
        repeatedPassword: false
    })
    const [error, setError] = useState({})
    const navigate = useNavigate()

    const handleShowPassword = (name) => {
        setShowPassword(prevState => ({
            ...prevState,
            [name]: !prevState[name]
        }))
    }

    const handleValidation = () => {
        let newErrors = {}

        if (!formValues.username || !formValues.username.trim()) {
            newErrors.username = 'El nombre de usuario es obligatorio.'
        }

        if (!formValues.emailOrPhone) {
            newErrors.emailOrPhone = 'El email o teléfono es obligatorio.'
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValues.emailOrPhone) && !/^\d{10}$/.test(formValues.emailOrPhone)) {
            newErrors.emailOrPhone = 'Debes ingresar un email válido o un teléfono de 10 dígitos.'
        }

        if (!formValues.password || !formValues.password.trim()) {
            newErrors.password = 'La contraseña es obligatoria.'
        } else if (formValues.password.length < 8) {
            newErrors.password = 'La contraseña debe tener al menos 8 caracteres.'
        }

        if (!repeatedPassword) {
            newErrors.repeatedPassword = 'Debes repetir la contraseña.'
        } else if (repeatedPassword !== formValues.password) {
            newErrors.repeatedPassword = 'Las contraseñas no coinciden.'
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
        e.preventDefault()
        const isValid = handleValidation()

        if (!isValid) return

        navigate('/login')
        // console.log(formValues)
    }

    return (
        <form onSubmit={handleSubmit} className='flex flex-col mx-auto items-center mt-8 w-[80%]'>
            <div className='w-full text-sm'>
                <Input autoFocus name='username' handleChange={handleChange} value={formValues.username} htmlFor='username' text='Nombre de usuario' id='username' />
                {error.username && <p className="text-red-500 text-sm mt-1">{error.username}</p>}
            </div>
            <div className='w-full text-sm mt-4'>
                <Input name='emailOrPhone' handleChange={handleChange} value={formValues.emailOrPhone} htmlFor='emailOrPhone' text='Ingresa tu email o teléfono' id='emailOrPhone' />
                {error.emailOrPhone && <p className="text-red-500 text-sm mt-1">{error.emailOrPhone}</p>}
            </div>
            <div className='w-full text-sm mt-4'>
                <InputPassword name='password' handleChange={handleChange} value={formValues.password} htmlFor='password' text='Contraseña' id='password' showPassword={showPassword.password} handleShowPassword={() => handleShowPassword('password')} />
                {error.password && <p className="text-red-500 text-sm mt-1">{error.password}</p>}
            </div>
            <div className='w-full text-sm mt-4 mb-8'>
                <InputPassword name='repeatedPassword' handleChange={e => setRepeatedPassword(e.target.value)} value={repeatedPassword} htmlFor='repeatedPassword' text='Repetir contraseña' id='repeatedPassword' showPassword={showPassword.repeatedPassword} handleShowPassword={() => handleShowPassword('repeatedPassword')} />
                {error.repeatedPassword && <p className="text-red-500 text-sm mt-1">{error.repeatedPassword}</p>}
            </div>

            <ButtonSolid>Registrarse</ButtonSolid>
        </form>
    )
}

export default RegisterForm

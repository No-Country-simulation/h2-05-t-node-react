import { useState } from "react"
import Input from "../common/Input"
import InputPassword from "../common/InputPassword"
import ButtonSolid from '../common/ButtonSolid';
import { useNavigate } from "react-router-dom"
import API_URL from '../../config.js';
import axios from "axios";
import AlertMessage from "../common/AlertMessage";

const initialFormValues = {
    username: '',
    email: '',
    password: '',
    photo: 'https://cdn-icons-png.flaticon.com/512/5951/5951752.png'
}

const RegisterForm = () => {
    const [formValues, setFormValues] = useState(initialFormValues)
    const [showAlert, setShowAlert] = useState(false)
    const [repeatedPassword, setRepeatedPassword] = useState('')
    const [showPassword, setShowPassword] = useState({
        password: false,
        repeatedPassword: false
    })
    const [error, setError] = useState({})

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

        if (!formValues.email) {
            newErrors.email = 'El email o teléfono es obligatorio.'
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValues.email) && !/^\d{10}$/.test(formValues.email)) {
            newErrors.email = 'Debes ingresar un email válido'
        }

        if (!formValues.password || !formValues.password.trim()) {
            newErrors.password = 'La contraseña es obligatoria.';
        } else if (formValues.password.length < 8) {
            newErrors.password = 'La contraseña debe tener al menos 8 caracteres.';
        } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(formValues.password)) {
            newErrors.password = 'La contraseña debe contener al menos un carácter especial.';
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

        axios.post(`${API_URL}/api/users`, formValues)
            .then(res => {
                if (res.data.status === 200 && res.data.statusMsg === 'Success') {
                    setShowAlert(true)
                }
            })
            .catch(error => console.log(error.response.data.errors))
    }

    return (
        <>
            <form onSubmit={handleSubmit} className='flex flex-col mx-auto items-center mt-8 w-[80%]'>
                <div className='w-full text-sm'>
                    <Input autoFocus name='username' handleChange={handleChange} value={formValues.username} htmlFor='username' text='Nombre de usuario' id='username' />
                    {error.username && <p className="text-red-500 text-sm mt-1">{error.username}</p>}
                </div>
                <div className='w-full text-sm mt-4'>
                    <Input name='email' handleChange={handleChange} value={formValues.email} htmlFor='email' text='Ingresa tu email o teléfono' id='email' />
                    {error.email && <p className="text-red-500 text-sm mt-1">{error.email}</p>}
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

            <AlertMessage showAlert={showAlert} setShowAlert={setShowAlert} redirect={true} route='/login'>
                Usuario creado exitosamente
            </AlertMessage>
        </>
    )
}

export default RegisterForm

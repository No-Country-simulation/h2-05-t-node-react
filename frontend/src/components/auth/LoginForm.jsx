import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Input from "../common/Input"
import InputPassword from "../common/InputPassword"
import ButtonSolid from '../common/ButtonSolid';
import axios from "axios";
import API_URL from "../../config";
import FormSpinner from "../common/FormSpinner";

const initialFormValues = {
    email: '',
    password: ''
}

const LoginForm = () => {
    const [formValues, setFormValues] = useState(initialFormValues)
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState({})
    const navigate = useNavigate()

    const handleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const handleValidation = () => {
        let newErrors = {}

        if (!formValues.email || !formValues.email.trim()) {
            newErrors.email = 'El email o teléfono es obligatorio.'
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValues.email) && !/^\d{10}$/.test(formValues.email)) {
            newErrors.email = 'Debes ingresar un email válido o un teléfono de 10 dígitos.'
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

        setLoading(true)
        axios.post(`${API_URL}/api/users/login`, formValues)
            .then(res => {
                if (res.data.status === 200 && res.data.statusMsg === 'Success') {
                    console.log(res.data.data)
                    localStorage.setItem('user', JSON.stringify(res.data.data))
                    navigate('/matches')
                }
            })
            .catch(error => console.log(error.response.data.errors))
            .finally(() => setLoading(false))
    }

    return (
        <form onSubmit={handleSubmit} className='flex flex-col mx-auto items-center mt-8 w-[80%]'>
            <div className='w-full text-sm'>
                <Input autoFocus name='email' handleChange={handleChange} value={formValues.email} htmlFor='email' text='Ingresa tu email o teléfono' id='email' />
                {error.email && <p className="text-red-500 text-sm mt-1">{error.email}</p>}
            </div>
            <div className='w-full text-sm mt-4'>
                <InputPassword name='password' handleChange={handleChange} value={formValues.password} htmlFor='password' text='Contraseña' id='password' showPassword={showPassword} handleShowPassword={handleShowPassword} />
                {error.password && <p className="text-red-500 text-sm mt-1">{error.password}</p>}
            </div>

            <a href="#" className='mt-3.5 mb-8 text-sm text-center text-blue underline'>¿Olvidaste tu contraseña?</a>

            <ButtonSolid>
                {
                    loading ?
                        <FormSpinner lock={loading} className='text-white' spinner={true} text='Iniciando..' />
                        :
                        'Iniciar sesión'
                }
            </ButtonSolid>
        </form>
    )
}
export default LoginForm
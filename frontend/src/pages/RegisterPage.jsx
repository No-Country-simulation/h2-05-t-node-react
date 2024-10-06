import GoogleButton from "../components/auth/GoogleButton"
import RegisterForm from "../components/auth/RegisterForm"
import WelcomeMessage from "../components/common/WelcomeMessage"
import Navbar from "../components/layout/Navbar"

const RegisterPage = () => {
    return (
        <>
            <Navbar />
            <WelcomeMessage title='Bienvenido a Waki,' message='Crea tu cuenta completando los datos' />
            <RegisterForm />
            <GoogleButton title='O registrate con' />
        </>
    )
}
export default RegisterPage
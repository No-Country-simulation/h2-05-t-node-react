import GoogleButton from "../components/auth/GoogleButton"
import NavbarAuth from "../components/auth/NavbarAuth"
import RegisterForm from "../components/auth/RegisterForm"
import WelcomeMessage from "../components/common/WelcomeMessage"

const RegisterPage = () => {
    return (
        <>
            <NavbarAuth />
            <WelcomeMessage title='Bienvenido a Waki,' message='Crea tu cuenta completando los datos' />
            <RegisterForm />
            <GoogleButton title='O registrate con' />
        </>
    )
}
export default RegisterPage
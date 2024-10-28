import GoogleButton from "../components/auth/GoogleButton"
import LoginForm from "../components/auth/LoginForm"
import WelcomeMessage from "../components/common/WelcomeMessage"
import Navbar from "../components/layout/Navbar"

const LoginPage = () => {
  return (
    <>
      <Navbar />
      <WelcomeMessage title='Bienvenido de nuevo,' message='Por favor, inicia sesión para disfrutar de todas las funciones' />
      <LoginForm />
      <GoogleButton title='O inicia sesión con' />
    </>
  )
}
export default LoginPage
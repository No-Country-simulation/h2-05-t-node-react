import GoogleButton from "../components/auth/GoogleButton"
import LoginForm from "../components/auth/LoginForm"
import WelcomeMessage from "../components/common/WelcomeMessage"
import Navbar from "../components/layout/Navbar"

const LoginPage = () => {
  return (
    <>
      <Navbar />
      <WelcomeMessage title='Welcome back,' message='Please login to enjoy full feature' />
      <LoginForm />
      <GoogleButton title='O inicia sesión con' />
    </>
  )
}
export default LoginPage
import LoginForm from "../components/auth/LoginForm"
import NavbarAuth from "../components/auth/NavbarAuth"
import WelcomeMessage from "../components/common/WelcomeMessage"
import GoogleButton from "../components/auth/GoogleButton"


const LoginPage = () => {
  return (
    <>
      <NavbarAuth />
      <WelcomeMessage title='Welcome back,' message='Please login to enjoy full feature' />
      <LoginForm />
      <GoogleButton title='O inicia sesión con' />
    </>
  )
}
export default LoginPage
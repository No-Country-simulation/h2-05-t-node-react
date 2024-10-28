import ButtonOutline from "../components/common/ButtonOutline"
import ButtonSolid from "../components/common/ButtonSolid"
import Avatar from '../assets/img/avatar1.png'
import RankingIcon from '../assets/icons/RankingIcon'
import ScoreIcon from '../assets/icons/ScoreIcon'
import Container from "../components/common/Container"
import { useNavigate } from "react-router-dom"
import ModalMakePrediction from "../components/predictions/ModalMakePrediction"
import { useState } from "react"
import NovedadesImg from '..//assets/img/novedades.png';
import PromocionesImg from '..//assets/img/promociones.png';
import Carrousel from "../components/common/Carrousel"
import Footer from "../components/layout/Footer"

const HomePage = () => {
    const [visible, setVisible] = useState(false)

    const navigate = useNavigate()

    return (
        <main className="flex flex-col min-h-screen">
            <section className="h-[300px] bg-gradiente">
                <div className="w-[90%] pt-5 mx-auto flex justify-between items-center text-white">
                    <div className="flex gap-3 items-center">
                        <img className="w-[30px] h-[30px] rounded-full" src={Avatar} alt={`Img Usuario`} />
                        <span className="font-semibold ">Hola, Usuario</span>
                    </div>
                    <div className="flex items-center">
                        <RankingIcon />
                        <span className="ms-1">1</span>
                        <ScoreIcon className='ms-3' />
                        <span className="ms-1">13 ptos.</span>
                    </div>
                </div>

                <div className="w-[90%] mx-auto mt-6 flex flex-col">
                    <div className="text-white flex flex-col items-center mb-5 mt-1">
                        <h1 className="font-semibold text-title">Mi Perfil</h1>
                        <span className="text-[59px] h-[60px]">4</span>
                        <span className="mt-3.5 text-primary">Predicciones disponibles</span>
                    </div>

                    <div className="w-full bg-white py-2.5 px-5 flex items-center justify-between rounded-lg gap-4 responsive-div">
                        <ButtonSolid onClick={() => setVisible(true)} className='shadow-soft w-full'>Hacer Predicción</ButtonSolid>
                        <ButtonOutline onClick={() => navigate('/me/predictions')} className='bg-white shadow-soft w-full'>Mis Predicciones</ButtonOutline>
                    </div>
                </div>
            </section>

            <section className="flex-grow">
                <Container>
                    <span className="capitalize mt-2">Novedades para vos</span>
                    <Carrousel imageOne={NovedadesImg} imageTwo={NovedadesImg} />

                    <span className="capitalize mt-4">Promociones</span>
                    <Carrousel imageOne={PromocionesImg} imageTwo={PromocionesImg} />
                </Container>
            </section>

            <ModalMakePrediction visible={visible} setVisible={setVisible} />

            <Footer />
        </main>
    )
}
export default HomePage
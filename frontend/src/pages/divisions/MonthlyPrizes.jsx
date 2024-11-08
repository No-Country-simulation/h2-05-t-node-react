import { useEffect, useState } from "react";
import ArrowBackRewards from "../../assets/icons/ArrowBackRewards";
import RewardFirstPlaceImg from "../../assets/img/rewardFirstPlace.png";
import RewardGoldDivisionImg from "../../assets/img/rewardGoldDivision.png";
import RewardSilverDivisionImg from "../../assets/img/rewardSilverDivision.png";
import RewardTokenPlayersImg from "../../assets/img/rewardTokenPlayers.png";
import RewardPriceOfTheMonthImg from "../../assets/img/rewardPrizeOfTheMonth.png";
import RewardItem from "../../components/divisions/RewardItem";
import Carrousel from "../../components/common/Carrousel";
import UsersTokenRanking from "../../components/divisions/UsersTokenRanking";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "../../components/layout/Footer";
import axios from "axios";
import API_URL from "../../config";

const rewardsByDivision = {
    1: [
        { img: RewardFirstPlaceImg, text: "El usuario en el primer puesto de esta división ganará el premio del mes." },
        { img: RewardGoldDivisionImg, text: "Participar en el sorteo mensual por el premio de la división Oro." },
        { img: RewardSilverDivisionImg, text: "Participar en el sorteo mensual por el premio de la división Plata." },
        { img: RewardTokenPlayersImg, text: "Acceso a los tokens de los jugadores de la división Oro y Plata." }
    ],
    2: [
        { img: RewardFirstPlaceImg, text: "El usuario en el primer puesto de esta división ganará el premio del mes." },
        { img: RewardSilverDivisionImg, text: "Participar en el sorteo mensual por el premio de la división Plata." },
    ],
    // 3: [
    //     { img: RewardFirstPlaceImg, text: "Aún no tienes recompensas." }
    // ]
}

const MonthlyPrizes = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [playersList, setPlayersList] = useState([])
    const [loading, setLoading] = useState(false)
    const { division, imgDivision } = location.state || {}
    let divisionNumber = division == 'oro' ? 1 : division == 'plata' ? 2 : 3

    useEffect(() => {
        setLoading(true)
        axios.get(`${API_URL}/api/token-info/`)
            .then(res => {
                // console.log(res.data.data)
                setPlayersList(res.data.data)
            })
            .catch(error => console.log(error))
            .finally(() => setLoading(false))
    }, [])

    return (
        <main className="flex flex-col min-h-screen justify-content-center mt-8">
            <ArrowBackRewards onClick={() => navigate('/divisions/rewards')} />

            <div className='flex flex-col items-center gap-3 justify-center mt-7'>
                <span className='font-medium text-title text-blue capitalize'>Division {division}</span>
                <img className="w-[79px] h-[105.33px] mx-auto" src={imgDivision} alt="Ranking" />
            </div>

            <section className='py-7 mt-5 bg-rewards-gray shadow-soft rounded-t-lg h-[300px] overflow-scroll scrollbar-hide flex-grow'>
                <div className="w-[90%] mx-auto flex flex-col gap-4">

                    {divisionNumber !== 3 && <h2 className="font-medium text-black">Recompensas</h2>}

                    <div className="w-full bg-white shadow-soft rounded-lg">
                        {
                            rewardsByDivision[divisionNumber]?.map((reward, index) => (
                                <RewardItem key={index} imgRewardItem={reward.img}>
                                    {reward.text}
                                </RewardItem>
                            ))
                        }
                    </div>

                    {divisionNumber !== 3 &&
                        <>
                            <h2 className="font-medium text-black">Premios del mes</h2>
                            <Carrousel className='w-[294.82px] h-[199.04px]' imageOne={RewardPriceOfTheMonthImg} imageTwo={RewardPriceOfTheMonthImg} />
                        </>
                    }
                    <h2 className="font-medium text-black capitalize">Tokens División {division}</h2>
                    <UsersTokenRanking playersList={playersList} divisionNumber={divisionNumber} />
                </div>
            </section>

            <Footer />
        </main>
    )
}
export default MonthlyPrizes
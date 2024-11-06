import { Dialog } from "primereact/dialog";
import ArrowBackRewards from "../../assets/icons/ArrowBackRewards";
import RewardFirstPlaceImg from "../../assets/img/rewardFirstPlace.png";
import RewardGoldDivisionImg from "../../assets/img/rewardGoldDivision.png";
import RewardSilverDivisionImg from "../../assets/img/rewardSilverDivision.png";
import RewardTokenPlayersImg from "../../assets/img/rewardTokenPlayers.png";
import RewardPriceOfTheMonthImg from "../../assets/img/rewardPrizeOfTheMonth.png";
import RewardItem from "./RewardItem";
import Carrousel from "../common/Carrousel";
import { useState } from "react";
import UsersTokenRanking from "./UsersTokenRanking";

const usersTokenRanking = [
    { id: 1, name: 'Jugador 1', released: '80k', price: 120 },
    { id: 2, name: 'Jugador 2', released: '50k', price: 95 },
    { id: 3, name: 'Jugador 3', released: '30k', price: 70 },
    { id: 4, name: 'Jugador 4', released: '60k', price: 110 },
    { id: 5, name: 'Jugador 5', released: '45k', price: 85 },
]

const ModalRewards = ({ visible, setVisible, division, imgDivision }) => {
    const [usersTokenRankingList, setUsersTokenRankingList] = useState(usersTokenRanking)

    return (
        <div className="card flex justify-content-center">
            <Dialog
                visible={visible}
                onHide={() => setVisible(false)}
                className="w-[50vw] min-h-[100vh] !important custom-dialog"
                breakpoints={{ '960px': '75vw', '641px': '100vw' }}
                closable={false}>
                <ArrowBackRewards onClick={() => { if (!visible) return; setVisible(false); }} />

                <div className='flex flex-col items-center gap-3 justify-center mt-7'>
                    <span className='font-semibold text-title text-blue capitalize'>Division {division}</span>
                    <img className="w-[79px] h-[105.33px] mx-auto" src={imgDivision} alt="Ranking" />
                </div>

                <section className='py-7 mt-5 bg-rewards-gray shadow-soft rounded-t-lg'>
                    <div className="w-[90%] mx-auto flex flex-col gap-4">

                        <h2 className="font-bold">Recompensas</h2>
                        <div className="w-full bg-white shadow-soft rounded-lg">
                            <RewardItem imgRewardItem={RewardFirstPlaceImg}>
                                El usuario en el primer puesto de esta división ganará el premio del mes.
                            </RewardItem>
                            <RewardItem imgRewardItem={RewardGoldDivisionImg}>
                                Participar en el sorteo mensual por el premio de la division Oro.
                            </RewardItem>
                            <RewardItem imgRewardItem={RewardSilverDivisionImg}>
                                Participar en el sorteo mensual por el premio de la division Plata.
                            </RewardItem>
                            <RewardItem imgRewardItem={RewardTokenPlayersImg}>
                                Acceso a los tokens de los jugadores de la división Oro y Plata
                            </RewardItem>
                        </div>

                        <h2 className="font-bold">Premios del mes</h2>
                        <Carrousel className='w-[294.82px] h-[199.04px]' imageOne={RewardPriceOfTheMonthImg} imageTwo={RewardPriceOfTheMonthImg} />

                        <h2 className="font-bold capitalize">Tokens División {division}</h2>
                        <UsersTokenRanking usersTokenRankingList={usersTokenRankingList} />
                    </div>
                </section>
            </Dialog>
        </div>
    )
}
export default ModalRewards
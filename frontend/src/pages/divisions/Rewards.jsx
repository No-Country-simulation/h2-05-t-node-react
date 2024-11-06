import { useEffect, useRef, useState } from "react"
import { ProgressBar } from 'primereact/progressbar'
import Container from "../../components/common/Container"
import GoldImg from '../../assets/img/divisionGold.png'
import SilverImg from '../../assets/img/divisionSilver.png'
import BronzeImg from '../../assets/img/divisionBronze.png'
import StarRankingIcon from '../../assets/icons/StarRankingIcon'
import CardRewardDivision from "../../components/divisions/CardRewardDivision"

const Rewards = () => {
    const [value, setValue] = useState(0);
    const interval = useRef(null);

    useEffect(() => {
        let _val = value;

        interval.current = setInterval(() => {
            _val += Math.floor(Math.random() * 15) + 5;

            if (_val >= 100) {
                _val = 100;
                clearInterval(interval.current);
            }

            setValue(_val);
        }, 50);

        return () => {
            if (interval.current) {
                clearInterval(interval.current);
                interval.current = null;
            }
        };
    }, [value])


    return (
        <Container>
            <div className="mx-auto text-center">
                <img className="w-[79px] h-[105.33px] mx-auto" src={GoldImg} alt="Ranking" />
                <p className="text-regular-18 mt-3">Estás en la</p>
                <span className="text-title text-blue font-bold">División Oro</span>
            </div>

            <section className="shadow-soft rounded-lg mt-8">
                <div className="h-[66px] text-white bg-blue flex justify-between items-center px-7 rounded-t-lg">
                    <div className="flex gap-3 items-center">
                        <StarRankingIcon />
                        <p className="text-regular-18">Tus Puntos</p>
                    </div>

                    <span className="text-[28px] semibold">9000</span>
                </div>

                <div className="w-[90%] mx-auto pb-8 pt-7">
                    <div className="flex justify-between mb-4 text-regular-14">
                        <p>Desbloquear división</p>
                        <p>9000 de 9000 puntos</p>
                    </div>
                    <div className="card relative">
                        <ProgressBar value={value} showValue={false} className="h-[44.74px] rounded-full custom-progress-bar-rewards" />
                        <div className="absolute left-12 transform -translate-x-1/2 top-1/2 -translate-y-1/2 text-white">
                            <div className="flex">
                                <img className="w-[17.48px] h-[23.31px] me-3" src={GoldImg} alt="Rank" />
                                <span>Oro</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="px-4 shadow-soft rounded-lg flex flex-col gap-1 py-3 mt-4">
                <h2 className="font-semibold text-blue text-title text-center mb-2">¡Premios todos los meses!</h2>

                <CardRewardDivision division='oro' imgDivision={GoldImg} />
                <CardRewardDivision division='plata' imgDivision={SilverImg} />
                <CardRewardDivision division='bronce' imgDivision={BronzeImg} />
            </section>
        </Container>
    )
}
export default Rewards
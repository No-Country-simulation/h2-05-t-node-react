import { ProgressBar } from "primereact/progressbar"
import GoldImg from '../../assets/img/divisionGold.png'
import Container from "../../components/common/Container"
import { useEffect, useRef, useState } from "react";
import AchievementItem from "../../components/divisions/AchievementItem";

const Quests = () => {
    const [value, setValue] = useState(0);
    const interval = useRef(null);

    useEffect(() => {
        let _val = value;

        interval.current = setInterval(() => {
            _val += Math.floor(Math.random() * 15) + 5;

            if (_val >= 66) {
                _val = 66;
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
            <div className="w-full h-[198.22px] mt-3 flex flex-col justify-center bg-gradiente rounded-lg text-white text-center">
                <div>
                    <p className="text-regular-18 font-medium">Tus Puntos</p>
                    <p className="text-[48px] leading-none mb-2 font-medium">9000</p>
                </div>

                <div className="w-[90%] mx-auto">
                    <p className="text-start ms-2 mb-1.5">200 de 300 puntos</p>
                    <div className="card relative">
                        <ProgressBar value={value} showValue={false} className="bg-[#BBBBBB] h-[44.74px] rounded-full custom-progress-bar-quests" />
                        <div className="absolute left-12 transform -translate-x-1/2 top-1/2 -translate-y-1/2 text-black">
                            <div className="flex">
                                <img className="w-[17.48px] h-[23.31px] me-3" src={GoldImg} alt="Rank" />
                                <span>Oro</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <h2 className="font-medium text-black mt-5">Logros</h2>
            <section className='w-full mt-5 shadow-soft rounded-t-lg'>
                <AchievementItem numerator={1} denominator={2} score={18} />
                <AchievementItem numerator={1} denominator={2} score={18} />
                <AchievementItem numerator={2} denominator={2} score={18} />
                <AchievementItem numerator={2} denominator={2} score={18} />
            </section>
        </Container>
    )
}
export default Quests
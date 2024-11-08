import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ButtonOutline from "../components/common/ButtonOutline";
import ButtonSolid from "../components/common/ButtonSolid";
import Avatar from "../assets/img/avatar1.png";
import RankingIcon from "../assets/icons/RankingIcon";
import BarcelonaImg from "../assets/img/barcelona.png";
import SerieAImg from "../assets/img/SerieA.png";
import LigaProfArgImg from "../assets/img/LigaProfesionalArg.png";
import AtleticoImg from "../assets/img/atletico.png";
import LaLigaImg from "../assets/img/LaLiga.png";
import ScoreIcon from "../assets/icons/ScoreIcon";
import Container from "../components/common/Container";
import ModalMakePrediction from "../components/predictions/ModalMakePrediction";
import AnualPrizeImg from "../assets/img/premioAnual.png";
import MonthlyPrizeImg from "../assets/img/premioMensual.png";
import Carrousel from "../components/common/Carrousel";
import Footer from "../components/layout/Footer";
import ArrowIcon from "../assets/icons/ArrowIcon";
import axios from "axios";
import { getCurrentDate } from "../utils/getCurrentDate";
import API_URL from "../config";
import { ProgressSpinner } from "primereact/progressspinner";

const favouriteMatches = [
    { id: 1, homeTeam: "Barcelona", awayTeam: "Atlético Madrid", date: "Dic 22", hour: "17:00" },
    // { id: 2, homeTeam: "Real Madrid", awayTeam: "Valencia", date: "Dec 5", hour: "20:00" },
];

const recommendedMatches = [
    { id: 1, league: "La Liga", country: "España", leagueImg: LaLigaImg },
    { id: 2, league: "Liga Profesional Argentina", country: "Argentina", leagueImg: LigaProfArgImg },
    { id: 3, league: "Serie A", country: "Italia", leagueImg: SerieAImg },
    // { id: 2, homeTeam: "Real Madrid", awayTeam: "Valencia", date: "Dec 5", hour: "20:00" },
];

const HomePage = () => {
    const [visible, setVisible] = useState(false);
    const [user, setUser] = useState(null);
    const currentDate = getCurrentDate()
    const [quota, setQuota] = useState(null);
    const [openIndexes, setOpenIndexes] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            const { token, user } = JSON.parse(storedUser);
            setUser(user);
        }
    }, []);

    useEffect(() => {
        if (!user?.id) return;

        axios.post(`${API_URL}/api/prediction-qouta`, {
            userId: user.id,
            date: currentDate
        })
            .then(res => {
                setQuota(res.data.data.daily_predictions_left);
            })
            .catch(error => console.log(error))
    }, [user?.id, currentDate]);

    const toggleAccordion = (index) => {
        if (openIndexes.includes(index)) {
            setOpenIndexes(openIndexes.filter((i) => i !== index));
        } else {
            setOpenIndexes([...openIndexes, index]);
        }
    };

    return (
        <main className="flex flex-col min-h-screen">
            <section className="h-[300px] bg-gradiente">
                <div className="w-[90%] pt-5 mx-auto flex justify-between items-center text-white">
                    <div className="flex gap-3 items-center">
                        <img
                            className="w-[30px] h-[30px] rounded-full border-2 border-gray-200"
                            src={user?.photo ? user?.photo : Avatar}
                            alt={`Img Usuario`}
                        />
                        <span className="font-semibold">Hola, {user?.name}</span>
                    </div>
                    <div className="flex items-center">
                        <RankingIcon />
                        <span className="ms-1">47</span>
                        <ScoreIcon className="ms-3" />
                        <span className="ms-1">60 ptos.</span>
                    </div>
                </div>

                <div className="w-[90%] mx-auto mt-6 flex flex-col">
                    <div className="text-white flex flex-col items-center mb-5 mt-1">
                        <h1 className="font-semibold text-title">Mis Predicciones</h1>
                        {
                            quota ?
                                <span className="text-[59px] h-[60px]">{quota}</span>
                                :
                                <ProgressSpinner style={{ width: '60px', height: '60px' }} className="spinner-white" strokeWidth="3" />
                        }
                        <span className="mt-3.5 text-primary">Predicciones disponibles</span>
                    </div>

                    <div className="w-full bg-white py-2.5 px-5 flex items-center justify-between rounded-lg gap-4 responsive-div">
                        {/* onClick={() => setVisible(true)} */}
                        <ButtonSolid className="shadow-soft w-full">
                            Hacer Predicción
                        </ButtonSolid>
                        <ButtonOutline onClick={() => navigate("/me/predictions")} className="bg-white shadow-soft w-full">
                            Mis Predicciones
                        </ButtonOutline>
                    </div>
                </div>
            </section>

            <section className="flex-grow mb-5 h-[300px] overflow-scroll scrollbar-hide">
                <Container>
                    <h2 className="font-medium text-black mb-3">Favoritos</h2>
                    {favouriteMatches.map((match, index) => (
                        <div key={match.id} className="border border-gray-300 shadow-soft rounded-lg mb-2">
                            <div className="px-4 h-[54px] flex items-center">
                                <button
                                    onClick={() => toggleAccordion(index)}
                                    className="flex items-center w-full rounded-lg focus:outline-none justify-between">
                                    <div className="flex items-center gap-3">
                                        <img className="w-[28px] h-[28px] object-contain" src={BarcelonaImg} alt="" />
                                        <span className="text-sm font-medium text-gray-700">
                                            {match.homeTeam}
                                        </span>
                                    </div>
                                    <span
                                        className={`transition-transform duration-300 ${openIndexes.includes(index) ? "transform rotate-180" : ""}`}>
                                        <ArrowIcon />
                                    </span>
                                </button>
                            </div>

                            {/* Despliegue */}
                            <div className={`overflow-hidden bg-[#F3F4F5] transition-max-height duration-300 ease-in-out ${openIndexes.includes(index) ? "max-h-40 p-4" : "max-h-0"}`} >
                                <p className="text-blue">Próximos Partidos</p>
                                <div className="flex justify-between items-center">
                                    <div>
                                        <div className="flex gap-3">
                                            <img className="w-[18px] h-[18px] object-contain" src={BarcelonaImg} alt="" />
                                            <span className="text-sm font-medium text-gray-700">
                                                {match.homeTeam}
                                            </span>
                                        </div>
                                        <div className="flex gap-3">
                                            <img className="w-[18px] h-[18px] object-contain" src={AtleticoImg} alt="" />
                                            <span className="text-sm font-medium text-gray-700">
                                                {match.awayTeam}
                                            </span>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-black font-medium">{match.date}</p>
                                        <p className="text-black font-medium">{match.hour}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    <h2 className="font-medium text-black my-3">Recomendado para ti</h2>
                    <div className="shadow-soft rounded-lg">
                        {recommendedMatches.map((match, index) => (
                            <div key={match.id} className={`border border-gray-300 ${index == 0 ? 'rounded-t-lg' : ''} `}>
                                <div className="px-4 h-[54px] flex items-center">
                                    <button
                                        // onClick={() => toggleAccordion(index)}
                                        className="flex items-center w-full rounded-lg focus:outline-none justify-between">
                                        <div className="flex items-center gap-3">
                                            <img className="w-[28px] h-[28px] object-contain" src={match.leagueImg} alt="" />
                                            <span className="text-sm font-medium text-gray-700">
                                                {match.country}
                                            </span>
                                            <span className="text-regular text-tertiary">
                                                {match.league}
                                            </span>
                                        </div>
                                        <span
                                            className={`transition-transform duration-300`}>
                                            <ArrowIcon />
                                        </span>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <h2 className="font-medium text-black mt-5 mb-3">Suscripciones Premium</h2>
                    <Carrousel
                        className="w-[294.82px] h-[199.04px]"
                        imageOne={AnualPrizeImg}
                        imageTwo={MonthlyPrizeImg}
                    />
                </Container>
            </section>

            <ModalMakePrediction visible={visible} setVisible={setVisible} />

            <Footer />
        </main>
    );
};

export default HomePage;

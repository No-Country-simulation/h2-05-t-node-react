import '../../App.css';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Dropdown from "../common/Dropdown";
import Button from "../common/ButtonSolid";
import MatchItem from './MatchItem';
import SkeletonList from '../common/SkeletonList';
import LaLigaImg from '../../assets/img/LaLiga.png'
import LigaProfesionalArgImg from '../../assets/img/LigaProfesionalArg.png'
import BundesligaImg from '../../assets/img/Bundesliga.png'
import Ligue1Img from '../../assets/img/Ligue1.png'
import SerieAImg from '../../assets/img/SerieA.png'
import PremierLeagueImg from '../../assets/img/PremierLeague.png'
import axios from 'axios';

const Leagues = ({ date }) => {
    const [selectedOption, setSelectedOption] = useState('')
    const [matchesData, setMatchesData] = useState([])
    const [loading, setLoading] = useState(false)
    const options = ['Ligas', 'Horario', 'Trending']

    useEffect(() => {
        setLoading(true)
        axios.get(`https://apifootboll.onrender.com/api_AllMatch?from=${date}&to=${date}`)
            .then(res => setMatchesData(res.data.data))
            .catch(error => console.log(error.message))
            .finally(() => setLoading(false))
    }, [date]);

    const targetLeagueIds = [
        "44", //Liga Profesional Argentina
        "152", // Premier League
        "207", // Serie A
        "168", // Ligue 1
        "175", // Bundesliga
        "302",  //La Liga
    ];

    const getCountryByLeagueId = (leagueId) => {
        switch (leagueId) {
            case "44":
                return "Argentina";
            case "152":
                return "Inglaterra";
            case "207":
                return "Italia";
            case "168":
                return "Francia";
            case "175":
                return "Alemania";
            case "302":
                return "España";
            default:
                return "Desconocido";
        }
    };

    const getLeagueImageById = (leagueId) => {
        switch (leagueId) {
            case "44":
                return LigaProfesionalArgImg;
            case "152":
                return PremierLeagueImg;
            case "207":
                return SerieAImg;
            case "168":
                return Ligue1Img;
            case "175":
                return BundesligaImg;
            case "302":
                return LaLigaImg;
            default:
                return "";
        }
    };

    const resultMatches = matchesData.reduce((acc, match) => {
        if (targetLeagueIds.includes(match.league_id)) {
            const leagueId = match.league_id;

            if (!acc[leagueId]) {
                acc[leagueId] = {
                    leagueName: match.league_name,
                    country: getCountryByLeagueId(leagueId),
                    leagueImg: getLeagueImageById(leagueId),
                    matches: []
                };
            }
            acc[leagueId].matches.push(match);
        }
        return acc;
    }, {});

    let leagues = Object.values(resultMatches);

    leagues.sort((a, b) => {
        return parseInt(b.matches[0].league_id) - parseInt(a.matches[0].league_id)
    });

    console.log(leagues)

    return (
        <section className="w-[90%] mx-auto">
            <div className="mt-5">
                <div className="flex justify-between items-center">
                    <p className="capitalize font-medium ms-1">{selectedOption || 'ligas'}</p>
                    <Link to='/predictions'>
                        <Button>Mis predicciones</Button>
                    </Link>
                </div>

                <Dropdown options={options} selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
            </div>

            {
                loading ?
                    <SkeletonList length={5} />
                    :
                    leagues.length == 0 ?
                        <p className="text-white py-5 rounded-md font-semibold border bg-gradiente-opacity text-center text-md mt-2">
                            No se encontraron partidos
                        </p>
                        :
                        <>
                            <div className="shadow-soft mt-1">
                                {leagues.map((league, index) => (
                                    <MatchItem key={league.leagueName} index={index} league={league} />
                                ))}
                            </div>
                        </>
            }
        </section>
    )
}
export default Leagues
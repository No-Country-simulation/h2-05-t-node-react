import { useState } from "react";
import LaLigaLogo from '../../assets/img/LaLiga.png';
import BundesligaLogo from '../../assets/img/Bundesliga.png';
import Ligue1Logo from '../../assets/img/Ligue1.png';
import SuperligaLogo from '../../assets/img/Superliga.png';
import SerieALogo from '../../assets/img/SerieA.png';
import MatchItem from "./MatchItem";

const teamsList = [
    {
        country: "España",
        league: "La Liga",
        logo: LaLigaLogo
    },
    {
        country: "Alemania",
        league: "Bundesliga",
        logo: BundesligaLogo
    },
    {
        country: "Francia",
        league: "Ligue 1",
        logo: Ligue1Logo
    },
    {
        country: "Argentina",
        league: "Superliga",
        logo: SuperligaLogo
    },
    {
        country: "Italia",
        league: "Serie A",
        logo: SerieALogo
    }
];

const MatchList = () => {
    const [teams, setTeams] = useState(teamsList)

    return (
        <>
            {teams.map((item, index) => (
                <MatchItem key={index} index={index} item={item} />
            ))}
        </>
    )
}
export default MatchList
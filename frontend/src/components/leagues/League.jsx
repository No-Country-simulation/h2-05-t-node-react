import FilterIcon from "../../assets/icons/FilterIcon"
import ButtonForm from "../common/ButtonForm"
import '../../App.css';
import { useState } from "react";
import ArrowIcon from "../../assets/icons/ArrowIcon";
import LaLigaLogo from '../../assets/img/LaLiga.png';
import BundesligaLogo from '../../assets/img/Bundesliga.png';
import Ligue1Logo from '../../assets/img/Ligue1.png';
import SuperligaLogo from '../../assets/img/Superliga.png';
import SerieALogo from '../../assets/img/SerieA.png';

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

const League = () => {
    const [openIndexes, setOpenIndexes] = useState([]);
    const [teams, setTeams] = useState(teamsList)

    const toggleAccordion = (index) => {
        if (openIndexes.includes(index)) {
            setOpenIndexes(openIndexes.filter((i) => i !== index));
        } else {
            setOpenIndexes([...openIndexes, index]);
        }
    };


    return (
        <main>
            {/* 1ER COMPONENTE */}
            <div className="w-[90%] mx-auto my-5">
                <div className="flex justify-between items-center mb-1">
                    <p className="capitalize font-medium ms-1">ligas</p>
                    <ButtonForm text='Mis predicciones' />
                </div>
                <div className="flex gap-3 items-center mb-2">
                    <FilterIcon />
                    <span className="font-medium text-sm">Ordenar por</span>
                </div>
            </div>

            {/* 2DO COMPONENTE */}
            <div className="w-[90%] shadow-soft mx-auto">
                {teams.map((item, index) => (
                    <div key={index} className={`border border-gray-300 ${index == 0 && 'rounded-t-lg'}`}>
                        <div className="px-4 py-2 shadow-sm h-[54px] flex items-center">
                            <button onClick={() => toggleAccordion(index)} className="flex items-center w-full rounded-lg focus:outline-none justify-between">
                                <div className="flex items-center">
                                    <img src={item.logo} width={36} alt={`Logo ${item.league}`} />
                                    <span className="ms-4">{item.country}</span>
                                    <span className="ms-3 capitalize text-sm text-gray-500">{item.league}</span>
                                </div>
                                <span className={`transition-transform duration-300 ${openIndexes.includes(index) ? 'transform rotate-180' : ''}`}>
                                    <ArrowIcon />
                                </span>
                            </button>
                        </div>
                        <div className={`overflow-hidden transition-max-height duration-300 ease-in-out ${openIndexes.includes(index) ? 'max-h-80' : 'max-h-0'}`}>
                            <div className="p-5 bg-[#F3F4F5]">
                                <p className="text-center text-red-500 italic">COMPLETAR</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    )
}
export default League
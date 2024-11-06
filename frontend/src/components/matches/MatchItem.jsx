import { useState } from "react";
import ArrowIcon from "../../assets/icons/ArrowIcon";
import MatchDetail from "./MatchDetail";


const MatchItem = ({ index, league }) => {
    const [openIndexes, setOpenIndexes] = useState([]);

    const toggleAccordion = (index) => {
        if (openIndexes.includes(index)) {
            setOpenIndexes(openIndexes.filter((i) => i !== index));
        } else {
            setOpenIndexes([...openIndexes, index]);
        }
    }

    return (
        <div className={`border border-gray-300 ${index == 0 && 'rounded-t-lg'}`}>
            <div className="px-4 shadow-sm h-[54px] flex items-center">
                <button onClick={() => toggleAccordion(index)} className="flex items-center w-full rounded-lg focus:outline-none justify-between">
                    <div className="flex items-center">
                        <img src={league.leagueImg} width={36} alt='imagen' />
                        <span className="ms-4">{league.country}</span>
                        <span className={`${league.leagueName == 'UEFA Champions League' || league.leagueName == 'UEFA Europa League' ? 'ms-1.5' : 'ms-3'} capitalize text-sm mt-1 text-gray-500`}>{league.leagueName}</span>
                    </div>
                    <span className={`transition-transform duration-300 ${openIndexes.includes(index) ? 'transform rotate-180' : ''}`}>
                        <ArrowIcon />
                    </span>
                </button>
            </div>

            <div className={`overflow-hidden transition-max-height duration-300 ease-in-out ${openIndexes.includes(index) ? 'h-auto' : 'max-h-0'}`}>
                <MatchDetail league={league} />
            </div>
        </div>
    )
}
export default MatchItem
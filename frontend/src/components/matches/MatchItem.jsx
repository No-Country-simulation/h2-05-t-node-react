import { useState } from "react";
import ArrowIcon from "../../assets/icons/ArrowIcon";
import MatchDetail from "./MatchDetail";
import DefaultTeam from '../../assets/img/defaultTeam.png'

const MatchItem = ({ index, league }) => {
    const [openIndexes, setOpenIndexes] = useState([]);
    // const idLeague = league?.matches[0].league_id

    // Obtener las imagenes de las ligas
    // useEffect(() => {
    //     axios.get(`http://localhost:8080/api_league?id=${50}`)
    //         .then(res => {
    //             console.log(res.data.data)
    //         })
    //         .catch(error => console.log(error))
    // }, [])

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
                        <img src={league.league.logo} width={36} alt='liga' onError={(e) => { e.target.src = DefaultTeam }} />
                        <span className="ms-4">{league.league.country}</span>
                        <span className={`capitalize text-start text-sm mt-1 ms-3 text-gray-500`}>{league.league.name}</span>
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
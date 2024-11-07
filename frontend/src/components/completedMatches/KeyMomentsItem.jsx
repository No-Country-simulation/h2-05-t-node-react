import { useState } from "react";
import ArrowIcon from "../../assets/icons/ArrowIcon";

const KeyMomentsItem = ({ index, item, selectedMatch }) => {
    const [openIndexes, setOpenIndexes] = useState([])

    const toggleAccordion = (index) => {
        if (openIndexes.includes(index)) {
            setOpenIndexes(openIndexes.filter((i) => i !== index))
        } else {
            setOpenIndexes([...openIndexes, index])
        }
    }

    return (
        <div className={`border border-gray-300 ${index == 0 && 'rounded-t-lg'}`}>
            <div className="px-4 py-2 shadow-sm h-[54px] flex items-center">
                <button onClick={() => toggleAccordion(index)} className="flex items-center w-full rounded-lg focus:outline-none justify-between">
                    <div className="flex items-center">
                        <item.logo width={36} height={36} />
                        <span className="ms-3">{item.title}</span>
                    </div>
                    <span className={`transition-transform duration-300 ${openIndexes.includes(index) ? 'transform rotate-180' : ''}`}>
                        <ArrowIcon />
                    </span>
                </button>
            </div>


            <div className={`overflow-hidden transition-max-height duration-300 ease-in-out ${openIndexes.includes(index) ? 'max-h-80' : 'max-h-0'}`}>
                <div className="bg-[#F3F4F5]">
                    <div className="flex flex-col justify-center items-start text-center">
                        {
                            item.title === 'Goles' ? (
                                selectedMatch?.goals && selectedMatch?.goals.length > 0 ? (
                                    selectedMatch.goals.map((goal, i) => (
                                        <div key={i} className="w-full px-[45px] py-1 mx-auto flex items-center justify-between border-b border-gray-300">
                                            <div>
                                                <span>{goal.time}'</span>
                                                <span className="ms-4 text-secondary">{goal.home_scorer || goal.away_scorer}</span>
                                            </div>
                                            <span className="text-center w-[50px]">{goal.score}</span>
                                        </div>
                                    ))
                                ) : (
                                    <div className="w-full px-[45px] py-1 mx-auto flex items-center justify-between border-b border-gray-300">
                                        <div>
                                            <span className="text-secondary">{(selectedMatch?.goals.home == null && selectedMatch?.goals.away == null) && selectedMatch?.status == 'Match Finished' ? 'Sin Goles' : 'Pendiente'}</span>
                                        </div>
                                    </div>
                                )
                            ) : (
                                <div className="w-full px-[45px] py-1 mx-auto flex items-center justify-between border-b border-gray-300">
                                    <div>
                                        {/* <span>20'</span> */}
                                        {/* <span className="ms-4 text-secondary">Nombre Jugador</span> */}
                                        <span className="text-secondary">Pendiente</span>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>

        </div>
    )
}
export default KeyMomentsItem
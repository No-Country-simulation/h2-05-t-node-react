import { useState } from "react";
import ArrowIcon from "../../assets/icons/ArrowIcon";

const MatchItem = ({ index, item }) => {
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
                    <p className="text-center text-blue-500 italic">EN PROGRESO</p>
                </div>
            </div>
        </div>
    )
}
export default MatchItem
import { useState } from "react";
import ArrowIcon from "../../assets/icons/ArrowIcon";

const KeyMomentsItem = ({ index, item }) => {
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
                    <item.logo width={36} height={36} /> 
                    <span className="ms-3">{item.title}</span>
                    </div>
                    <span className={`transition-transform duration-300 ${openIndexes.includes(index) ? 'transform rotate-180' : ''}`}>
                        <ArrowIcon />
                    </span>
                </button>
            </div>


            <div className={`overflow-hidden transition-max-height duration-300 ease-in-out ${openIndexes.includes(index) ? 'max-h-80' : 'max-h-0'}`}>
                <div className="p-[18px] bg-[#F3F4F5] ">

                    <div className="flex items-center text-center">
                        <p className="ms-8">72' <span className="ms-4 text-secondary">Nombre y apellido</span></p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default KeyMomentsItem
import { useEffect, useRef, useState } from "react";
import FilterIcon from "../../assets/icons/FilterIcon";

const options = ['Valor', 'Liga', 'Minutos Jugados', 'Asistencia', 'Edad']

const FilterOptionsSP = () => {
    const [selectedOption, setSelectedOption] = useState(options[0]);

    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null)

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false)
        }
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    const handleToggle = () => {
        setIsOpen(!isOpen)
    }

    const handleSelect = (option) => {
        setSelectedOption(option)
        setIsOpen(false)
    }

    return (
        <div className="relative mt-3" ref={dropdownRef}>
            <button onClick={handleToggle} className="flex items-center rounded-md pe-4 py-2 shadow-sm focus:outline-none">
                <FilterIcon isOpen={isOpen} />
                <span className="ms-2 text-sm">Ordenar Por: <span className="text-secondary">{selectedOption}</span></span>
            </button>

            {isOpen && (
                <ul className="absolute bg-[#F3F4F5] mt-1 w-[184.81px] border border-gray-300 rounded-b-md shadow-lg z-10">
                    {options.map((option, index) => (
                        <li key={index} onClick={() => handleSelect(option)} className="px-4 border py-2 text-sm hover:bg-gray-100 cursor-pointer">
                            {option}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}
export default FilterOptionsSP
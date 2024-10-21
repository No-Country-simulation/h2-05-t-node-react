import { useState } from "react";
import ButtonSolid from '../common/ButtonSolid';
import Dropdown from "../common/Dropdown"

const options = ['Ligas', 'Horario', 'Trending']

const FilterOption = () => {
    const [selectedOption, setSelectedOption] = useState('');

    return (
        <div className="w-[90%] mx-auto mt-5">
            <div className="flex justify-between items-center">
                <p className="capitalize font-medium ms-1">{selectedOption || 'ligas'}</p>
                <ButtonSolid>Mis Predicciones</ButtonSolid>
            </div>

            <Dropdown options={options} selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
        </div>
    )
}
export default FilterOption
import ButtonForm from "../common/ButtonForm"
import '../../App.css';
import { useState } from "react";
import Dropdown from "../common/Dropdown";
import MatchList from "./MatchList";

const options = ['Ligas', 'Horario', 'Trending']

const Leagues = () => {
    const [selectedOption, setSelectedOption] = useState('');

    return (
        <section>
            <div className="w-[90%] mx-auto mt-5">
                <div className="flex justify-between items-center">
                    <p className="capitalize font-medium ms-1">{selectedOption || 'ligas'}</p>
                    <ButtonForm text='Mis predicciones' />
                </div>

                <Dropdown options={options} selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
            </div>

            <div className="w-[90%] shadow-soft mx-auto mt-1">
                <MatchList />
            </div>
        </section>
    )
}
export default Leagues
import ButtonForm from "../common/Button"
import '../../App.css';
import { useState } from "react";
import Dropdown from "../common/Dropdown";
import MatchList from "./MatchList";
import Button from "../common/Button";
import { Link } from "react-router-dom";

const options = ['Ligas', 'Horario', 'Trending']

const Leagues = () => {
    const [selectedOption, setSelectedOption] = useState('');

    return (
        <section className="w-[90%] mx-auto">
            <div className="mt-5">
                <div className="flex justify-between items-center">
                    <p className="capitalize font-medium ms-1">{selectedOption || 'ligas'}</p>
                    <Link to='/predictions'>
                        <Button>Mis predicciones</Button>
                    </Link>
                </div>

                <Dropdown options={options} selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
            </div>

            <div className="shadow-soft mt-1">
                <MatchList />
            </div>
        </section>
    )
}
export default Leagues
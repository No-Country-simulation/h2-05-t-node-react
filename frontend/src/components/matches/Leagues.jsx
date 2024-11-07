import '../../App.css';
import { useState } from "react";
import { Link } from "react-router-dom";
import Dropdown from "../common/Dropdown";
import MatchItem from './MatchItem';
import SkeletonList from '../common/SkeletonList';
import ButtonSolid from '../common/ButtonSolid'

const Leagues = ({ leagues, date, loading }) => {
    const [selectedOption, setSelectedOption] = useState('')
    const options = ['Ligas', 'Horario', 'Trending']

    return (
        <section className="w-[90%] mx-auto flex-grow mb-5 h-[400px] overflow-scroll scrollbar-hide">
            <div>
                <div className="flex justify-between items-center">
                    <p className="capitalize font-medium ms-1">{selectedOption || 'ligas'}</p>
                    <Link to='/me/predictions'>
                        <ButtonSolid>Mis predicciones</ButtonSolid>
                    </Link>
                </div>

                <Dropdown options={options} selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
            </div>

            {
                loading ?
                    <SkeletonList height='3.7rem' length={5} />
                    :
                    leagues?.length == 0 ?
                        <p className="text-white py-5 rounded-md font-semibold border bg-gradiente text-center text-md mt-2">
                            No se encontraron partidos
                        </p>
                        :
                        <>
                            {/* h-[450px] overflow-scroll scrollbar-hide border border-black */}
                            <div className="shadow-soft rounded-lg">
                                {leagues?.map((league, index) => (
                                    <MatchItem key={league.league.id} index={index} league={league} />
                                ))}
                            </div>
                        </>
            }
        </section>
    )
}
export default Leagues
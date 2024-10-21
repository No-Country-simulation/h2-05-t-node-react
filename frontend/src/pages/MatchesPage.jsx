import Leagues from '../components/matches/Leagues';
import group954 from '../assets/img/group-954.png';
import { useState } from 'react';
import { getCurrentDate } from '../utils/getCurrentDate';
import axios from 'axios';

const MatchesPage = () => {
    const [date, setDate] = useState(getCurrentDate)
    const [searchData, setSearchData] = useState('')
    const [playerData, setPlayerData] = useState([])
    const [loading, setLoading] = useState(false)

    console.log(date)
    
    const handleSearch = (e) => {
        e.preventDefault(); 

        setLoading(true)
        axios.get(`https://apifootboll.onrender.com/api_Oneplayers?name=${searchData}`)
            .then(res => {
                console.log('Datos del jugador: ', res.data)
                setPlayerData(res.data)
            })
            .catch(error => console.error(error.message))
            .finally(() => setLoading(false))
    }

    return (
        <main>
            {/* HEADER CON SEARCH */}
            <section>
                <div className='h-[95px] flex items-end justify-center'>
                    <span className='font-semibold text-blue text-title'>Partidos</span>
                    <div className='absolute right-5 mb-1.5'>
                        <div className="relative w-[25px]">
                            <input type="date" className="w-full h-5 text-white px-2 opacity-5 focus:outline-none"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                style={{ position: 'relative' }}
                            />
                            <img className="absolute w-[18px] h-5 top-[1px] right-[4px] cursor-pointer"
                                alt="Img Calendario"
                                src={group954}
                                onClick={() => document.querySelector('input[type="date"]').showPicker()}
                            />
                        </div>
                    </div>
                </div>
                <div className='py-4 text-center shadow'>Barra de Fechas</div>

                <form className='w-full text-center' onSubmit={handleSearch}>
                    <input value={searchData} onChange={e => setSearchData(e.target.value)} className=' w-[90%] bg-search py-2 px-4 mt-6 border border-gray rounded-lg outline-blue' type="search" placeholder='Buscar un jugador' />
                </form>
                {loading && <p className='text-center mt-2'>Buscando jugador...</p>}
            </section>

            <Leagues date={date} />
        </main>
    );
};

export default MatchesPage;

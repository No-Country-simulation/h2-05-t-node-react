import Leagues from '../components/matches/Leagues';
import CalendarioImg from '../assets/img/calendarioImg.png';
import { useState } from 'react';
import { getCurrentDate } from '../utils/getCurrentDate';
import SearchBar from '../components/common/SearchBar';
import Footer from '../components/layout/Footer';
import NavbarDate from '../components/common/NavbarDate';

const MatchesPage = () => {
    const [date, setDate] = useState(getCurrentDate)
    const [searchData, setSearchData] = useState('')

    console.log({currentDate: date})

    const handleSearch = (e) => {
        e.preventDefault();
    }

    return (
        <main className="flex flex-col min-h-screen">
            {/* HEADER CON SEARCH */}
            <header>
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
                                src={CalendarioImg}
                                onClick={() => document.querySelector('input[type="date"]').showPicker()}
                            />
                        </div>
                    </div>
                </div>

                {/* BARRA DE FECHAS */}
                <NavbarDate date={date} setDate={setDate} />

                <div className='w-[90%] mx-auto'>
                    <SearchBar handleSearch={handleSearch} searchData={searchData} setSearchData={setSearchData} autoFocus={false} placeholder={'Buscar Liga'} />
                </div>
            </header>

            <Leagues date={date} />

            <Footer />
        </main>
    );
};

export default MatchesPage;

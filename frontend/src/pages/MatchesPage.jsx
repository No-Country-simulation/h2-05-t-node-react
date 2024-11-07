import { useEffect, useState } from 'react';
import { getCurrentDate } from '../utils/getCurrentDate';
import Leagues from '../components/matches/Leagues';
import CalendarioImg from '../assets/img/calendarioImg.png';
import Footer from '../components/layout/Footer';
import NavbarDate from '../components/common/NavbarDate';
import axios from 'axios';
import SearchIcon from '../assets/icons/SearchIcon';

const MatchesPage = () => {
    const [date, setDate] = useState(getCurrentDate);
    const [searchData, setSearchData] = useState('');
    const [leagues, setLeagues] = useState([]);
    const [filteredMatchesData, setFilteredMatchesData] = useState([]);
    const [loading, setLoading] = useState(false);

    const onSearchChange = (e) => {
        const searchValue = e.target.value;
        setSearchData(searchValue);

        const filteredData = matchesData.filter((league) =>
            league.leagueName.toLowerCase().includes(searchValue.toLowerCase())
        );
        setFilteredMatchesData(filteredData);
    };

    // API NUEVA
    useEffect(() => {
        setLoading(true);
        Promise.all([
            axios.get(`https://apifootboll.onrender.com/api_fixture?from=${date}&to=${date}&league=140&season=2024`),
            axios.get(`https://apifootboll.onrender.com/api_fixture?from=${date}&to=${date}&league=128&season=2024`)
        ])
            .then(responses => {
                const dataLeague140 = responses[0]?.data?.data || [];
                const dataLeague128 = responses[1]?.data?.data || [];

                const combinedData = {
                    leagues: [
                        dataLeague140.length > 0 ? {
                            league: {
                                id: dataLeague140[0].league?.id || 'N/A',
                                name: dataLeague140[0].league?.name || 'N/A',
                                country: dataLeague140[0].league?.country || 'N/A',
                                logo: dataLeague140[0].league?.logo || '',
                                flag: dataLeague140[0].league?.flag || ''
                            },
                            matches: dataLeague140.map(match => ({
                                fixtureId: match?.fixtureId || 'N/A',
                                date: match?.date || 'N/A',
                                referee: match?.referee || 'N/A',
                                venue: match?.venue || 'N/A',
                                status: match?.status || {},
                                teams: match?.teams || {},
                                goals: match?.goals || {},
                                score: match?.score || {}
                            }))
                        } : null,
                        dataLeague128.length > 0 ? {
                            league: {
                                id: dataLeague128[0].league?.id || 'N/A',
                                name: dataLeague128[0].league?.name || 'N/A',
                                country: dataLeague128[0].league?.country || 'N/A',
                                logo: dataLeague128[0].league?.logo || '',
                                flag: dataLeague128[0].league?.flag || ''
                            },
                            matches: dataLeague128.map(match => ({
                                fixtureId: match?.fixtureId || 'N/A',
                                date: match?.date || 'N/A',
                                referee: match?.referee || 'N/A',
                                venue: match?.venue || 'N/A',
                                status: match?.status || {},
                                teams: match?.teams || {},
                                goals: match?.goals || {},
                                score: match?.score || {}
                            }))
                        } : null,
                    ].filter(Boolean)
                };

                setLeagues(combinedData);
            })
            .catch(error => console.error('Error fetching data:', error))
            .finally(() => setLoading(false));
    }, [date]);

    return (
        <main className="flex flex-col min-h-screen">
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

                <NavbarDate date={date} setDate={setDate} />

                {/* BARRA DE BÚSQUEDA */}
                <div className='w-[90%] mx-auto my-5'>
                    <div className='relative text-center'>
                        <SearchIcon className='absolute bottom-2 left-5' />
                        <input
                            value={searchData}
                            onChange={onSearchChange}
                            autoFocus
                            className='w-full bg-search py-2 ps-[55px] pe-4 border border-gray rounded-lg outline-blue'
                            type="search"
                            placeholder="Buscar liga..."
                        />
                    </div>
                </div>
            </header>

            <Leagues leagues={leagues.leagues || []} date={date} loading={loading} />

            <Footer />
        </main>
    );
};

export default MatchesPage;

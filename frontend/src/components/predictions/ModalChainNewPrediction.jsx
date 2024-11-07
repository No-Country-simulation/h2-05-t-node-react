import { Dialog } from "primereact/dialog"
import SearchBar from "../common/SearchBar"
import SkeletonList from "../common/SkeletonList"
import { useEffect, useState } from "react"
import { getCurrentDate } from "../../utils/getCurrentDate"
import { getNextFiveDays } from "../../utils/getNextFiveDays"
import { convertToOriginalFormat } from "../../utils/convertToOriginalFormat"
import NavbarChainedPredictions from "./NavbarChainedPredictions"

const ModalChainNewPrediction = ({ visible, setVisible }) => {
    const [selectedDate, setSelectedDate] = useState(0)
    const currentDate = getCurrentDate()
    const dateList = getNextFiveDays(currentDate)
    // const predictionDate = dateList[selectedDate] === convertToOriginalFormat(dateList[currentDate])
    const [allMatches, setAllMatches] = useState([])
    const [filteredMatches, setFilteredMatches] = useState([])
    const [searchData, setSearchData] = useState('')
    const [selectedMatch, setSelectedMatch] = useState(null)
    const [loading, setLoading] = useState(false)
    const [visiblePredictResultOrGoal, setVisiblePredictResultOrGoal] = useState(false)

    console.log(dateList[selectedDate])
    // if (predictionDate == undefined) {
    //     var date = getCurrentDate()
    // }

    // useEffect(() => {
    //     setLoading(true);
    //     axios.get(`https://apifootboll.onrender.com/api_AllMatch?from=${predictionDate || date}&to=${predictionDate || date}`)
    //         .then(res => {
    //             const matches = res.data.data;
    //             setAllMatches(matches);

    //             const filteredMatches = matches.filter(match => targetLeagueIds.includes(match.league_id));
    //             setFilteredMatches(filteredMatches);
    //         })
    //         .catch(error => console.log(error.message))
    //         .finally(() => setLoading(false));
    // }, [predictionDate])


    const handleSearch = (e) => {
        setSearchData(e.target.value)

        const foundMatches = allMatches.filter(item =>
            item.homeTeam.toLowerCase().includes(e.target.value.toLowerCase()) ||
            item.awayTeam.toLowerCase().includes(e.target.value.toLowerCase())
        )

        if (e.target.value == '') {
            setFilteredMatches(allMatches.filter(match => targetLeagueIds.includes(match.league_id)))
        } else {
            setFilteredMatches(foundMatches)
        }
    }

    const handleSelectedMatch = (match) => {
        if (match.match_status == 'Finished') return

        setSelectedMatch(match)
        setVisiblePredictResultOrGoal(true)
    }

    return (
        <div className="card flex justify-content-center">
            <Dialog
                visible={visible}
                onHide={() => { if (!visible) return; setVisible(false); }}
                className="w-[50vw] min-h-[100vh] !important"
                breakpoints={{ '960px': '75vw', '641px': '100vw' }}>

                <div className='flex flex-col items-center justify-center mb-6'>
                    <span className='font-semibold text-title text-black'>¿Con qué vas a combinar?</span>
                    <span className='text-[18px] text-center px-9'>Elige un partido dentro de los próximos 5 días</span>
                </div>

                <NavbarChainedPredictions dateList={dateList} selectedDate={selectedDate} setSelectedDate={setSelectedDate} />

                <SearchBar handleSearch={handleSearch} searchData={searchData} setSearchData={setSearchData} autoFocus={true} placeholder={'Buscar un partido'} />

                {/* LISTADO DE PARTIDOS */}
                <section className="mt-5">
                    <div className="h-[310px] overflow-scroll scrollbar-hide">
                        {
                            loading ?
                                <SkeletonList height='5.5rem' length={5} />
                                :
                                filteredMatches.length == 0 ?
                                    <p className="text-white py-5 rounded-md font-semibold border bg-gradiente text-center text-md">
                                        No se encontraron partidos
                                    </p>
                                    :
                                    filteredMatches?.map(item => (
                                        // CARD DE CADA PARTIDO
                                        <div key={item.match_id} onClick={() => handleSelectedMatch(item)} className="h-[85px] rounded-t-lg mt-2 border-b border-b-gray-300 shadow-soft">
                                            <div className="h-[27px] text-center">
                                                <span className="text-sm text-black">
                                                    {
                                                        item.match_status === 'Finished'
                                                            ? 'Finalizado'
                                                            : item.match_status === ''
                                                                ? 'Hoy'
                                                                : item.match_status === ''
                                                                    ? dateFormatDM
                                                                    : item.match_status === 'Half Time'
                                                                        ? 'Medio tiempo'
                                                                        : item.match_status === 'Postponed'
                                                                            ? 'Postergado'
                                                                            : `🔴 ${item.match_status}'`
                                                    }
                                                </span>
                                            </div>

                                            <div className="flex px-10 items-center justify-between mt-3 pb-8">
                                                <div className="flex justify-around items-center gap-2 w-[120px]">
                                                    <span className="capitalize text-sm overflow-hidden whitespace-nowrap text-ellipsis">{item.homeTeam}</span>
                                                    <img className="w-[26px] h-[26px] object-contain" src={item.team_home_badge} alt="Img" onError={(e) => { e.target.src = DefaultTeam; e.target.onerror = null }} />
                                                </div>
                                                <span className="text-regular-14 px-3">VS.</span>
                                                <div className="flex justify-around items-center gap-2 w-[120px]">
                                                    <img className="w-[26px] h-[26px] object-contain" src={item.team_away_badge} alt="Img" onError={(e) => { e.target.src = DefaultTeam; e.target.onerror = null }} />
                                                    <span className="capitalize text-sm overflow-hidden whitespace-nowrap text-ellipsis">{item.awayTeam}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                        }
                    </div>
                </section>

                {/* CUADRO RESUMEN COMBINADAS */}
                <div className='border-t border-t-primary mx-auto pb-3 pt-1'>
                    <span className='text-black text-regular font-semibold'>Resumen:</span>
                    <div className="border-b border-b-primary h-[90px] overflow-scroll scrollbar-hide">
                        {/* CARD COMBINADA */}
                        <div className="border-b border-b-primary mb-2">
                            <div className='flex gap-2 text-regular text-black'>
                                <div className="flex gap-2">
                                    <span>{selectedMatch?.homeTeam}</span>
                                    <img className="w[21px] h-[21px]" src={selectedMatch?.team_home_badge} alt={`img ${selectedMatch?.homeTeam}`} onError={(e) => { e.target.src = DefaultTeam }} />
                                </div>
                                <span>vs.</span>
                                <div className="flex gap-2">
                                    <span>{selectedMatch?.awayTeam}</span>
                                    <img className="w[21px] h-[21px]" src={selectedMatch?.team_away_badge} alt={`img ${selectedMatch?.awayTeam}`} onError={(e) => { e.target.src = DefaultTeam }} />
                                </div>
                            </div>
                            <div className='flex justify-between text-regular-14 mb-3'>
                                <div className="flex flex-col">
                                    <p>Resultado final: Equipo elegido</p> {/* {selectedOption} */}
                                    <p>Goles: Jugador 1</p>
                                </div>
                                <span>15</span>
                            </div>
                        </div>
                        <div className="border-b border-b-primary">
                            <div className='flex gap-2 text-regular text-black'>
                                <div className="flex gap-2">
                                    <span>{selectedMatch?.homeTeam}</span>
                                    <img className="w[21px] h-[21px]" src={selectedMatch?.team_home_badge} alt={`img ${selectedMatch?.homeTeam}`} onError={(e) => { e.target.src = DefaultTeam }} />
                                </div>
                                <span>vs.</span>
                                <div className="flex gap-2">
                                    <span>{selectedMatch?.awayTeam}</span>
                                    <img className="w[21px] h-[21px]" src={selectedMatch?.team_away_badge} alt={`img ${selectedMatch?.awayTeam}`} onError={(e) => { e.target.src = DefaultTeam }} />
                                </div>
                            </div>
                            <div className='flex justify-between text-regular-14 mb-3'>
                                <div className="flex flex-col">
                                    <p>Resultado final: Equipo elegido</p> {/* {selectedOption} */}
                                    <p>Goles: Jugador 1</p>
                                </div>
                                <span>15</span>
                            </div>
                        </div>
                    </div>

                    {/* RESUMEN FINAL */}
                    <div className='flex justify-between text-title text-blue'>
                        <span>Puntos Totales</span>
                        <span>15</span>
                    </div>
                </div>
            </Dialog>

            {/* <ModalPredictResultOrGoal
                selectedMatch={selectedMatch}
                setVisible={setVisible}
                visiblePredictResultOrGoal={visiblePredictResultOrGoal}
                setVisiblePredictResultOrGoal={setVisiblePredictResultOrGoal} /> */}
        </div>
    )
}
export default ModalChainNewPrediction
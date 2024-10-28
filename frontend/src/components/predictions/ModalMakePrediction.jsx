import { useEffect, useState } from "react"
import { Dialog } from "primereact/dialog"
import SearchBar from "../common/SearchBar"
import ModalPredictResultOrGoal from "./ModalPredictResultOrGoal"
import axios from "axios"
import { getCurrentDate } from "../../utils/getCurrentDate"
import DefaultTeam from '../../assets/img/defaultTeam.png'
import SkeletonList from "../common/SkeletonList"

const targetLeagueIds = [
  "44", // Liga Profesional Argentina
  "152", // Premier League
  // "207", // Serie A
  // "168", // Ligue 1
  // "175", // Bundesliga
  "302", // La Liga
  "3", // UEFA Champions League
  "4", // UEFA Europa League
]

const API_URL = import.meta.env.VITE_API_URL;

const ModalMakePrediction = ({ dateFormatDM, predictionDate, visible, setVisible }) => {
  const [allMatches, setAllMatches] = useState([])
  const [filteredMatches, setFilteredMatches] = useState([])
  const [searchData, setSearchData] = useState('')
  const [selectedMatch, setSelectedMatch] = useState(null)
  const [loading, setLoading] = useState(false)
  const [visiblePredictResultOrGoal, setVisiblePredictResultOrGoal] = useState(false)

  if (predictionDate == undefined) {
    var date = getCurrentDate()
  }

  useEffect(() => {
    setLoading(true);
    axios.get(`${API_URL}/api_AllMatch?from=${predictionDate || date}&to=${predictionDate || date}`)
      .then(res => {
        const matches = res.data.data;
        setAllMatches(matches);

        const filteredMatches = matches.filter(match => targetLeagueIds.includes(match.league_id));
        setFilteredMatches(filteredMatches);
      })
      .catch(error => console.log(error.message))
      .finally(() => setLoading(false));
  }, [predictionDate])


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

        <div className='flex flex-col items-center justify-center'>
          <span className='font-semibold text-title text-black'>Elige un partido {dateFormatDM == 'Todas' ? 'de Hoy' : dateFormatDM == undefined ? 'de Hoy' : 'del ' + dateFormatDM}</span>
          <span className='text-[18px]'>Selecciona una opción</span>
        </div>

        <SearchBar handleSearch={handleSearch} searchData={searchData} setSearchData={setSearchData} autoFocus={true} placeholder={'Buscar un partido'} />

        <section className="mt-5">

          {/* LISTADO DE PARTIDOS TRAIDOS DESDE EL SERVIDOR */}

          {
            loading ?
              <SkeletonList height='5.5rem' length={5} />
              :
              filteredMatches.length == 0 ?
                <p className="text-white py-5 rounded-md font-semibold border bg-gradiente text-center text-md mt-2">
                  No se encontraron partidos
                </p>
                :
                filteredMatches?.map(item => (
                  // CARD DE CADA PARTIDO
                  <div key={item.match_id} onClick={() => handleSelectedMatch(item)} className="h-[85px] rounded-t-lg mt-2 shadow-soft">
                    <div className="h-[27px] text-center border-b border-b-gray-300">
                      <span className="text-sm text-black">
                        {
                          item.match_status === 'Finished'
                            ? 'Finalizado'
                            : item.match_status === '' && dateFormatDM === 'Todas'
                              ? 'Hoy'
                              : item.match_status === ''
                                ? dateFormatDM
                                : item.match_status === 'Half Time'
                                  ? 'Medio tiempo'
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
        </section>

      </Dialog>

      <ModalPredictResultOrGoal
        selectedMatch={selectedMatch}
        setVisible={setVisible}
        visiblePredictResultOrGoal={visiblePredictResultOrGoal}
        setVisiblePredictResultOrGoal={setVisiblePredictResultOrGoal} />
    </div>
  )
}
export default ModalMakePrediction
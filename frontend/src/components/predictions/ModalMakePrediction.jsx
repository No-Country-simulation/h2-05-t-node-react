import { useEffect, useState } from "react"
import { Dialog } from "primereact/dialog"
import SearchBar from "../common/SearchBar"
import ModalPredictResultOrGoal from "./ModalPredictResultOrGoal"
import axios from "axios"
import { getCurrentDate } from "../../utils/getCurrentDate"
import DefaultTeam from '../../assets/img/defaultTeam.png'
import SkeletonList from "../common/SkeletonList"
import AlertTimeOut from "../common/AlertTimeOut"

const ModalMakePrediction = ({ currentDate, dateFormatDM, predictionDate, visible, setVisible }) => {
  const [allMatches, setAllMatches] = useState([])
  const [filteredMatches, setFilteredMatches] = useState([])
  const [searchData, setSearchData] = useState('')
  const [selectedMatch, setSelectedMatch] = useState(null)
  const [loading, setLoading] = useState(false)
  const [showAlertFinishedMatch, setShowAlertFinishedMatch] = useState()
  const [visiblePredictResultOrGoal, setVisiblePredictResultOrGoal] = useState(false)

  if (predictionDate == undefined) {
    var date = getCurrentDate()
  }

  useEffect(() => {
    setLoading(true);
    Promise.all([
      axios.get(`https://apifootboll.onrender.com/api_fixture?from=${predictionDate}&to=${predictionDate}&league=140&season=2024`),
      axios.get(`https://apifootboll.onrender.com/api_fixture?from=${predictionDate}&to=${predictionDate}&league=128&season=2024`)
    ])
      .then(responses => {
        const leagueSpain = responses[0].data.data;
        const leagueArgentina = responses[1].data.data;

        const combinedMatches = [...leagueSpain, ...leagueArgentina];

        setAllMatches(combinedMatches);
        setFilteredMatches(combinedMatches);
        console.log(combinedMatches)
      })
      .catch(error => console.error('Error fetching data:', error))
      .finally(() => setLoading(false));
  }, [date]);

  const handleSearch = (e) => {
    setSearchData(e.target.value)

    const foundMatches = allMatches.filter(item =>
      item.teams.home.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
      item.teams.away.name.toLowerCase().includes(e.target.value.toLowerCase())
    )

    if (e.target.value == '') {
      setAllMatches(filteredMatches)
    } else {
      setAllMatches(foundMatches)
    }
  }

  const handleSelectedMatch = (match) => {
    if (match.status.long == 'Match Finished') return setShowAlertFinishedMatch(true)

    setSelectedMatch(match)
    setVisiblePredictResultOrGoal(true)
  }

  return (
    <div className="card flex justify-content-center">
      <Dialog
        visible={visible}
        position="bottom"
        onHide={() => { if (!visible) return; setVisible(false); }}
        className="w-[50vw] min-h-[97vh] !important"
        breakpoints={{ '960px': '75vw', '641px': '100vw' }}>

        <div className='flex flex-col items-center justify-center mb-6'>
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
              allMatches.length == 0 ?
                <p className="text-white py-5 rounded-md font-semibold border bg-gradiente text-center text-md mt-2">
                  No se encontraron partidos
                </p>
                :
                allMatches?.map(item => (
                  // CARD DE CADA PARTIDO
                  <div key={item.fixtureId} onClick={() => handleSelectedMatch(item)} className="h-[85px] rounded-t-lg mt-2 shadow-soft">
                    <div className="h-[27px] text-center border-b border-b-gray-300">
                      <span className="text-sm text-black">
                        {
                          item.status.long == 'Match Finished' ? 'Finalizado'
                            : item.status.long !== 'Not Started' && dateFormatDM === 'Todas' ? 'Hoy'
                              : item.status.long == 'Not Started' ? 'Pendiente'
                                : item.status.long == 'First Half' ? '🔴 ' + item.status.elapsed + `'`
                                  : item.status.long == 'Second Half' ? '🔴 ' + item.status.elapsed + `'`
                                    : item.status.elapsed !== null ? 'M. tiempo'
                                      // : item.status.long == 'Postponed' ? 'Postergado'
                                      : 'Pendiente'
                        }
                      </span>
                    </div>

                    <div className="flex px-10 items-center justify-between mt-3 pb-8">
                      <div className="flex justify-around items-center gap-2 w-[120px]">
                        <span className="capitalize text-sm overflow-hidden whitespace-nowrap text-ellipsis">{item.teams.home.name}</span>
                        <img className="w-[26px] h-[26px] object-contain" src={item.teams.home.logo} alt="Img" onError={(e) => { e.target.src = DefaultTeam; e.target.onerror = null }} />
                      </div>
                      <span className="text-regular-14 px-3">VS.</span>
                      <div className="flex justify-around items-center gap-2 w-[120px]">
                        <img className="w-[26px] h-[26px] object-contain" src={item.teams.away.logo} alt="Img" onError={(e) => { e.target.src = DefaultTeam; e.target.onerror = null }} />
                        <span className="capitalize text-sm overflow-hidden whitespace-nowrap text-ellipsis">{item.teams.away.name}</span>
                      </div>
                    </div>
                  </div>
                ))
          }
        </section>
        <AlertTimeOut showAlert={showAlertFinishedMatch} setShowAlert={setShowAlertFinishedMatch}>
          No podés predecir un partido finalizado
        </AlertTimeOut>
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
import Container from "../../components/common/Container"
import SearchBar from "../../components/common/SearchBar"
import { useEffect, useState } from "react"
import FilterOptionsSP from "../../components/scoutPlayers/FilterOptionsSP"
import TablePlayersRanking from "../../components/scoutPlayers/TablePlayersRanking"
import axios from "axios"
import API_URL from "../../config"

const RankingSP = () => {
    const [playersList, setPlayersList] = useState([])
    const [searchData, setSearchData] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        axios.get(`${API_URL}/api/token-info/`)
            .then(res => {
                console.log(res.data.data)
                // Ordena la lista de jugadores por división (1, 2, 3)
                const sortedPlayers = res.data.data.sort((a, b) => a.division - b.division);
                setPlayersList(sortedPlayers)
            })
            .catch(error => console.log(error))
            .finally(() => setLoading(false))
    }, [])

    const handleSearch = (e) => {
        e.preventDefault();
    }

    return (
        <Container>
            <h2 className="my-3 ms-1 text-start text-black text-regular-18 font-medium capitalize">Ranking de jugadores</h2>
            <SearchBar handleSearch={handleSearch} searchData={searchData} setSearchData={setSearchData} autoFocus={true} placeholder={'Buscar un Jugador'} />

            <FilterOptionsSP />

            <TablePlayersRanking playersList={playersList} />

        </Container>
    )
}
export default RankingSP
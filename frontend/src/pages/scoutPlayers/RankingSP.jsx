import Container from "../../components/common/Container"
import GoldImg from '../../assets/img/divisionGold.png'
import SilverImg from '../../assets/img/divisionSilver.png'
import BronzeImg from '../../assets/img/divisionBronze.png'
import SearchBar from "../../components/common/SearchBar"
import { useState } from "react"
import FilterOptionsSP from "../../components/scoutPlayers/FilterOptionsSP"
import TablePlayersRanking from "../../components/scoutPlayers/TablePlayersRanking"

const initialPlayersList = [
    { id: 1, name: 'Jugador 1', division: GoldImg, released: 80000, price: 120 },
    { id: 2, name: 'Jugador 2', division: GoldImg, released: 85000, price: 130 },
    { id: 3, name: 'Jugador 3', division: GoldImg, released: 78000, price: 110 },
    { id: 4, name: 'Jugador 4', division: SilverImg, released: 70000, price: 90 },
    { id: 5, name: 'Jugador 5', division: SilverImg, released: 72000, price: 95 },
    { id: 6, name: 'Jugador 6', division: SilverImg, released: 68000, price: 85 },
    { id: 7, name: 'Jugador 7', division: BronzeImg, released: 60000, price: 80 },
    { id: 8, name: 'Jugador 8', division: BronzeImg, released: 65000, price: 85 },
    { id: 9, name: 'Jugador 9', division: BronzeImg, released: 58000, price: 75 }
]

const RankingSP = () => {
    const [playersList, setPlayersList] = useState(initialPlayersList)
    const [searchData, setSearchData] = useState('')

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
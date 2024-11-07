import Container from "../../components/common/Container"
import GoldImg from '../../assets/img/divisionGold.png'
import SilverLockedImg from '../../assets/img/divisionSilverLocked.png'
import BronzeLockedImg from '../../assets/img/divisionBronzeLocked.png'
import UserImg from '../../assets/img/user.png'
import TableUserRanking from "../../components/divisions/TableUserRanking"
import { useEffect, useState } from "react"
import axios from "axios"
import API_URL from "../../config"

const usersList = [
    { id: 1, name: 'Usuario 1', score: 1369 },
    { id: 2, name: 'Usuario 2', score: 1369 },
    { id: 3, name: 'Usuario 3', score: 1369 },
    { id: 4, name: 'Usuario 4', score: 1369 },
    { id: 5, name: 'Usuario 5', score: 1369 },
    { id: 6, name: 'Usuario 6', score: 1369 },
    { id: 7, name: 'Usuario 7', score: 1369 },
    { id: 8, name: 'Usuario 8', score: 1369 },
    { id: 9, name: 'Usuario 9', score: 1369 },
    { id: 10, name: 'Usuario 10', score: 1369 },
]


const Ranking = () => {
    const [loading, setLoading] = useState(false)
    const [divisionUserList, setDivisionUserList] = useState([])

    // OBTENER RANKING POR DIVISION (ORO,PLATA,BRONCE)
    useEffect(() => {
        axios.get(`${API_URL}/api/ranking/division/1`) // DIVISIONES: 1, 2, 3, 4
            .then(res => {
                console.log('res', res.data.data)
                setDivisionUserList(res.data.data)
            })
            .catch(error => console.log(error))
            .finally(() => setLoading(false))
    }, [])

    return (
        <Container>
            <section className="mt-1">
                <div className="gap-5 flex justify-around items-center">
                    <img className="w-[64.89px] h-[86.52px]" src={BronzeLockedImg} alt="Bronze" />
                    <img className="w-[64.89px] h-[86.52px]" src={SilverLockedImg} alt="Silver" />
                    <img className="w-[64.89px] h-[86.52px]" src={GoldImg} alt="Gold" />
                </div>
                <h2 className="mt-9 text-center text-black text-regular-18 font-medium capitalize">División Oro</h2>
            </section>

            <TableUserRanking usersList={usersList} UserImg={UserImg} />
        </Container>
    )
}
export default Ranking
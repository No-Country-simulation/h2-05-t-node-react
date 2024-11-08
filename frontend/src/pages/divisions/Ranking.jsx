import { useEffect, useState } from "react"
import Container from "../../components/common/Container"
import GoldLockedImg from '../../assets/img/divisionGoldLocked.png'
import SilverLockedImg from '../../assets/img/divisionSilverLocked.png'
import BronzeImg from '../../assets/img/divisionBronze.png'
import UserImg from '../../assets/img/user.png'
import TableUserRanking from "../../components/divisions/TableUserRanking"
import axios from "axios"
import API_URL from "../../config"

const Ranking = () => {
    const [loading, setLoading] = useState(false)
    const [divisionUserList, setDivisionUserList] = useState([])

    // OBTENER RANKING POR DIVISION (ORO,PLATA,BRONCE)
    // Division, 1 oro, 2 plata, 3 bronce, 4 si no tiene liga
    useEffect(() => {
        setLoading(true)
        axios.get(`${API_URL}/api/ranking/division/3`)
            .then(res => {
                setDivisionUserList(res.data)
                console.log(res.data)
            })
            .catch(error => console.log(error))
            .finally(() => setLoading(false))
    }, [])

    return (
        <Container>
            <section className="mt-1">
                <div className="gap-5 flex justify-around items-center">
                    <img className="w-[64.89px] h-[86.52px]" src={BronzeImg} alt="Bronze" />
                    <img className="w-[64.89px] h-[86.52px]" src={SilverLockedImg} alt="Silver" />
                    <img className="w-[64.89px] h-[86.52px]" src={GoldLockedImg} alt="Gold" />
                </div>
                <h2 className="mt-9 text-center text-black text-regular-18 font-medium capitalize">División Bronce</h2>
            </section>

            <TableUserRanking divisionUserList={divisionUserList} UserImg={UserImg} loading={loading} />
        </Container>
    )
}
export default Ranking
import { useEffect, useState } from "react"
import UserRanking from "./UserRanking"
import SkeletonList from "../common/SkeletonList"

const TableUserRanking = ({ divisionUserList, UserImg, loading }) => {
    const [user, setUser] = useState(null)

    useEffect(() => {
        const storedUser = localStorage.getItem('user')
        if (storedUser) {
            const { token, user } = JSON.parse(storedUser)
            setUser(user)
        }
    }, [])

    return (
        <section className="shadow-soft mt-3 rounded-2xl">
            <div className="py-2 px-6 flex justify-between text-regular text-secondary">
                <div>
                    <span>#</span>
                    <span className="ms-6">Nombre de usuario</span>
                </div>
                <div>Puntos</div>
            </div>
            {

                loading ?
                    <SkeletonList length={5} height='60px' />
                    :
                    divisionUserList?.map((item, index) => (
                        <UserRanking key={item.id} index={index} item={item} user={user} imgProfileUser={UserImg} />
                    ))
            }
        </section>
    )
}
export default TableUserRanking
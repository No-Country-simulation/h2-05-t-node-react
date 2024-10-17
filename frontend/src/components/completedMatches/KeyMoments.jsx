import { useState } from "react"
import PurpleBallIcon from "../../assets/icons/PurpleBallIcon"
import CornerIcon from "../../assets/icons/CornerIcon"
import CardsIcon from "../../assets/icons/CardsIcon"
import KeyMomentsItem from "./KeyMomentsItem"

const keyMomentsList = [
    {
        title: "Goles",
        logo: PurpleBallIcon
    },
    {
        title: "Tiros de esquina",
        logo: CornerIcon
    },
    {
        title: "Tarjetas",
        logo: CardsIcon
    },
]

const KeyMoments = () => {
    const [keyMoments, setKeyMoments] = useState(keyMomentsList)

    return (
        <>
            <div className="flex justify-between py-2 mt-4">
                <span className="font-medium">Momentos clave</span>
            </div>

            {keyMoments.map((item, index) => (
                <KeyMomentsItem key={index} index={index} item={item} />
            ))}
        </>
    )
}
export default KeyMoments
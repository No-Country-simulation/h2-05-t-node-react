import { useNavigate } from "react-router-dom";
import GoldDivisionImg from '../../assets/img/divisionGold.png'
import SilverivisionImg from '../../assets/img/divisionSilver.png'
import BronzeDivisionImg from '../../assets/img/divisionBronze.png'
import ArrowForwardBlueIcon from "../../assets/icons/ArrowForwardBlueIcon";

const divisionImgs = [GoldDivisionImg, SilverivisionImg, BronzeDivisionImg]

const PlayersRanking = ({ item, index }) => {
    const navigate = useNavigate()

    const handleSelectPlayer = (playerData) => {
        if (playerData) {
            localStorage.setItem('playerData', JSON.stringify(playerData))
        }

        navigate(`/scout-players/ranking/players/${playerData.id}`)
    }

    return (
        <tr
            className={`h-[59px] bg-soft-gray px-5 text-regular-16 text-secondary border-t border-primary`}
            onClick={() => handleSelectPlayer(item)}>

            {/* Columna # */}
            <td className="w-[50px] text-blue text-[24px] text-center">{index + 1}</td>

            {/* Columna Jugador */}
            <td className="align-middle">
                <div className="flex items-center space-x-4 text-black w-[100px]">
                    <span className="w-[100px] text-regular-14">{item.name}</span>
                </div>
            </td>

            {/* Columna Div. */}
            <td className="w-[30px] text-center">
                <img className="w-[17px] h-[23px]" src={divisionImgs[item.division - 1]} alt="division" />
            </td>

            {/* Columna Released */}
            <td className="text-center text-tertiary text-regular-14">80k</td>

            {/* Columna Precio */}
            <td className="text-secondary text-regular-14 text-center">120</td>

            <td className="transform scale-[0.7]">
                <ArrowForwardBlueIcon />
            </td>
        </tr>
    );
};

export default PlayersRanking;

import { useNavigate } from "react-router-dom";
import ArrowForwardBlueIcon from "../../assets/icons/ArrowForwardBlueIcon";

const PlayersRanking = ({ item }) => {
    const navigate = useNavigate()
    return (
        <tr
            className={`h-[59px] bg-soft-gray px-5 text-regular-16 text-secondary border-t border-primary`}
            onClick={() => navigate(`/scout-players/ranking/players/${item.id}`)}>

            {/* Columna # */}
            <td className="w-[50px] text-blue text-[24px] text-center">{item.id}</td>

            {/* Columna Jugador */}
            <td className="align-middle">
                <div className="flex items-center space-x-4 text-black">
                    <span>{item.name}</span>
                </div>
            </td>

            {/* Columna Div. */}
            <td className="w-[30px] text-center">
                <img className="w-[17px] h-[23px]" src={item.division} alt="division" />
            </td>

            {/* Columna Released */}
            <td className="text-center text-tertiary text-regular-14">{item.released.toString().slice(0, 2)}k</td>

            {/* Columna Precio */}
            <td className="text-secondary text-regular-14 text-center">{item.price}</td>

            <td className="transform scale-[0.7]">
                <ArrowForwardBlueIcon />
            </td>
        </tr>
    );
};

export default PlayersRanking;

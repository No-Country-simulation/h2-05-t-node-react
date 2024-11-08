import CalendarIcon from "../../assets/icons/CalendarIcon"
import StadiumIcon from "../../assets/icons/StadiumIcon"
import WhistleIcon from "../../assets/icons/WhistleIcon"

const positions = {
    'Attacker': 'Delantero',
    'Delantero': 'Delantero',
    'Defender': 'Defensor',
    'Midfielder': 'Centrocampista',
    'Goalkeeper': 'Portero',
}

const PlayerDataItem = ({ playerData }) => {
    const { age, position } = playerData || {}

    return (
        <>
            {/* <div className="h-[54px] flex items-center border-t border-primary"> */}
            {/* <div className="w-[50px] flex justify-center"><img src={''} alt="" /></div> */}
            {/* <div className="w-[50px] flex justify-center"><span className="px-4"></span></div>
                <div className="leading-none">
                    <p className="mb-1 text-tertiary">Nacionalidad</p>
                    <p>-</p>
                </div>
            </div> */}
            <div className="h-[54px] flex items-center border-t border-primary">
                <div className="w-[50px] flex justify-center"><CalendarIcon className="px-4" /></div>
                <div className="leading-none">
                    <p className="mb-1 text-tertiary">Edad</p>
                    <p>{age}</p>
                </div>
            </div>
            <div className="h-[54px] flex items-center border-t border-primary">
                <div className="w-[50px] flex justify-center"><StadiumIcon className="px-4" /></div>
                <div className="leading-none">
                    <p className="mb-1 text-tertiary">Posición</p>
                    <p>{positions[position] || position}</p>
                </div>
            </div>
            <div className="h-[54px] flex items-center border-t border-primary">
                <div className="w-[50px] flex justify-center"><WhistleIcon className="px-4" /></div>
                <div className="leading-none">
                    <p className="mb-1 text-tertiary">Posición</p>
                    <p>{positions[position] || position}</p>
                </div>
            </div>
        </>
    )
}

export default PlayerDataItem;

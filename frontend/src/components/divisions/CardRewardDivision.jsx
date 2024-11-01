import ArrowForwardBlueIcon from '../../assets/icons/ArrowForwardBlueIcon'
import { useNavigate } from 'react-router-dom'

const CardRewardDivision = ({ division, imgDivision }) => {
    const navigate = useNavigate()

    return (
        <div onClick={() => navigate('/divisions/rewards/prizes', { state: { division, imgDivision } })}
            className="h-[112px] bg-soft-gray flex justify-around items-center rounded-lg gap-5 px-4">
            <img className='w-[48.75px] h-[65px]' src={imgDivision} alt="Rank" />
            <div className='flex items-center'>
                <div>
                    <h3>División {division}</h3>
                    <p className='text-regular-14 text-secondary'>Descubre las recompensas de esta división.</p>
                </div>
                <div>
                    <ArrowForwardBlueIcon />
                </div>
            </div>
        </div>
    )
}
export default CardRewardDivision
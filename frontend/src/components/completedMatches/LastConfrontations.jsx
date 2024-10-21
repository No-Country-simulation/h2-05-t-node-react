import ArrowForwardIcon from '../../assets/icons/ArrowForwardIcon'
import FlagIcon from '../../assets/icons/FlagIcon'
import BarcelonaImg from '../../assets/img/barcelona.png'
import RealMadridImg from '../../assets/img/realMadrid.png'

const LastConfrontations = () => {
    return (
        <>
            <div className="flex justify-between py-2 mt-4 mb-1">
                <span className="font-medium">Últimos enfrentamientos</span>
                <div className="flex gap-2 items-center">
                    <span className="text-purple">Ver todas</span>
                    <ArrowForwardIcon />
                </div>
            </div>

            <div className="flex flex-col justify-center mb-5 shadow-soft rounded-xl">
                <div className='flex justify-around gap-5 text-soft-gray'>
                    <span className="py-2 px-5 text-secondary text-sm">Partidos</span>
                    <span className="py-2 px-5 text-secondary text-sm">Resultado</span>
                    <span className="py-2 px-5 text-secondary text-sm">Jornada</span>
                </div>


                <div className='w-full bg-soft-gray py-3 flex justify-around gap-10'>
                    <div className="flex flex-col items-start gap-1">
                        <div className='flex gap-2'>
                            <img className='w-5 h-5 object-contain' src={BarcelonaImg} alt="" />
                            <span className="text-regular text-secondary capitalize">Barcelona</span>
                        </div>
                        <div className='flex gap-2'>
                            <img className='w-5 h-5 object-contain' src={RealMadridImg} alt="" />
                            <span className="text-regular text-secondary capitalize">Real Madrid</span>
                        </div>
                    </div>

                    <div className='flex items-center gap-3'>
                        <div className="flex flex-col items-center">
                            <span className="text-regular">3</span>
                            <span className="text-regular">3</span>
                        </div>
                        <FlagIcon />
                    </div>

                    <div>
                        <span className='text-regular'>Dom 28-10</span>
                    </div>
                </div>
            </div>
        </>
    )
}
export default LastConfrontations
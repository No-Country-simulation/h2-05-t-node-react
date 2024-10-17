import CalendarIcon from '../../assets/icons/CalendarIcon'
import TournamentIcon from '../../assets/icons/TournamentIcon'
import PurpleCupIcon from '../../assets/icons/PurpleCupIcon'
import StadiumIcon from '../../assets/icons/StadiumIcon'
import WhistleIcon from '../../assets/icons/WhistleIcon'

const Details = () => {
    return (
        <>
            <div className="flex justify-between py-2">
                <span className="font-medium">Detalles del partido</span>
            </div>

            <div className="shadow-soft">
                <div className='flex items-center border border-gray-300 rounded-t-lg'>
                    <div className="p-4">
                        <CalendarIcon />
                    </div>
                    <div className="flex flex-col justify-center items-start h-[54px]">
                        <span>Fecha y hora</span>
                        <span className="text-secondary">24 de septiembre 10:00hs</span>
                    </div>
                </div>

                <div className='flex items-center border border-gray-300'>
                    <div className="p-4">
                        <TournamentIcon />
                    </div>
                    <div className="flex flex-col justify-center items-start h-[54px]">
                        <span>Torneo</span>
                        <span className="text-secondary">La Liga</span>
                    </div>
                </div>

                <div className='flex items-center border border-gray-300'>
                    <div className="p-4">
                        <PurpleCupIcon />
                    </div>
                    <div className="flex flex-col justify-center items-start h-[54px]">
                        <span>Copa</span>
                        <span className="text-secondary capitalize">UEFA</span>
                    </div>
                </div>

                <div className='flex items-center border border-gray-300'>
                    <div className="p-4">
                        <StadiumIcon />
                    </div>
                    <div className="flex flex-col justify-center items-start h-[54px]">
                        <span>Estadio</span>
                        <span className="text-secondary">Nombre Estadio</span>
                    </div>
                </div>

                <div className='flex items-center border border-gray-300 rounded-b-lg'>
                    <div className="p-4">
                        <WhistleIcon />
                    </div>
                    <div className="flex flex-col justify-center items-start h-[54px]">
                        <span>Arbitro</span>
                        <span className="text-secondary">Nombre Arbitro</span>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Details
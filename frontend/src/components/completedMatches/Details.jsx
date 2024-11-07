import CalendarIcon from '../../assets/icons/CalendarIcon'
import TournamentIcon from '../../assets/icons/TournamentIcon'
import PurpleCupIcon from '../../assets/icons/PurpleCupIcon'
import StadiumIcon from '../../assets/icons/StadiumIcon'
import WhistleIcon from '../../assets/icons/WhistleIcon'
import { formatDateToDMY } from '../../utils/formatDateToDMY'

const Details = ({ selectedMatch }) => {
    const dateTimeData = extractDateTime(selectedMatch?.date)

    console.log(selectedMatch)

    function extractDateTime(dateTimeString) {
        if (!dateTimeString) return { date: 'Fecha no disponible', time: 'Hora no disponible' };

        // Extraemos la parte de la fecha (antes de la 'T') y la parte de la hora (después de la 'T')
        const [datePart, timePart] = dateTimeString.split('T');

        // Devolvemos la fecha y solo la hora en formato hh:mm (sin segundos)
        const time = timePart.split(':').slice(0, 2).join(':');  // Tomamos solo hh:mm

        return { date: datePart, time: time };
    }

    return (
        <>
            <div className="flex justify-between py-2 mb-1">
                <span className="font-medium">Detalles del partido</span>
            </div>

            <div className="shadow-soft">
                <div className='flex items-center border border-gray-300 rounded-t-lg'>
                    <div className="p-4">
                        <CalendarIcon />
                    </div>
                    <div className="flex flex-col justify-center items-start h-[54px]">
                        <span>Fecha y hora</span>
                        <span className="text-secondary flex gap-3">
                            <p>{formatDateToDMY(dateTimeData?.date)}</p>
                            <p>{dateTimeData?.time + 'hs'}</p>
                        </span>
                    </div>
                </div>

                <div className='flex items-center border border-gray-300'>
                    <div className="p-4">
                        <TournamentIcon />
                    </div>
                    <div className="flex flex-col justify-center items-start h-[54px]">
                        <span>Torneo</span>
                        <span className="text-secondary">
                            {selectedMatch?.leagueName || '-'}
                        </span>
                    </div>
                </div>

                <div className='flex items-center border border-gray-300'>
                    <div className="p-4">
                        <PurpleCupIcon />
                    </div>
                    <div className="flex flex-col justify-center items-start h-[54px]">
                        <span>Copa</span>
                        <span className="text-secondary capitalize">-</span>
                    </div>
                </div>

                <div className='flex items-center border border-gray-300'>
                    <div className="p-4">
                        <StadiumIcon />
                    </div>
                    <div className="flex flex-col justify-center items-start h-[54px]">
                        <span>Estadio</span>
                        <span className="text-secondary">{selectedMatch?.venue.name || '-'}</span>
                    </div>
                </div>

                <div className='flex items-center border border-gray-300 rounded-b-lg'>
                    <div className="p-4">
                        <WhistleIcon />
                    </div>
                    <div className="flex flex-col justify-center items-start h-[54px]">
                        <span>Arbitro</span>
                        <span className="text-secondary">{selectedMatch?.referee || '-'}</span>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Details
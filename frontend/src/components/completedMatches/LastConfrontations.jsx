import { useEffect, useState } from 'react'
import ArrowForwardIcon from '../../assets/icons/ArrowForwardIcon'
import FlagIcon from '../../assets/icons/FlagIcon'
import SkeletonList from '../common/SkeletonList'
import { formatDateToDMYShort } from '../../utils/formatDateToDMYShort.js'
import { getCurrentDate } from '../../utils/getCurrentDate.js'
import axios from 'axios'

const LastConfrontations = ({ completedMatch }) => {
    const [loading, setLoading] = useState(false)
    const [lastFourMatches, setLastFourMatches] = useState([])
    const date = getCurrentDate()

    console.log({ lastFourMatches })

    // useEffect(() => {
    //     if (completedMatch?.homeTeam && completedMatch?.awayTeam) {
    //         setLoading(true)
    //         axios.get(`https://apifootboll.onrender.com/api_record?to=${date}&league=302&team_a=${completedMatch.homeTeam}&team_b=${completedMatch.awayTeam}`)
    //             .then(res => {
    //                 const sortedMatches = res.data.data.sort((a, b) => new Date(b.match_date) - new Date(a.match_date));
    //                 setLastFourMatches(sortedMatches)
    //             })
    //             .catch(error => console.log(error.message))
    //             .finally(() => setLoading(false))
    //     }
    // }, [date, completedMatch])

    return (
        <>
            <div className="flex justify-between py-2 mt-4 mb-1">
                <span className="font-medium">Últimos enfrentamientos</span>
                <div className="flex gap-2 items-center">
                    <span className="text-purple">Ver todas</span>
                    <ArrowForwardIcon />
                </div>
            </div>

            {
                loading ?
                    <SkeletonList height='6.5rem' length={4} />
                    :
                    lastFourMatches?.map((item, index) => (
                        <div key={index} className="flex flex-col justify-center mb-5 shadow-soft rounded-xl">
                            <div className='flex justify-around gap-5 text-soft-gray'>
                                <span className="py-2 px-5 text-secondary text-sm">Partidos</span>
                                <span className="py-2 px-5 text-secondary text-sm">Resultado</span>
                                <span className="py-2 px-5 text-secondary text-sm">Jornada</span>
                            </div>

                            <div className='w-full bg-soft-gray py-3 flex justify-around gap-10'>
                                <div className="flex flex-col items-start gap-1">
                                    <div className='flex gap-2'>
                                        <img className='w-5 h-5 object-contain' src={item.homeTeam == completedMatch.homeTeam ? completedMatch.team_home_badge : completedMatch.team_away_badge} alt={`Img Equipo`} />
                                        <span className="text-regular text-secondary capitalize">{item.homeTeam}</span>
                                    </div>
                                    <div className='flex gap-2'>
                                        <img className='w-5 h-5 object-contain' src={item.awayTeam == completedMatch.awayTeam ? completedMatch.team_away_badge : completedMatch.team_home_badge} alt={`Img Equipo`} />
                                        <span className="text-regular text-secondary capitalize">{item.awayTeam}</span>
                                    </div>
                                </div>

                                <div className='flex items-center gap-3'>
                                    <div className="flex flex-col items-center">
                                        <span className="text-regular">{item?.hometeam_score}</span>
                                        <span className="text-regular">{item?.awayteam_score}</span>
                                    </div>
                                    <FlagIcon />
                                </div>

                                <div>
                                    <span className='text-regular text-secondary'>{formatDateToDMYShort(item?.match_date)}</span>
                                </div>
                            </div>
                        </div>
                    ))
            }
        </>
    )
}
export default LastConfrontations
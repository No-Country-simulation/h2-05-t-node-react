import { useEffect, useState } from "react"
import FlagIcon from "../assets/icons/FlagIcon"
import Container from "../components/common/Container"
import axios from "axios"

const ClassificationPage = () => {
  const [loading, setLoading] = useState(false)
  const [rankingTeams, setRankingTeams] = useState([])

  useEffect(() => {
    setLoading(true)
    axios.get(`https://apifootboll.onrender.com/api_standings?season=2024&id=128`)
      .then(res => {
        setRankingTeams(res.data.data)
      })
      .catch(error => console.log(error))
      .finally(() => setLoading(false))
  }, [])

  return (
    <Container>
      <div className="flex justify-between mb-4">
        <span className="font-medium capitalize">La Liga</span>
      </div>

      {/* Tabla de clasificación */}
      <div className="overflow-x-auto rounded-xl shadow-soft mb-5">
        <table className="table-auto w-full">
          <thead>
            <tr className="bg-white text-regular">
              <th className="py-2 px-4 font-normal text-left text-secondary">Equipo</th>
              <th className="py-2 px-4 font-normal text-center text-secondary">P</th>
              <th className="py-2 px-4 font-normal text-center text-secondary">Goles</th>
              <th className="py-2 px-4 font-normal text-center text-secondary">GD</th>
              <th className="py-2 px-4 font-normal text-center text-secondary">PTS</th>
            </tr>
          </thead>
          <tbody className="bg-soft-gray">
            {rankingTeams?.map(item => (
              <tr key={item.team.id} className="h-[43px] text-regular border-t border-b border-gray-400">
                <td className="py-2 px-3 flex items-center gap-3">
                  <span>{item.rank}</span>
                  <img className="w-[20px] h-[20px]" src={item?.team.logo} alt={item.team.name} />
                  <p className="w-[100px] truncate">{item.team.name}</p>
                </td>
                <td className="py-2 px-0 text-center">-</td>
                <td className="py-2 px-0 text-center">-</td>
                <td className="py-2 px-0 text-center">{item.goalsDiff}</td>
                <td className="py-2 px-0 text-center">{item.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Container>
  )
}

export default ClassificationPage

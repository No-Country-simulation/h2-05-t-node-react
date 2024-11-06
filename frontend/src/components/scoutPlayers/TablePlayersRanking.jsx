import PlayersRanking from "./PlayersRanking"

const TablePlayersRanking = ({ playersList }) => {
    return (
        <section className="shadow-soft mt-3 rounded-2xl">
            <table className="w-full">
                <thead className="h-[35px]">
                    <tr className="py-2 px-6 text-regular text-secondary">
                        <th className="font-normal">#</th>
                        <th className="text-left font-normal">Jugador</th>
                        <th className="text-center font-normal">Div.</th>
                        <th className="text-center font-normal">Released</th>
                        <th className="text-center font-normal">Precio</th>
                    </tr>
                </thead>
                <tbody>
                    {playersList.map(item => (
                        <PlayersRanking key={item.id} item={item} />
                    ))}
                </tbody>
            </table>
        </section>
    )
}
export default TablePlayersRanking
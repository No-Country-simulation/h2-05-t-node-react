const UsersTokenRanking = ({ playersList, divisionNumber }) => {
    const filteredPlayersByDivision = playersList?.filter(item => Number(item.division) === Number(divisionNumber));

    // console.log(playersList)
    console.log(filteredPlayersByDivision)
    return (
        <section className="shadow-soft rounded-2xl overflow-x-auto">

            <table className="w-full text-regular text-secondary">
                <thead className="text-tertiary font-regular border-b border-b-gray-400">
                    <tr>
                        <th className="py-2 px-4 text-center">#</th>
                        <th className="py-2 px-4 text-left">Jugador</th>
                        <th className="py-2 px-4 text-right">Released</th>
                        <th className="py-2 px-4 text-center">Precio</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredPlayersByDivision?.map((item, index) => (
                        <tr key={item.id} className="border-b border-gray-400">
                            <td className="py-2 px-4 text-blue text-center text-[24px]">{index + 1}</td>
                            <td className="py-2 px-4 text-regular-16">{item.name}</td>
                            <td className="py-2 px-4 text-center text-tertiary text-regular-14">80k</td>
                            <td className="py-2 px-4 text-center text-tertiary text-regular-14">120</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    )
}

export default UsersTokenRanking;

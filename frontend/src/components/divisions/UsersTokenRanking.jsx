const UsersTokenRanking = ({ usersTokenRankingList }) => {
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
                    {usersTokenRankingList.map((item) => (
                        <tr key={item.id} className="border-b border-gray-400">
                            <td className="py-2 px-4 text-blue text-center text-[24px]">{item.id}</td>
                            <td className="py-2 px-4 text-regular-16">{item.name}</td>
                            <td className="py-2 px-4 text-center text-tertiary text-regular-14">{item.released}</td>
                            <td className="py-2 px-4 text-center text-tertiary text-regular-14">{item.price}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    )
}

export default UsersTokenRanking;

const UserRanking = ({ item, imgProfileUser }) => {
    return (
        <table className="w-full border-t border-primary">
            <tbody>
                <tr className={`${item.id === 1 ? 'bg-ranking-user' : ''} h-[59px] ps-5 pe-6 text-regular-16 text-secondary`}>
                    <td className="w-[50px] text-blue text-[24px] text-center">{item.id}</td>
                    <td>
                        <div className="flex items-center space-x-4">
                            <img className="w-[42px] h-[42px]" src={imgProfileUser} alt="user" />
                            <span>{item.name}</span>
                        </div>
                    </td>
                    <td className="text-secondary text-regular-14">{item.score}</td>
                </tr>
            </tbody>
        </table>
    )
}

export default UserRanking;

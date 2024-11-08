const UserRanking = ({ item, index, user, imgProfileUser }) => {

    return (
        <table className="w-full border-t border-primary">
            <tbody>
                <tr className={`${item.id === user?.id ? 'bg-ranking-user' : ''} h-[59px] ps-5 pe-6 text-regular-16 text-secondary`}>
                    <td className="w-[50px] text-blue text-[24px] text-center">{index + 1}</td>
                    <td>
                        <div className="flex items-center space-x-4">
                            <img className="w-[42px] h-[42px]" src={imgProfileUser} alt="user" />
                            <span>{item.user.username}</span>
                        </div>
                    </td>
                    <td className="text-secondary text-regular-14 w-[50px]">{item.points}</td>
                </tr>
            </tbody>
        </table>
    )
}

export default UserRanking;

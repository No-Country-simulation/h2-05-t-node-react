import UserRanking from "./UserRanking"

const TableUserRanking = ({ usersList, UserImg }) => {
    return (
        <section className="shadow-soft mt-3 rounded-2xl">
            <div className="py-2 px-6 flex justify-between text-regular text-secondary">
                <div>
                    <span>#</span>
                    <span className="ms-6">Nombre de usuario</span>
                </div>
                <div>Puntos</div>
            </div>
            {
                usersList.map(item => (
                    <UserRanking key={item.id} item={item} imgProfileUser={UserImg} />
                ))
            }
        </section>
    )
}
export default TableUserRanking
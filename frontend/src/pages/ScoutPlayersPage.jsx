import { Link } from "react-router-dom"

const ScoutPlayersPage = () => {
    return (
        <main className='h-screen w-full bg-gradiente flex flex-col justify-center items-center'>
            <h1 className="text-[40px] font-black text-white">Scout Players</h1>
            <p className="text-[20px] font-black text-white">(En desarrollo)</p>
            <Link to='/' className="text-white pb-[1px] border-b border-b-white">Volver a Waki</Link>
        </main>
    )
}
export default ScoutPlayersPage
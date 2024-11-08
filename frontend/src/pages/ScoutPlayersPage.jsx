import { Outlet } from "react-router-dom"
import Footer from "../components/layout/Footer"
import NavbarScoutPlayers from "../components/scoutPlayers/NavbarScoutPlayers"

const ScoutPlayersPage = () => {
    return (
        <main className='flex flex-col min-h-screen'>
            <header className='h-[147px]'>
                <div className="h-[95px] pb-6 flex items-end justify-center">
                    <span className='font-semibold text-blue text-title'>Scout Players</span>
                </div>
                <NavbarScoutPlayers />
            </header>

            <div className="flex-grow mb-5 h-[300px] overflow-scroll scrollbar-hide">
                <Outlet />
            </div>
            <Footer />
        </main>
    )
}
export default ScoutPlayersPage
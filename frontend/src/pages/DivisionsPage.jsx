import { Outlet } from "react-router-dom"
import Footer from "../components/layout/Footer"
import NavbarDivisions from "../components/divisions/NavbarDivisions"

const DivisionsPage = () => {
    return (
        <main className='flex flex-col min-h-screen'>
            <header className='h-[147px]'>
                <div className="h-[95px] pb-6 flex items-end justify-center">
                    <span className='font-semibold text-blue text-title'>Divisiones</span>
                </div>
                <NavbarDivisions />
            </header>

            <div className="flex-grow mb-5">
                <Outlet />
            </div>
            <Footer />
        </main>
    )
}
export default DivisionsPage
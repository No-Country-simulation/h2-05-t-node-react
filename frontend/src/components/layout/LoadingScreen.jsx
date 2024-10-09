import 'primereact/resources/themes/nano/theme.css'
import { ProgressBar } from "primereact/progressbar"

const LoadingScreen = () => {
    return (
        <main className='h-screen w-full flex flex-col bg-gradient-to-r from-[#317EF4] to-[#8E2BFF] justify-center items-center'>
            <h1 className="text-[44.5px] font-black text-white">WAKI</h1>
            <ProgressBar className="h-[5px] w-[134px] absolute bottom-3 rounded-lg" mode="indeterminate"></ProgressBar>
        </main>
    )
}
export default LoadingScreen
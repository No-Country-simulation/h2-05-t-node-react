import Footer from "../components/layout/Footer"
import ActivePredictions from "../components/predictions/ActivePredictions"
import HeaderPredictions from "../components/predictions/HeaderPredictions"
import LastPredictions from "../components/predictions/LastPredictions"

const MyPredictionsPage = () => {
    return (
        <main className="flex flex-col min-h-screen">
            <HeaderPredictions />
            <div className="flex-grow">
                <ActivePredictions />
                <LastPredictions />
            </div>
            <Footer />
        </main>
    )
}
export default MyPredictionsPage
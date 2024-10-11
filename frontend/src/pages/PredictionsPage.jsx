import Leagues from "../components/predictions/Leagues"
import Header from "../components/predictions/Header"
import Search from "../components/predictions/Search"
const PredictionsPage = () => {
    return (
        <main className="pt-[147px]">
            <Header />
            <Search />
            <Leagues />
        </main>
    );
}
export default PredictionsPage;

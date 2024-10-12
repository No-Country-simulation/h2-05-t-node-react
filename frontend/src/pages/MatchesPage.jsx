import Header from '../components/matches/Header';
import Leagues from '../components/matches/Leagues';
import Search from '../components/matches/Search';
const MatchesPage = () => {
    return (
        <main className="pt-[147px]">
            <Header />
            <Search />
            <Leagues />
        </main>
    );
}
export default MatchesPage;

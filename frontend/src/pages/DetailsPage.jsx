import { useState, useEffect } from 'react'
import Container from "../components/common/Container"
import Details from "../components/completedMatches/Details"
import KeyMoments from "../components/completedMatches/KeyMoments"
import LastConfrontations from "../components/completedMatches/LastConfrontations"

const DetailsPage = () => {
  const [completedMatch, setCompletedMatch] = useState(null)

  useEffect(() => {
    const storedMatch = localStorage.getItem('completedMatch');
    if (storedMatch) {
      setCompletedMatch(JSON.parse(storedMatch));
    }
  }, []);

  console.log(completedMatch)

  return (
    <Container>
      <Details completedMatch={completedMatch} />
      <KeyMoments completedMatch={completedMatch} /> {/* SOLO PARA PARTIDOS FINALIZADOS */}
      <LastConfrontations />
    </Container>
  )
}
export default DetailsPage
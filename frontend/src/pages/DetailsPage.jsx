import { useState, useEffect } from 'react'
import Container from "../components/common/Container"
import Details from "../components/completedMatches/Details"
import KeyMoments from "../components/completedMatches/KeyMoments"
import LastConfrontations from "../components/completedMatches/LastConfrontations"

const DetailsPage = () => {
  const [selectedMatch, setSelectedMatch] = useState(null)

  useEffect(() => {
    const storedMatch = localStorage.getItem('selectedMatch');
    if (storedMatch) {
      setSelectedMatch(JSON.parse(storedMatch));
    }
  }, []);

  console.log(selectedMatch)

  return (
    <Container>
      <Details selectedMatch={selectedMatch} />
      <KeyMoments selectedMatch={selectedMatch} />
      <LastConfrontations selectedMatch={selectedMatch} />
    </Container>
  )
}
export default DetailsPage
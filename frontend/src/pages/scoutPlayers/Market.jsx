import { useEffect, useState } from "react";
import Container from "../../components/common/Container";
import MarketSectionOne from "../../components/scoutPlayers/MarketSectionOne";
import MarketSectionTwo from "../../components/scoutPlayers/MarketSectionTwo";
import MarketOrdersHoldings from "../../components/scoutPlayers/MarketOrdersHoldings";

const initialTablaOne = [
  { id: 1, fila1: "67.378,00", fila2: "0,05810" },
  { id: 2, fila1: "68.123,45", fila2: "0,05920" },
  { id: 3, fila1: "69.456,78", fila2: "0,06030" },
  { id: 4, fila1: "70.789,01", fila2: "0,06140" },
  { id: 5, fila1: "71.234,56", fila2: "0,06250" },
  { id: 6, fila1: "72.987,65", fila2: "0,06360" },
  { id: 7, fila1: "73.456,78", fila2: "0,06470" },
]

const Market = () => {
  const [tableSectionOne] = useState(initialTablaOne)
  const [initialPrice, setInitialPrice] = useState(67378)
  const [playerData, setPlayerData] = useState(null);

  useEffect(() => {
    const storedPlayerData = localStorage.getItem("playerData");
    if (storedPlayerData) {
      setPlayerData(JSON.parse(storedPlayerData))
    }
  }, [])

  return (
    <>
      <Container>
        <MarketSectionOne playerData={playerData} initialPrice={initialPrice} setInitialPrice={setInitialPrice} tableSectionOne={tableSectionOne} />
        <MarketSectionTwo playerData={playerData} initialPrice={initialPrice} tableSectionTwo={tableSectionOne} />
      </Container>
      <MarketOrdersHoldings />
    </>
  )
}

export default Market;

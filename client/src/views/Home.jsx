import { useState, useEffect } from "react"
import service from "../service"
import Screens from "../components/Screens"

export default function Home() {

  const [printersData, setPrintersData] = useState([])
  const [activeScreen, setActiveScreen] = useState('dashboard')

  async function getPrintersData() {
    const response = await service.getPrinters()
    setPrintersData(response.data)
  }

  useEffect(() => {
    getPrintersData()
  }, [])

  return (
    <>
      <div>
        <Screens 
          setActiveScreen={setActiveScreen}
          activeScreen={activeScreen}
          printersData={printersData}
          refreshData={getPrintersData}
        />
      </div>
    </>
  )

}
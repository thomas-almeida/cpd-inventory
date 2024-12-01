import Dashboard from "../views/Dashboard"
import Form from "../views/Form"
import PrinterList from "../views/PrinterList"

export default function Screens({
  activeScreen,
  setActiveScreen,
  printersData,
  refreshData
}) {
  return (
    <>
        { activeScreen === 'dashboard' && <Dashboard visible={true} printersData={printersData} setActiveScreen={setActiveScreen} activeScreen={activeScreen} refreshData={refreshData} />}
        { activeScreen === 'form' && <Form visible={true} printersData={printersData} setActiveScreen={setActiveScreen} activeScreen={activeScreen} refreshData={refreshData} />}
        { activeScreen === 'printers-list' && <PrinterList visible={true} printersData={printersData} setActiveScreen={setActiveScreen} activeScreen={activeScreen} refreshData={refreshData} />}
    </>
  )
}
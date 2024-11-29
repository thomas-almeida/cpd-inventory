
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Dashboard from "./views/Dashboard"
import Form from "./views/Form"

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />}></Route>
        <Route path="/form" element={<Form />}></Route>
      </Routes>
    </Router>
  )
}

export default App

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Components/home'
import Login from './Components/login'
import Signup from './Components/signup'
import Verify from './Components/verify'
import Error from './Components/error'
import Verified from './Components/verified'
import './App.css'

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/error" element={<Error />} />
          <Route path="/verified" element={<Verified />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App

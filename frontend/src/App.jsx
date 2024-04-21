import {Routes, Route, Navigate} from "react-router-dom"
import Home from "./Pages/Home"
import Register from "./Pages/Register"
import Notfound from "./Pages/Notfound"
import Login from "./Pages/Login"
import ProtectedRoute from "./components/ProtectedRoutes"

// function for loging us out
function Logout(){
  try{
    localStorage.clear();
  }catch(error){
    console.log(error)
  }
  
  return <Navigate to="/login" />
}

function RegisterAndClear(){
  localStorage.clear();
  return <Register />
}


function App() {

  return (
    
      <Routes>
        <Route path="/" element={
          <ProtectedRoute> 
            <Home />
          </ProtectedRoute>
        } 
        />

        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Notfound />} ></Route>

      </Routes>
    
  )
}

export default App

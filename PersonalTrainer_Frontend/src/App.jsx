

/* import './App.css' */
import { Link, Outlet } from "react-router-dom";



function App() {
  

  return (
    <>

<nav>
        <Link to={"/"}>pääsivu</Link>{' '}
        
        <Link to={"/training"}>Training</Link>{' '}
        <Outlet />
        


        
      </nav>
      
    </>
  )
}

export default App

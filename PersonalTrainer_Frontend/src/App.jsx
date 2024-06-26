


import { Link, Outlet } from "react-router-dom";
import { AppBar, Container, CssBaseline, Toolbar, Typography, Tabs, Box } from "@mui/material";


function App() {



  return (
    <>

      <nav>
        <CssBaseline />
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6">
              Personal Training Application
            </Typography>
            <div style={{ marginLeft: '20px' }} /> 
            <Link to={"/"} style={{ marginLeft: '20px', marginRight: '20px' }}>Customers</Link>{' '} 
            <Link to={"/training"} style={{ marginLeft: '20px', marginRight: '20px' }}>Training</Link>{' '} 
            <Link to={"/calendar"} style={{ marginLeft: '20px', marginRight: '20px' }}>Calendar</Link>{' '} 
            <Link to={"/statistics"} style={{ marginLeft: '20px', marginRight: '20px' }}>Statistics</Link>{' '} 


          </Toolbar>
        </AppBar>
        <Outlet />
      </nav>

    </>
  )
}

export default App

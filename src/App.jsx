import Customer from './components/Customer'
import Training from './components/Training'
import Home from './components/Home';
import TrainingCalendar from './components/TrainingCalendar';
// import Home from './components/Home'
import { useState } from 'react';
import { AppBar, Tab, Tabs, Typography } from '@mui/material';
import './App.css';

import { Link, Outlet } from 'react-router-dom';

function App() {

  return (

    <>
      <AppBar
        position='absolute'
        color='transparent'
      >
        <Typography variant="h4" >
          Personal Trainer App
        </Typography>
        <nav>
          <Link to={'/'}>Home </Link>
          <Link to={'/customers'}>Customers </Link>
          <Link to={'/trainings'}>Trainings </Link>
          <Link to={'/calendar'}>Calendar </Link>
        </nav>

        <Outlet />
      </AppBar>
    </>

  );

  // const [value, setValue] = useState('Home');

  // const handleChange = (_, value) => {
  //   setValue(value);
  // }

  // return (
  //   <>
  //     <div>
  //       <Tabs
  //         TabIndicatorProps={{ style: { background: 'black' }, text: 'black' }}
  //         value={value}
  //         onChange={handleChange}
  //         centered={true}
  //         color="pink"
  //         style={{ backgroundColor: 'pink' }}
  //         textColor="inherit"
  //         indicatorColor="black">
  //         <Tab
  //           value="Home"
  //           label="Home">
  //         </Tab>
  //         <Tab
  //           value="Customer"
  //           label="Customer">
  //         </Tab>
  //         <Tab
  //           value="Training"
  //           label="Training">
  //         </Tab>
  //         <Tab
  //           value="TrainingCalendar"
  //           label="Calendar">
  //         </Tab>
  //       </Tabs>
  //       {value === "Home" && <Home />}
  //       {value === "Customer" && <Customer />}
  //       {value === "Training" && <Training />}
  //       {value === "TrainingCalendar" && <TrainingCalendar />}

  //     </div>
  //   </>
  // )
}

export default App

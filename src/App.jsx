import Customer from './components/Customer'
import Training from './components/Training'
import Home from './components/Home';
import TrainingCalendar from './components/TrainingCalendar';
// import Home from './components/Home'
import { useState } from 'react';
import { Tab, Tabs } from '@mui/material';
import './App.css';

function App() {

  const [value, setValue] = useState('Home');

  const handleChange = (_, value) => {
    setValue(value);
  }

  return (
    <>
      <div>
        <Tabs
          TabIndicatorProps={{ style: { background: 'black' }, text: 'black' }}
          value={value}
          onChange={handleChange}
          centered={true}
          color="pink"
          style={{ backgroundColor: 'pink' }}
          textColor="inherit"
          indicatorColor="black">
          <Tab
            value="Home"
            label="Home">
          </Tab>
          <Tab
            value="Customer"
            label="Customer">
          </Tab>
          <Tab
            value="Training"
            label="Training">
          </Tab>
          <Tab
            value="TrainingCalendar"
            label="Calendar">
          </Tab>
        </Tabs>
        {value === "Home" && <Home />}
        {value === "Customer" && <Customer />}
        {value === "Training" && <Training />}
        {value === "TrainingCalendar" && <TrainingCalendar />}

      </div>
    </>
  )
}

export default App

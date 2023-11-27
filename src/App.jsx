import Customer from './components/Customer'
import Training from './components/Training'
import Home from './components/Home';
import Calendar from './components/Calendar';
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
            value="Calendar"
            label="Calendar">
          </Tab>
        </Tabs>
        {value === "Home" && <Home />}
        {value === "Customer" && <Customer />}
        {value === "Training" && <Training />}
        {value === "Calendar" && <Calendar />}

      </div>
    </>
  )
}

export default App

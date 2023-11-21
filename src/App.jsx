import Customer from './components/Customer'
import Training from './components/Training'
// import Home from './components/Home'
import { useState } from 'react';
import { Tab, Tabs } from '@mui/material';

function App() {

  const [value, setValue] = useState('');

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
            value="Customer"
            label="Customer">
          </Tab>
          <Tab
            value="Training"
            label="Training">
          </Tab>
        </Tabs>
        {value === "Customer" && <Customer />}
        {value === "Training" && <Training />}

      </div>
    </>
  )
}

export default App

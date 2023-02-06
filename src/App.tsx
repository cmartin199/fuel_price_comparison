import { useState, useEffect } from 'react';
import { json } from 'stream/consumers';
import './App.css';
import { TextField, Button, Box, Typography } from '@mui/material';

function App() {

  //import requests

  // Set Variables
  const ApiKey = `175018f0-9fa4-4cf9-ae19-a24a53466e38`;
  const [postcode, setPostcode] = useState('BS12AN');
  const [fuelType, setFuelType] = useState('Unleaded');
  const [data, setData] = useState([]);
  const [apiCalled, setApiCalled] = useState(false);

  // Create GET Request (Include payload & headers)
  async function LoadAPI() {
    const URL = `https://uk1.ukvehicledata.co.uk/api/datapackage/FuelPriceData?v=2&api_nullitems=1&auth_apikey=${ApiKey}&key_POSTCODE=${postcode}`;
    const responseJSON = await fetch(URL).then(response => response.json());
    setData(responseJSON.Response.DataItems.FuelStationDetails.FuelStationList);

    setApiCalled(true);
    console.log(data);
  }

  useEffect(() => {
    LoadAPI();
  }, []);

  return (
    <div className="App">
      <h1>this is a fuel comparison App</h1>
      <TextField label="Postcode" variant="outlined" onChange={(e) => (setPostcode(e.target.value))} />
      <Button variant="contained" onClick={LoadAPI}>Submit</Button>
      <Box>
        <Button variant="contained" onClick={() => { setFuelType('Unleaded') }}>Unleaded Petrol</Button>
        <Button variant="contained" onClick={() => { setFuelType('Super Unleaded') }}>Premium Unleaded</Button>
        <Button variant="contained" onClick={() => { setFuelType('Diesel') }}>Diesel</Button>

      </Box>
      {apiCalled &&
        data.map((item, key) => {
          return (
            < div key={key} >
              {item}
            </div>
          );
        })
      }
    </div >
  );
}

export default App;

import { useState, useEffect, SetStateAction } from 'react';
import { json } from 'stream/consumers';
import './App.css';
import { TextField, Button, Box } from '@mui/material';
import { StationTile } from './components/stationTile';

function App() {

  //import requests

  // Set Variables
  const ApiKey = `175018f0-9fa4-4cf9-ae19-a24a53466e38`;
  const [postcode, setPostcode] = useState('GIR 0AA');
  const [fuelType, setFuelType] = useState('Unleaded');
  const [data, setData] = useState([]);
  const [apiCalled, setApiCalled] = useState(false);

  // Create GET Request (Include payload & headers)
  async function LoadAPI() {
    const URL = `https://uk1.ukvehicledata.co.uk/api/datapackage/FuelPriceData?v=2&api_nullitems=1&auth_apikey=${ApiKey}&key_POSTCODE=${postcode}`;
    const responseJSON = await fetch(URL).then(response => response.json());
    console.log(responseJSON);
    try {
      setData(responseJSON.Response.DataItems.FuelStationDetails.FuelStationList);
    }
    catch (e) {
      setData(responseJSON.Response.StatusMessage);
      console.log(data);
      //TODO: get the no data message to display
    }
    setApiCalled(true);
  }

  useEffect(() => {
    LoadAPI();
  }, []);

  return (
    <div className="App">
      <h1>this is a fuel comparison App</h1>
      <TextField label="Postcode" variant="outlined" onChange={(e: { target: { value: SetStateAction<string>; }; }) => (setPostcode(e.target.value))} />
      <Button variant="contained" onClick={LoadAPI}>Submit</Button>
      <Box>
        <Button variant="contained" onClick={() => { setFuelType('Unleaded') }}>Unleaded Petrol</Button>
        <Button variant="contained" onClick={() => { setFuelType('Super Unleaded') }}>Premium Unleaded</Button>
        <Button variant="contained" onClick={() => { setFuelType('Diesel') }}>Diesel</Button>

      </Box>
      {(apiCalled) &&
        data.map((item, key) => {
          //console.log(item['FuelPriceList'])
          return (
            < div key={key} >
              <StationTile
                distanceFromSearchPostcode={item['DistanceFromSearchPostcode']}
                fuelPriceList={item['FuelPriceList']}
                name={item['Name']}
                postcode={item['Postcode']}
                street={item['Street']}
              />
            </div>
          );
        })
      }
    </div >
  );
}

export default App;

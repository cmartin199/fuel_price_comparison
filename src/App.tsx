import { useState, SetStateAction } from 'react';
import './App.css';
import { TextField, Button, Typography } from '@mui/material';
import { StationTile } from './components/stationTile';

function App() {

  //import requests

  // Set Variables
  const ApiKey = process.env.REACT_APP_API_KEY;
  // to test with no responses use this: GIR 0AA
  // to test when you want the data to be returned: BS12AN
  const [postcode, setPostcode] = useState('GIR 0AA');
  //const [fuelType, setFuelType] = useState('Unleaded');
  const [data, setData] = useState([]);
  const [apiCalled, setApiCalled] = useState(false);
  const [isDataReturned, setIsDataReturned] = useState(false);

  // Create GET Request (Include payload & headers)
  async function LoadAPI() {
    const URL = `https://uk1.ukvehicledata.co.uk/api/datapackage/FuelPriceData?v=2&api_nullitems=1&auth_apikey=${ApiKey}&key_POSTCODE=${postcode}`;
    const responseJSON = await fetch(URL).then(response => response.json());
    console.log(responseJSON);
    try {
      setData(responseJSON.Response.DataItems.FuelStationDetails.FuelStationList);
      setIsDataReturned(true);
    }
    catch (e) {
      setData(responseJSON.Response.StatusMessage);
      console.log(data);
      //TODO: get the no data message to display
    }
    setApiCalled(true);
  }


  return (
    <div className="App">
      <h1>this is a fuel comparison App</h1>
      <TextField label="Postcode" variant="outlined" onChange={(e: { target: { value: SetStateAction<string>; }; }) => (setPostcode(e.target.value))} />
      <Button variant="contained" onClick={LoadAPI}>Submit</Button>
      {apiCalled && 
      isDataReturned 
      ? data.map((item, key) => {
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

      : <Typography>Sorry, no locations found within five miles of that address</Typography>
      }
    </div >
  );
}

export default App;

import { useEffect } from 'react';
import './App.css';

function App() {

  //import requests

  // Set Variables
  const ApiKey = `175018f0-9fa4-4cf9-ae19-a24a53466e38`;
  const postcode = 'BS12AN'
  var responseJSON;

  // Create GET Request (Include payload & headers)
  async function LoadAPI() {
    const URL = `https://uk1.ukvehicledata.co.uk/api/datapackage/FuelPriceData?v=2&api_nullitems=1&auth_apikey=${ApiKey}&key_POSTCODE=${postcode}`;
    const res = await fetch(URL);
    responseJSON = res.json();
    console.log(responseJSON);
  }

  useEffect(() => {
    LoadAPI();
  }, []);

  return (
    <div className="App">
      <h1>this is a fuel comparison App</h1>
    </div>
  );
}

export default App;

import { useEffect } from 'react';
import './App.css';

function App() {
    
  //import requests
  
  // Set Variables
  const ApiKey = "175018f0-9fa4-4cf9-ae19-a24a53466e38";
  const DataPackage = "VehicleData";
  var VRM = "KM14AKK";
  var ResponseJSON = "";
  
  // Create payload dictionary
  const Payload = {
    "v" : 2, // Package version
    "api_nullitems" : 1, // Return null items,
    "key_vrm" : VRM, // Vehicle registration mark,
    "auth_apikey" : ApiKey // Set the API Key
  };
  
  // Create GET Request (Include payload & headers)
    useEffect(() => {
      fetch('https://uk1.ukvehicledata.co.uk/api/datapackage/FuelPriceData?v=2&api_nullitems=1&auth_apikey=${ApiKey}}&key_POSTCODE=BS12AN').then(
    (response) => console.log(response));
   }, []);
  /*
  // Check for a successful response
  if r.status == requests.codes.ok:
        // -> Request was successful
  
        // Response JSON Object
        ResponseJSON = r.json()
  
  else:
        // -> Request was not successful
        ErrorContent = 'Status Code: {}, Reason: {}'.format(r.status_code, r.reason)
  */
  return (
    <div className="App">
      <h1>this is a fuel comparison App</h1>
    </div>
  );
}

export default App;

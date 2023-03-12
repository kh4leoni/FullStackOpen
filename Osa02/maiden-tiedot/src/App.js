import { useState, useEffect } from "react";
import axios from "axios";
import Countries from "./components/Countries";

const App = () => {
  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState({});
  const [showInfo, setShowInfo] = useState(false);
  const [weatherData, setWeatherData] = useState({});

  useEffect(() => {
    const api = {
      key: process.env.REACT_APP_APIKEY,
      baseUrl: "https://api.openweathermap.org/data/2.5/",
    };

    axios
      .get(
        `${api.baseUrl}weather?q=${selectedCountry.capital}&units=metric&APPID=${api.key}`
      )
      .then((response) => {
        setWeatherData(response.data);
      })
      .catch((error) => {
        console.log("No country selected");
      });
      console.log('selecedCountry changed', selectedCountry)
      
  }, [selectedCountry]);

  

  const url = "https://restcountries.com/v2/all";

  useEffect(() => {
    console.log("fetching countries...");
    axios.get(url).then((response) => {
      setCountries(response.data)
    })
  }, []);

  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleShowCountry = (country) => {
    if(country.capital) {
        setShowInfo(true);
        setSelectedCountry({...country})
    } else {
        console.log("Country does not have a capital")
    }
       
   
      
    
  
   
  };

  return (
    <div>
      <label htmlFor="">find countries</label>
      <input
        type="text"
        placeholder=""
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setShowInfo(false);
        }}
      />

      <Countries
        countries={filteredCountries}
        handleShowCountry={handleShowCountry}
        showInfo={showInfo}
        selectedCountry={selectedCountry}
        weatherData={weatherData}
      />
    </div>
  );
};

export default App;

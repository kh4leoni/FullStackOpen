
const Country = (weatherData, selectedCountry) => {
    return (
        <div key={selectedCountry.name}>
        <h1>{selectedCountry.name}</h1>
        <div className="capital">
          <p>capital {selectedCountry.capital}</p>
          <p>area {selectedCountry.area}</p>
        </div>
        <div className="languages">
          <p>languages:</p>
          <ul>
            {selectedCountry.languages.map((language) => {
              return <li key={language.name}>{language.name}</li>;
            })}
          </ul>
        </div>
        <div>
          <img src={selectedCountry.flag} width="200" />
        </div>
        {typeof weatherData.main !== "undefined" ? (
                    <div>
                        <p>temperature: {weatherData.main.temp}</p>
                        <img src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`} alt="" />
                        <p>wind: {`${weatherData.wind.speed} m/s`}</p>
                    </div>
                   ) : (
                   "Loading.."
                   )
                }
        
      </div>
    );
}

export default Country;

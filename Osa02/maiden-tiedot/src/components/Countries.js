const Countries = ({
  countries,
  handleShowCountry,
  showInfo,
  selectedCountry,
  weatherData,
}) => {
  console.log(weatherData);

  return (
    <div>
      <div>
        {showInfo ? (
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
        ) : (
          <div>
            {countries.length > 10 ? (
              <p>Too many matches, specify another filter</p>
            ) : (
              <div>
                {countries.map((country) => {
                  if (countries.length === 1) {
                    handleShowCountry(country)
                    return (
                      <div key={country.name}>
                        <h1>{country.name}</h1>
                        <div className="capital">
                          <p>capital {country.capital}</p>
                          <p>area {country.area}</p>
                        </div>

                        <div className="languages">
                          <p>languages:</p>
                          <ul>
                            {country.languages.map((language) => {
                              return (
                                <li key={language.name}>{language.name}</li>
                              );
                            })}
                          </ul>
                        </div>
                        <div>
                          <img src={country.flag} width="200" />
                        </div>
               
                      </div>
                    );
                  } else {
                    return (
                      <p key={country.name}>
                        {country.name}
                        <button onClick={() => handleShowCountry(country)}>
                          show
                        </button>
                      </p>
                    );
                  }
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Countries;

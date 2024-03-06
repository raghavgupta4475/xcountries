import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then(response => response.json())
      .then(data => setCountries(data))
      .catch(error => console.log('Error fetching data', error));
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredCountries = countries.filter(country =>
    country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="countries-container">
      <header className="header">
        <input type="text" placeholder="Search for countries" onChange={handleSearch} />
      </header>
      <div className="country-cards">
        {filteredCountries.map(country => (
          <div key={country.name.common} className="countryCard">
            {country.name.common.toLowerCase().includes(searchTerm.toLowerCase()) && (
              <>
                <img src={country.flags.png} alt={country.name.common} />
                <p>{country.name.common}</p>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
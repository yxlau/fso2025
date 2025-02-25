import { useState, useEffect } from "react";
import "./index.css";
import CountryService from "./services/CountryService";
import Countries from "./components/Countries";

function App() {
  const [filter, setFilter] = useState("");
  const [allCountries, setAllCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);

  const updateFilter = (e) => {
    e.preventDefault();
    setCountry(e.target.value);
  };

  useEffect(() => {
    CountryService.getAll().then((response) => setAllCountries(response));
  }, []);

  const setCountry = (countryName) => {
    setFilter(countryName);
    setFilteredCountries(
      allCountries.filter((country) => {
        return country.name.common
          .toLowerCase()
          .includes(countryName.toLowerCase());
      })
    );
  };

  return (
    <>
      <div>
        find countries{" "}
        <input type="text" value={filter} onChange={updateFilter} />
        <Countries
          countries={filteredCountries}
          filter={filter}
          setCountry={setCountry}
        />
      </div>
    </>
  );
}

export default App;

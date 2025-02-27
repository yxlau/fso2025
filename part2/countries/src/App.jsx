import { useState, useEffect } from "react";
import "./index.css";
import CountryService from "./services/CountryService";
import Countries from "./components/Countries";

function App() {
  const [filter, setFilter] = useState("");
  const [allCountries, setAllCountries] = useState([]);

  useEffect(() => {
    CountryService.getAll().then((response) => setAllCountries(response));
  }, []);

  const updateFilter = (e) => {
    e.preventDefault();
    setFilter(e.target.value);
  };

  const setCountry = (countryName) => {
    setFilter(countryName);
  };

  return (
    <>
      <div>
        find country{" "}
        <input type="text" value={filter} onChange={updateFilter} />
        <Countries
          countries={allCountries}
          filter={filter}
          setCountry={setCountry}
        />
      </div>
    </>
  );
}

export default App;

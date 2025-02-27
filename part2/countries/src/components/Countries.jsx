import Country from "./Country.jsx";
import Weather from "./Weather.jsx";

const Countries = ({ countries, filter, setCountry }) => {
  const filteredCountries = countries.filter((country) => {
    return country.name.common.toLowerCase().includes(filter.toLowerCase());
  });

  if (!filter) {
    return <></>;
  }

  if (filteredCountries.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  }

  if (filteredCountries.length > 1) {
    return (
      <>
        {filteredCountries.map((country) => (
          <div key={country.ccn3}>
            {" "}
            {country.name.common}{" "}
            <button onClick={() => setCountry(country.name.common)}>
              show
            </button>
          </div>
        ))}
      </>
    );
  }

  if (filteredCountries.length === 1) {
    console.log("1 country");

    const country = filteredCountries[0];

    return (
      <div>
        <Country country={country} />
        <Weather countryData={country} />
      </div>
    );
  }

  return <div>no countries</div>;
};

export default Countries;

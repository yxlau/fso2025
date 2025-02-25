import Country from "./Country.jsx";

const Countries = ({ countries, filter, setCountry }) => {
  if ( ! filter){
    return (<></>)
  }

  if (countries.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  }

  if (countries.length > 1) {
    return (
      <>
        {countries.map((country) => (
          <div key={country.ccn3}> {country.name.common} <button onClick={() => setCountry(country.name.common)}>show</button></div>
        ))}
      </>
    );
  }

  if (countries.length === 1 ){    
    return (
      <div>
      <Country country={countries[0]} />
      </div>
    )
  }

  return (
    <div>no countries</div>
  )
};

export default Countries;

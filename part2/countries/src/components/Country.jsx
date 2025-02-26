const Country = ({country}) => {
  
  return (
    <div>
      <h2>{country.name.common}</h2>
      {country.capital ? country.capital.map(c => <div key={c}>Capital: {c}</div>) : "Capital: -"}
      <div>Area {country.area}</div>
      <h3>Languages</h3>
      <ul>
        {
          Object.values(country.languages).map(lang => <li key={lang}>{lang}</li>)
        }
      </ul>
      <img src={country.flags.png} />


    </div>
  )
}

export default Country
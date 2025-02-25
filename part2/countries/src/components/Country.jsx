const Country = ({country}) => {
  console.log('country', country);
  
  return (
    <div>
      <h2>{country.name.common}</h2>
      {country.capital.map(c => <div key={c}>Capital {c}</div>)}
      <div>Area {country.area}</div>
      <h3>Languages</h3>
      <ul>
        {
          Object.values(country.languages).map(lang => <li>{lang}</li>)
        }
      </ul>
      <img src={country.flags.png} />


    </div>
  )
}

export default Country
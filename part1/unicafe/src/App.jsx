import { useState } from 'react'

const Button = ({label}) => {
  return (
  <button>{label}</button>
  )
}

const Stats = ({label, count}) => {
  return (
    <p>{label} {count}</p>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
     <h1>give feedback</h1>
    <Button label="good" onClick={() => setGood(good + 1)} />
    <Button label="neutral" onClick={() => setNeutral(neutral + 1)} />
    <Button label="bad" onClick={() => setBad(bad + 1)} />
     <h2>statistics</h2>
    <Stats label="good" count={good} />
    <Stats label="neutral" count={neutral} />
    <Stats label="bad" count={bad} />
    </div>
  )
}

export default App
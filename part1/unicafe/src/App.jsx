import { useState } from 'react'

const Button = ({label, onClick}) => {
 
  return (
  <button onClick={onClick}>{label}</button>
  )
}

const StatisticsLine = ({text, count}) => {
  return (
    <tr><td>{text}</td><td>{count}</td></tr>
  )
}

const Statistics = ({total, good, neutral, bad}) => {
  if (total == 0){
    return (
     <p>No feedback given</p>
    )
  }
  return (
    <table>
    <StatisticsLine text="good" count={good} />
    <StatisticsLine text="neutral" count={neutral} />
    <StatisticsLine text="bad" count={bad} />
    <StatisticsLine text="all" count={total} />
    <StatisticsLine text="average" count={ (good * 1 + bad * -1 + neutral * 0) / (total)} />
    <StatisticsLine text="positive" count={good / (total) * 100 + "%"} / >
    </table>
  )
}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)

  const clickHandler = (clickType) => {
    switch (clickType){
      case "good":
        setGood(good + 1);
        break
      case "bad": 
        setBad(bad + 1);
        break
      case "neutral":
        setNeutral(neutral + 1);
        break
    }
    setTotal(total + 1)
  }

  return (
    <div>
     <h1>give feedback</h1>
    <Button label="good" onClick={() => clickHandler("good")} />
    <Button label="neutral" onClick={() => clickHandler("neutral")} />
    <Button label="bad" onClick={() => clickHandler("bad")} />
    <h2>statistics</h2>
    <Statistics total={total} good={good} bad={bad} neutral={neutral} />
    </div>
  )
}

export default App
import { useState } from 'react'

const LoginForm = ({ login }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const loginHandler = async (e) => {
    e.preventDefault()
    login(username, password)
  }

  return (
    <form onSubmit={loginHandler}>
      <div>
        <label htmlFor="username">username</label>
        <input
          type="text"
          name="username"
          data-testid="username"
          onChange={({ target }) => {
            setUsername(target.value)
          }}
          value={username}
        />
      </div>
      <div>
        <label htmlFor="password">password</label>
        <input
          type="password"
          name="password"
          data-testid="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit" data-testid="login">login</button>
    </form>
  )
}

export default LoginForm

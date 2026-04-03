import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Register() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const response = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        fullName,
        email,
        password
      })
    })

    const data = await response.json()

    if (response.ok) {
      setMessage('Register successful')
      setTimeout(() => {
        navigate('/login')
      }, 1000)
    } else {
      setMessage(data.message || 'Register failed')
    }
  }

  return (
    <div>
      <h2>Register Page</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>

        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit">Register</button>
      </form>

      <p>{message}</p>
    </div>
  )
}

export default Register
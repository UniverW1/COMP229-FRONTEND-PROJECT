import { Link, useNavigate } from 'react-router-dom'

function Navbar() {
  const token = localStorage.getItem('token')
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <div style={{ padding: '15px', borderBottom: '1px solid #ccc' }}>
      <Link to="/" style={{ marginRight: '15px' }}>Home</Link>
      <Link to="/products" style={{ marginRight: '15px' }}>Products</Link>

      {!token && (
        <Link to="/login" style={{ marginRight: '15px' }}>Login</Link>
      )}

      {!token && (
        <Link to="/register" style={{ marginRight: '15px' }}>Register</Link>
      )}

      {token && (
        <button onClick={handleLogout}>Logout</button>
      )}
    </div>
  )
}

export default Navbar
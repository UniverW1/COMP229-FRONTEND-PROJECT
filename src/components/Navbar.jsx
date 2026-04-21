import { Link, useNavigate } from 'react-router-dom'

function Navbar() {
  const token = localStorage.getItem('token')
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <div className="navbar">
      
     
      <div className="nav-left">
        <img src="/solemasters-logo.png" alt="Sole Masters" className="logo" />
        <h2 className="brand">Sole Masters</h2>
      </div>


      <div className="nav-right">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>

        {!token && <Link to="/login">Login</Link>}
        {!token && <Link to="/register">Register</Link>}

        {token && <button onClick={handleLogout}>Logout</button>}
      </div>
    </div>
  )
}

export default Navbar
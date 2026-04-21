import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function Products() {
  const [products, setProducts] = useState([])
  const token = localStorage.getItem('token')

  const fetchProducts = async () => {
    const response = await fetch('https://comp229-backend-project.onrender.com/api/products')
    const data = await response.json()

    if (response.ok) {
      setProducts(data.products || [])
    }
  }

  const handleDelete = async (id) => {
    const response = await fetch(`https://comp229-backend-project.onrender.com/api/products/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    if (response.ok) {
      fetchProducts()
    }
  }

  const handleDisable = async (id) => {
    await fetch(`https://comp229-backend-project.onrender.com/api/products/${id}/disable`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    fetchProducts()
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  return (
    <div>
      <h2>Products</h2>

      {token && (
        <Link to="/add-product">
          <button>Add Product</button>
        </Link>
      )}

      {products.length === 0 ? (
        <p>No products found</p>
      ) : (
        <div className="product-grid">
          {products.map((product) => (
            <div className="product-card" key={product._id}>

              <img
                src={product.imageUrl || 'https://via.placeholder.com/150'}
                alt={product.name}
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "contain",
                    borderRadius: "8px"
                  }}
              />

              <h3>{product.name}</h3>
              <p>Brand: {product.brand}</p>
              <p>Category: {product.category}</p>
              <p>Price: ${product.price}</p>
              <p>Color: {product.color}</p>
              <p>Stock: {product.stock}</p>

              <p className="timestamp">
                Created: {new Date(product.createdAt).toLocaleString()}
              </p>
              <p className="timestamp">
                Updated: {new Date(product.updatedAt).toLocaleString()}
              </p>

              {token && (
                <div className="actions">
                  <Link to={`/edit-product/${product._id}`}>
                    <button>Edit</button>
                  </Link>
                  <button onClick={() => handleDelete(product._id)}>Delete</button>
                  <button onClick={() => handleDisable(product._id)}>Disable</button>
                </div>
              )}

            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Products
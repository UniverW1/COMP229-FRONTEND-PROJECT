import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function Products() {
  const [products, setProducts] = useState([])
  const token = localStorage.getItem('token')

  const fetchProducts = async () => {
    const response = await fetch('http://localhost:5000/api/products')
    const data = await response.json()

    if (response.ok) {
      setProducts(data.data || [])
    }
  }

  const handleDelete = async (id) => {
    const response = await fetch(`http://localhost:5000/api/products/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    if (response.ok) {
      fetchProducts()
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  return (
    <div>
      <h2>Products Page</h2>

      {token && (
        <Link to="/add-product">
          <button>Add Product</button>
        </Link>
      )}

      {products.length === 0 ? (
        <p>No products found</p>
      ) : (
        products.map((product) => (
          <div
            key={product._id}
            style={{ border: '1px solid gray', margin: '10px 0', padding: '10px' }}
          >
            <h3>{product.name}</h3>
            <p>Brand: {product.brand}</p>
            <p>Category: {product.category}</p>
            <p>Price: ${product.price}</p>
            <p>Color: {product.color}</p>
            <p>Stock: {product.stock}</p>

            {token && (
              <>
                <Link to={`/edit-product/${product._id}`}>
                  <button>Edit</button>
                </Link>
                <button onClick={() => handleDelete(product._id)}>Delete</button>
              </>
            )}
          </div>
        ))
      )}
    </div>
  )
}

export default Products
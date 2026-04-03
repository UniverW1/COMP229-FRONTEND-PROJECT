import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function AddProduct() {
  const [name, setName] = useState('')
  const [brand, setBrand] = useState('')
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [sizeOptions, setSizeOptions] = useState('')
  const [color, setColor] = useState('')
  const [stock, setStock] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [message, setMessage] = useState('')

  const token = localStorage.getItem('token')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const response = await fetch('http://localhost:5000/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        name,
        brand,
        category,
        description,
        price: Number(price),
        sizeOptions: sizeOptions.split(','),
        color,
        stock: Number(stock),
        imageUrl
      })
    })

    const data = await response.json()

    if (response.ok) {
      setMessage('Product added successfully')
      navigate('/products')
    } else {
      setMessage(data.message || 'Failed to add product')
    }
  }

  return (
    <div>
      <h2>Add Product Page</h2>

      <form onSubmit={handleSubmit}>
        <div><input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" /></div>
        <div><input value={brand} onChange={(e) => setBrand(e.target.value)} placeholder="Brand" /></div>
        <div><input value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Category" /></div>
        <div><input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" /></div>
        <div><input value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" /></div>
        <div><input value={sizeOptions} onChange={(e) => setSizeOptions(e.target.value)} placeholder="Size Options: 8,9,10" /></div>
        <div><input value={color} onChange={(e) => setColor(e.target.value)} placeholder="Color" /></div>
        <div><input value={stock} onChange={(e) => setStock(e.target.value)} placeholder="Stock" /></div>
        <div><input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="Image URL" /></div>

        <button type="submit">Add Product</button>
      </form>

      <p>{message}</p>
    </div>
  )
}

export default AddProduct
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function EditProduct() {
  const { id } = useParams()
  const navigate = useNavigate()
  const token = localStorage.getItem('token')

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

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await fetch(`https://comp229-backend-project.onrender.com/api/products/${id}`)
      const data = await response.json()

      if (response.ok) {
        const product = data.data
        setName(product.name || '')
        setBrand(product.brand || '')
        setCategory(product.category || '')
        setDescription(product.description || '')
        setPrice(product.price || '')
        setSizeOptions(product.sizeOptions ? product.sizeOptions.join(',') : '')
        setColor(product.color || '')
        setStock(product.stock || '')
        setImageUrl(product.imageUrl || '')
      }
    }

    fetchProduct()
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const response = await fetch(`https://comp229-backend-project.onrender.com/api/products/${id}`, {
      method: 'PUT',
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
      setMessage('Product updated successfully')
      navigate('/products')
    } else {
      setMessage(data.message || 'Failed to update product')
    }
  }

  return (
    <div>
      <h2>Edit Product Page</h2>

      <form onSubmit={handleSubmit}>
        <div><input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" /></div>
        <div><input value={brand} onChange={(e) => setBrand(e.target.value)} placeholder="Brand" /></div>
        <div><input value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Category" /></div>
        <div><input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" /></div>
        <div><input value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" /></div>
        <div><input value={sizeOptions} onChange={(e) => setSizeOptions(e.target.value)} placeholder="Size Options" /></div>
        <div><input value={color} onChange={(e) => setColor(e.target.value)} placeholder="Color" /></div>
        <div><input value={stock} onChange={(e) => setStock(e.target.value)} placeholder="Stock" /></div>
        <div><input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="Image URL" /></div>

        <button type="submit">Update Product</button>
      </form>

      <p>{message}</p>
    </div>
  )
}

export default EditProduct
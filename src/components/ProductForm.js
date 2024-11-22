// src/components/ProductForm.js

import React, { useState, useEffect } from 'react';
import api from '../api';

const ProductForm = ({ editingProduct, onSave, onCancel }) => {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
    quantity: '',
  });

  useEffect(() => {
    if (editingProduct) setProduct(editingProduct);
  }, [editingProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const apiCall = editingProduct
      ? api.put(`/products/update/${editingProduct.id}`, product)
      : api.post('/products/add', product);

    apiCall.then(() => {
      onSave();
    }).catch(error => console.error('Error saving product:', error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{editingProduct ? 'Edit Product' : 'Add Product'}</h2>

      <label>Name:</label>
      <input type="text" name="name" value={product.name} onChange={handleChange} required />

      <label>Description:</label>
      <input type="text" name="description" value={product.description} onChange={handleChange} />

      <label>Category:</label>
      <input type="text" name="category" value={product.category} onChange={handleChange} />

      <label>Price:</label>
      <input type="number" name="price" value={product.price} onChange={handleChange} required />

      <label>Quantity:</label>
      <input type="number" name="quantity" value={product.quantity} onChange={handleChange} required />

      <button type="submit">Save</button>
      {editingProduct && <button onClick={onCancel}>Cancel</button>}
    </form>
  );
};

export default ProductForm;

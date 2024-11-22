import React, { useState, useEffect } from 'react';
import './ProductManagement.css';

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [productDetails, setProductDetails] = useState({
    id: null,
    name: '',
    description: '',
    category: '',
    price: '',
    quantity: '',
  });
  const [transaction, setTransaction] = useState({
    productId: null,
    quantity: '',
  });
  const [sale, setSale] = useState({
    productId: null,
    quantity: '',
  });

  useEffect(() => {
    const storedProducts = localStorage.getItem('products');
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    }
  }, []);


  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductDetails({
      ...productDetails,
      [name]: value,
    });
  };

  const handleTransactionChange = (e) => {
    const { name, value } = e.target;
    setTransaction({
      ...transaction,
      [name]: value,
    });
  };

  // Handle sale transaction change
  const handleSaleChange = (e) => {
    const { name, value } = e.target;
    setSale({
      ...sale,
      [name]: value,
    });
  };

  // Add a new product
  const handleAddProduct = (e) => {
    e.preventDefault();
    const newProduct = {
      id: Date.now(),
      name: productDetails.name,
      description: productDetails.description,
      category: productDetails.category,
      price: parseFloat(productDetails.price),
      quantity: parseInt(productDetails.quantity), 
    };

    setProducts([...products, newProduct]);
    resetFormFields();
  };

  // Update an existing product
  const handleUpdateProduct = (e) => {
    e.preventDefault();
    setProducts(products.map(product =>
      product.id === productDetails.id ? productDetails : product
    ));
    resetFormFields();
  };

  // Delete a product
  const handleDeleteProduct = (id) => {
    setProducts(products.filter(product => product.id !== id));
  };

  // Process stock transaction
  const handleStockTransaction = (e) => {
    e.preventDefault();
    const { productId, quantity } = transaction;

    setProducts(products.map(product => {
      if (product.id === parseInt(productId)) {
        return {
          ...product,
          quantity: Math.max(0, product.quantity + parseInt(quantity)), // Ensure quantity doesn't go negative
        };
      }
      return product;
    }));

    resetTransactionFields();
  };

  // Process sale transaction
  const handleSaleTransaction = (e) => {
    e.preventDefault();
    const { productId, quantity } = sale;
    const qtyToSell = parseInt(quantity);

    setProducts(products.map(product => {
      if (product.id === parseInt(productId)) {
        const newQuantity = Math.max(0, product.quantity - qtyToSell); // Deduct stock and avoid negative
        return {
          ...product,
          quantity: newQuantity,
        };
      }
      return product;
    }));

    resetSaleFields();
  };

  // Reset form fields
  const resetFormFields = () => {
    setProductDetails({
      id: null,
      name: '',
      description: '',
      category: '',
      price: '',
      quantity: '',
    });
  };

  // Reset transaction fields
  const resetTransactionFields = () => {
    setTransaction({
      productId: null,
      quantity: '',
    });
  };

  // Reset sale fields
  const resetSaleFields = () => {
    setSale({
      productId: null,
      quantity: '',
    });
  };

  // Set form fields for editing
  const startEditing = (product) => {
    setProductDetails(product);
  };

  return (
    <div>
      <h2>Product Management</h2>
      <form onSubmit={productDetails.id ? handleUpdateProduct : handleAddProduct}>
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={productDetails.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={productDetails.description}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={productDetails.category}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={productDetails.price}
          onChange={handleChange}
          required
          step="0.01"
        />
        <input
          type="number"
          name="quantity"
          placeholder="Initial Quantity"
          value={productDetails.quantity}
          onChange={handleChange}
          required
        />
        <button type="submit">{productDetails.id ? 'Update Product' : 'Add Product'}</button>
      </form>

      <h3>Current Products</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Category</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length ? (
            products.map(product => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>{product.category}</td>
                <td>${product.price.toFixed(2)}</td>
                <td>{product.quantity}</td>
                <td>
                  <button onClick={() => startEditing(product)}>Edit</button>
                  <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No products available.</td>
            </tr>
          )}
        </tbody>
      </table>

      <h3>Stock Transactions</h3>
      <form onSubmit={handleStockTransaction}>
        <select
          name="productId"
          value={transaction.productId}
          onChange={handleTransactionChange}
          required
        >
          <option value="">Select a product</option>
          {products.map(product => (
            <option key={product.id} value={product.id}>{product.name}</option>
          ))}
        </select>
        <input
          type="number"
          name="quantity"
          placeholder="Quantity to add/deduct"
          value={transaction.quantity}
          onChange={handleTransactionChange}
          required
        />
        <button type="submit">Adjust Stock</button>
      </form>

      <h3>Sales Transactions</h3>
      <form onSubmit={handleSaleTransaction}>
        <select
          name="productId"
          value={sale.productId}
          onChange={handleSaleChange}
          required
        >
          <option value="">Select a product</option>
          {products.map(product => (
            <option key={product.id} value={product.id}>{product.name}</option>
          ))}
        </select>
        <input
          type="number"
          name="quantity"
          placeholder="Quantity Sold"
          value={sale.quantity}
          onChange={handleSaleChange}
          required
        />
        <button type="submit">Sell Product</button>
      </form>
    </div>
  );
};

export default ProductManagement;
import React from 'react';

const ProductList = ({ products, onBuyProduct }) => {
  return (
    <div>
      <h3>Available Products</h3>
      {products.length === 0 ? (
        <p>No products available.</p>
      ) : (
        <ul>
          {products.map((product) => (
            <li key={product.id} className="product-item">
              <h4>{product.name}</h4>
              <p>{product.description}</p>
              <p>Category: {product.category}</p>
              <p>Price: ${product.price}</p>
              <p>Quantity: {product.quantity}</p>
              <button
                onClick={() => onBuyProduct(product.id)}
                disabled={product.quantity <= 0}
              >
                {product.quantity > 0 ? 'Buy' : 'Out of Stock'}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProductList;

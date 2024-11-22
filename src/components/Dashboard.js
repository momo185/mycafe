import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import './Dashboard.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Dashboard() {
  const [products, setProducts] = useState([]);

  // Fetch products from the API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5300/products');
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
          console.log('Fetched products:', data);
        } else {
          console.error('Failed to fetch products');
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const chartData = {
    labels: products.map((product) => product.name),
    datasets: [
      {
        label: 'Quantity',
        data: products.map((product) => product.quantity),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      title: {
        display: true,
        text: 'Product Stock Quantity',
      },
    },
  };

  return (
    <section id="dashboard">
      <div id="stockOverview">
        <h2>Product Stock Overview</h2>
        <div className="chart-container">
          {products.length > 0 ? (
            <Bar data={chartData} options={chartOptions} />
          ) : (
            <p>No products available to display in the chart.</p>
          )}
        </div>
      </div>

      {/* Image Carousel */}
      <div id="imageCarousel">
        <h2>Menu</h2>
        <div>
          <img
            src={`${process.env.PUBLIC_URL}/images/product2.jpg`} // Reference image correctly from public
            alt="Delicious dish 1"
            className="carousel-image"
          />
        </div>
        <div>
          <img
            src={`${process.env.PUBLIC_URL}/images/product1.jpg`} // Reference image correctly from public
            alt="Delicious dish 2"
            className="carousel-image"
          />
        </div>
        <div>
          <img
            src={`${process.env.PUBLIC_URL}/images/product3.jpg`} // Reference image correctly from public
            alt="Delicious dish 3"
            className="carousel-image"
          />
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
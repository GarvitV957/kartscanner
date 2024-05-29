import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('https://fakestoreapi.com/products')
      .then(response => {
        setProducts(response.data);
        setFilteredProducts(response.data);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setFilteredProducts(
      products.filter(product =>
        product.title.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, products]);

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  return (
    <div className="container mx-auto p-4" style={{ display: 'grid', placeItems: 'center' }}>
      <h1 className="text-2xl font-bold mb-4">Product Listing</h1>
      <input
        type="text"
        placeholder="Search products..."
        className="mb-4 p-2 border border-gray-300 rounded w-full"
        value={search}
        onChange={handleSearch}
        style={{ marginBottom: '2rem' }}
      />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="product-grid" style={{ display: 'grid', width: '95%', gridTemplateRows: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px',  gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))' }}>
          {filteredProducts.map(product => (
            <Link style={{ textDecoration: 'none' }} key={product.id} href={`/product/${product.id}`}>
              <div className="flex-none w-64 border p-4 rounded shadow" style={{ color: 'black', border:'1px solid #ccc', padding:'1rem'}}>
                <img src={product.image} alt={product.title} className="object-cover mb-2" style={{ width: '15rem', height: '15rem' }} />
                <h2 className="text-lg font-bold" style={{flexWrap:'wrap',height:'2.3rem', fontSize:'1rem'}}>{product.title}</h2>
                <p className="text-gray-700">${product.price}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

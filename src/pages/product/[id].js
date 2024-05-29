import { useRouter } from 'next/router';
import axios from 'axios';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

export default function ProductPage({ product }) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div>
        <button style={{cursor:'pointer'}} onClick={() => router.back()}><KeyboardBackspaceIcon></KeyboardBackspaceIcon></button>
    <div className='mt-6'>
      <img src={product.image} alt={product.title} className="object-cover mb-2" style={{ width: '30rem', height: '30rem', marginTop:'2rem' }} />
      <h1>{product.title}</h1>
      <p>{product.description}</p>
      <p>${product.price}</p>
    </div>
    </div>
  );
}

export async function getStaticPaths() {
  const response = await axios.get('https://fakestoreapi.com/products');
  const products = response.data;

  const paths = products.map((product) => ({
    params: { id: product.id.toString() },
  }));
  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  const response = await axios.get(`https://fakestoreapi.com/products/${params.id}`);
  const product = response.data;
  return { props: { product } };
}

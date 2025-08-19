import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Product: React.FC = () => {
  const [prod, setProd] = useState<ProductType | null>(null);

  const { product_id } = useParams<RouteParams>();
  const navigate = useNavigate();

  useEffect(() => {
    if (product_id) {
      getProduct();
    }
  }, [product_id]);

  const getProduct = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/merch/${product_id}/`);
      const data: ProductType = await response.json();
      setProd(data);
      console.log(data);
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };

  const handleCheckout = () => {
    navigate(`/checkout/${prod?.id}`);
  };

  return (
    <div className="container">
      <div className="card">
        <img src={prod?.images?.[0]?.image || ""} alt={prod?.name} className="p_img" />
        <div>
          <h3>{prod?.name}</h3>
          <p>$ {prod?.price}</p>
        </div>
        <button onClick={handleCheckout} className="btn">
          Checkout

        </button>
      </div>
    </div>
  );
};

export default Product;

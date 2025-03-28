import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CartSummary = () => {
  const navigate = useNavigate();
  const { cart } = useCart();

  // Ensure cart is an array before using reduce
  const totalAmount = Array.isArray(cart)
    ? cart.reduce((sum, item) => sum + item.price, 0)
    : 0;

  return (
    <div
      style={{
        position: 'fixed',
        top: '10px',
        right: '20px',
        background: '#f8f9fa',
        padding: '10px 15px',
        borderRadius: '8px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
        fontSize: '16px',
      }}
      onClick={() => navigate('/cart')}
    >
      <button
        style={{
          backgroundColor: '#000', // Dark background
          color: '#fff', // White text
          border: '2px solid #fff', // White border
          padding: '8px 16px',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '14px',
        }}
        onClick={() => navigate('/cart')}
      >
        ${totalAmount.toFixed(2)} View Cart
      </button>
    </div>
  );
};

export default CartSummary;
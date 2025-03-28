import { useLocation, useNavigate, useParams } from "react-router-dom";
import WelcomeBand from "../components/WelcomeBand";
import { useCart } from "../context/CartContext";
import { useState } from "react";
import { CartItem } from "../types/CartItem";

function AddBookPage() {
    const navigate = useNavigate();
    const { title, bookId } = useParams(); // Retrieve params from the URL
    const { addToCart } = useCart();
    const { state } = useLocation();
    const { book } = state || {}; // Retrieve book details from state
    const [quantity, setQuantity] = useState<number>(0);

    const handleAddToCart = () => {
        if (quantity <= 0) {
            alert("Quantity must be greater than 0.");
            return;
        }

        if (!book) {
            alert("Book details not found!");
            return;
        }

        const newItem: CartItem = {
            bookId: Number(bookId),
            title: title || "No Title Found",
            quantity: Number(quantity),
            price: book.price, // Use the price from state
            subtotal: book.price * quantity, // Calculate subtotal dynamically
        };

        addToCart(newItem); // Add book to the cart
        navigate('/cart');
    };

    return (
        <>
            <WelcomeBand />
            <h2>Add {title}</h2>

            <div>
                <input
                    type="number"
                    placeholder="Quantity"
                    value={quantity}
                    onChange={(x) => setQuantity(Number(x.target.value))}
                />
                <button onClick={handleAddToCart}>Add to Cart</button>
            </div>
            <br />
            <button onClick={() => navigate(-1)}>Go Back</button>
        </>
    );
}

export default AddBookPage;
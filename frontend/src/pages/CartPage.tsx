import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

function CartPage() {
    const navigate = useNavigate();
    const { cart, removeFromCart } = useCart(); // Include the removeFromCart function
    const totalPrice = cart.reduce((sum, item) => sum + item.subtotal, 0);
    const progressPercentage = cart.length > 0 ? (cart.length / 5) * 100 : 0; // Example dynamic calculation

    return (
        <div>
            <h2>Your Cart</h2>
            {cart.length === 0 ? (
                <div>
                    <p>Your Cart Is Empty</p>
                    {/* Go Back Button */}
                    <button
                        type="button"
                        className="btn btn-secondary mt-3"
                        onClick={() => navigate(-1)} // Navigate to the previous page
                    >
                        Go Back
                    </button>

                    {/* Continue Shopping Button */}
                    <button
                        type="button"
                        className="btn btn-primary mt-3 ms-3"
                        onClick={() => navigate('/')} // Redirect to the booklist page
                    >
                        Continue Shopping
                    </button>
                </div>
            ) : (
                <>
                    {/* Cart Table */}
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Title</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Unit Price</th>
                                <th scope="col">Subtotal</th>
                                <th scope="col">Actions</th> {/* Add actions column */}
                            </tr>
                        </thead>
                        <tbody>
                            {cart.map((item) => (
                                <tr key={item.bookId}>
                                    <td>{item.title}</td>
                                    <td>{item.quantity}</td>
                                    <td>${item.price.toFixed(2)}</td>
                                    <td>${item.subtotal.toFixed(2)}</td>
                                    <td>
                                        {/* Remove Button */}
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => removeFromCart(item.bookId)} // Remove item from cart
                                        >
                                            Remove
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <h3>Total: ${totalPrice.toFixed(2)}</h3>

                    {/* Progress Bar */}
                    <div className="progress" style={{ height: "20px", marginTop: "20px" }}>
                        <div
                            className="progress-bar bg-success"
                            role="progressbar"
                            style={{ width: `${progressPercentage}%` }}
                            aria-valuenow={progressPercentage}
                            aria-valuemin={0}
                            aria-valuemax={100}
                        >
                            {progressPercentage}% Complete
                        </div>
                    </div>

                    {/* Buttons Section */}
                    <div className="d-flex flex-wrap mt-3">
                        {/* Go Back Button */}
                        <button
                            type="button"
                            className="btn btn-secondary me-3"
                            onClick={() => navigate(-1)} // Navigate to the previous page
                        >
                            Go Back
                        </button>

                        {/* Continue Shopping Button */}
                        <button
                            type="button"
                            className="btn btn-primary me-3"
                            onClick={() => navigate('/')} // Redirect to the booklist page
                        >
                            Continue Shopping
                        </button>

                        {/* Checkout Button */}
                        <button
                            onClick={() => navigate('/checkout')}
                            className="btn btn-success"
                        >
                            Checkout
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}

export default CartPage;
import AddBookPage from "./pages/AddBookPage";
import BooksPage from "./pages/BooksPage";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CartPage from "./pages/CartPage";
import { CartProvider } from "./context/CartContext";
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap's CSS
import './App.css'; // Import your custom CSS (if needed)
import AdminBooksPage from "./pages/AdminBooksPage";


function App() {
    return (
        <>
            <CartProvider>
                <Router>
                    <Routes>
                        <Route path="/" element={<BooksPage />} />
                        <Route path="/bookPage" element={<BooksPage />} />
                        <Route path="/AddBook/:title/:bookId" element={<AddBookPage />} />
                        <Route path="/cart" element={<CartPage />} />
                        <Route path="/adminBooks" element={<AdminBooksPage/>} />
                    </Routes>
                </Router>
            </CartProvider>
        </>
    );
}
export default App;
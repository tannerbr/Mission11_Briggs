import { useEffect, useState } from "react";
import { Book } from "../types/Book";
import { fetchBooks } from "../api/BooksAPI";
import Pagination from "../components/Pagination";
import NewBookForm from "../components/NewBookForm";

const AdminBooksPage = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [error, setError] = useState<string | null>(null); // State to store error messages
    const [loading, setLoading] = useState<boolean>(true); // State to manage loading state
    const [pageSize, setPageSize] = useState<number>(10);
    const [pageNum, setPageNum] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [showForm, setShowForm] = useState<boolean>(false); // State to manage form visibility

    useEffect(() => {
        const loadBooks = async () => {
            try {
                const data = await fetchBooks(pageSize, pageNum, []); // Fetch books without category filter
                setTotalPages(Math.ceil(data.totalNumBooks / pageSize)); // Calculate total pages based on total number of books
                setBooks(data.books);
            } catch (error) {
                setError((error as Error).message); // Set error message if fetching fails
            }
            finally {
                setLoading(false); // Set loading to false after fetching
            }
        };
        loadBooks();
    }, [pageSize, pageNum]);

    if (loading) {
        return <div>Loading books...</div>; // Display loading message
    }
    if (error) {
        return <div className="text-red-500">Error: {error}</div>; // Display error message
    }

    return (
        <div>
            <h1>Admin - Books</h1>

            {!showForm && (
                <button className="btn btn-primary" onClick={() => setShowForm(true)}>Add New Book</button>
            )}

            {showForm && (
                <NewBookForm
                    onSuccess={() => {
                    setShowForm(false);
                    fetchBooks(pageSize, pageNum, []).then((data) => 
                        setBooks(data.books)
                    );
                    }}
                    onCancel={() => setShowForm(false)}
                />
            )}

            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Publisher</th>
                        <th>ISBN</th>
                        <th>Classification</th>
                        <th>Category</th>
                        <th>Page Count</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map((book) => (
                        <tr key={book.bookID}>
                            <td>{book.title}</td>
                            <td>{book.author}</td>
                            <td>{book.publisher}</td>
                            <td>{book.isbn}</td>
                            <td>{book.classification}</td>
                            <td>{book.category}</td>
                            <td>{book.pageCount}</td>
                            <td>${book.price.toFixed(2)}</td>
                            <td>
                                {/* Edit Button */}
                                <button className="btn btn-primary" onClick={() => console.log(`Edit Book ${book.bookID}`)}>Edit</button>
                            </td>
                            <td>
                                {/* Delete Button */}
                                <button className="btn btn-danger" onClick={() => console.log(`Delete Book ${book.bookID}`)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Pagination 
                currPage={pageNum} 
                totalPages={totalPages} 
                pageSize={pageSize} 
                onPageChange={setPageNum}
                onPageSizeChange={(newSize) => {
                    setPageSize(newSize);
                    setPageNum(1); // Reset to first page when page size changes
                }}/>
        </div>
    );
};

export default AdminBooksPage;
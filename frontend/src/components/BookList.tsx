import { useEffect, useState } from "react";
import { Book } from "../types/Book";
import './BookList.css';
import { useNavigate } from "react-router-dom";
import { fetchBooks } from "../api/BooksAPI";
import Pagination from "./Pagination";

function BookList({ selectedCategories }: { selectedCategories: string[] }) {
    const [books, setBooks] = useState<Book[]>([]);
    const [pageSize, setPageSize] = useState<number>(10);
    const [pageNum, setPageNum] = useState<number>(1);
    const [totalItems, setTotalItems] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [sortOrder, setSortOrder] = useState<"asc" | "desc" | null>(null); // State to store sorting order
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null); // State to store error messages
    const [loading, setLoading] = useState<boolean>(true); // State to manage loading state

    // Fetch books from the API
    useEffect(() => {
        const loadBooks = async () => {
            try {
                setLoading(true); // Set loading to true before fetching
                const data = await fetchBooks(pageSize, pageNum, selectedCategories);
                setBooks(data.books);
                setTotalItems(data.totalNumBooks);
                setTotalPages(Math.ceil(data.totalNumBooks / pageSize));
                
            } catch (error) {
                setError((error as Error).message); // Set error message if fetching fails
            } finally {
                setLoading(false); // Set loading to false after fetching
            }
        };
        loadBooks();
    }, [pageSize, pageNum, selectedCategories]);

    if (loading) {
        return <div>Loading books...</div>; // Display loading message
    }
     if(error) {
        return <div className="text-red-500">Error: {error}</div>; // Display error message
     }

    // Handle sorting logic
    const sortBooks = (order: "asc" | "desc") => {
        const sortedBooks = [...books].sort((a, b) => {
            if (order === "asc") return a.title.localeCompare(b.title);
            if (order === "desc") return b.title.localeCompare(a.title);
            return 0;
        });
        setBooks(sortedBooks);
        setSortOrder(order);
    };

    return (
        <>
            {/* Total Items Display */}
            <div>
                {totalItems > 0
                    ? `Total Books: ${totalItems}`
                    : "No books available for the selected filters."}
            </div>
            <br />

            {/* Sorting Buttons */}
            <button
                onClick={() => sortBooks("asc")}
                disabled={sortOrder === "asc"}
            >
                Sort A-Z
            </button>
            <button
                onClick={() => sortBooks("desc")}
                disabled={sortOrder === "desc"}
            >
                Sort Z-A
            </button>
            <br />
            <br />

            {/* Book List */}
            {totalItems > 0 && books.map((b) => (
                <div id="bookCard" className="card" key={`${b.bookID}-${b.title}`}> {/* Unique key */}
                    <h3 className="card-title">{b.title}</h3>
                    <div className="card-body">
                        <ul className="list-unstyled">
                            <li><strong>Author: </strong>{b.author}</li>
                            <li><strong>Publisher: </strong>{b.publisher}</li>
                            <li><strong>ISBN:</strong>{b.isbn}</li>
                            <li><strong>Classification:</strong> {b.classification}</li>
                            <li><strong>Catgegory:</strong> {b.category}</li>
                            <li><strong>Number of Pages:</strong> {b.pageCount}</li>
                            <li><strong>Price:</strong> {b.price}</li>
                        </ul>
                        {/* Add a Book Button */}
                        <div style={{ textAlign: "center", marginTop: "20px"}}>
                            <button className="btn btn-success" onClick={() => navigate(`/addBook/${b.title}/${b.bookID}`, { state: { book: b } })}>Add Book</button>
                        </div>
                    </div>
                </div>
            ))}
            <Pagination 
                    currPage={pageNum} 
                    totalPages={totalPages} 
                    pageSize={pageSize} 
                    onPageChange={setPageNum}
                    onPageSizeChange={(newSize) => {
                        setPageSize(newSize);
                        setPageNum(1); // Reset to first page when page size changes
                    }}/>
            <br />

            {/* Pagination Controls went here */}
        </>
    );
}

export default BookList;
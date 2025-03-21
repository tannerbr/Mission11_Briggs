import { useEffect, useState } from "react";
import { Book } from "./types/Book";

function BookList() {
    
    const [books, setBooks] = useState<Book[]>([]); 
    const [pageSize, setPageSize] = useState<number>(10); 
    const [pageNum, setPageNum] = useState<number>(1); 
    const [totalItems, setTotalItems] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [sortOrder, setSortOrder] = useState<"asc" | "desc" | null>(null); // State to store sorting order

    // Fetch books from the API
    useEffect(() => {
        const fetchBooks = async () => {
            const response = await fetch(
                `https://localhost:5000/api/book/AllBooks?pageSize=${pageSize}&pageNum=${pageNum}`, 
                { credentials: 'include' }
            );
            const data = await response.json();
            setBooks(data.books);
            setTotalItems(data.totalNumBooks); 
            setTotalPages(Math.ceil(data.totalNumBooks / pageSize));
        };
        fetchBooks();
    }, [pageSize, pageNum]);

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
            <h1>Book List</h1>
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

            {books.map((b) => (
                <div id="bookCard" className="card" key={b.bookId}>
                    <h3 className="card-title">{b.title}</h3>
                    <div className="card-body">
                        <ul className="list-unstyled">
                            <li><strong>Author: </strong>{b.author}</li>
                            <li><strong>Publisher: </strong>{b.publisher}</li>
                            <li><strong>ISBN:</strong>{b.isbn}</li>
                            <li><strong>Category:</strong> {b.classification}</li>
                            <li><strong>Number of Pages:</strong> {b.pageCount}</li>
                            <li><strong>Price:</strong> {b.price}</li>
                        </ul>
                    </div>                
                </div>        
            ))}
            <br />

            {/* Pagination Controls */}
            <button disabled={pageNum === 1} onClick={() => setPageNum(pageNum - 1)}>Previous</button>

            {[...Array(totalPages)].map((_, i) => (
                <button key={i + 1} onClick={() => setPageNum(i + 1)} disabled={pageNum === (i + 1)}>
                    {i + 1}
                </button>
            ))}

            <button disabled={pageNum === totalPages} onClick={() => setPageNum(pageNum + 1)}>Next</button>

            <br />
            <br /> 
            <label>
                Results Per Page:
                <select 
                    value={pageSize} 
                    onChange={(p) => { 
                        setPageSize(Number(p.target.value));
                        setPageNum(1);
                    }}
                >
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                </select>
            </label>
        </>
    );
}

export default BookList;

import { Book } from "../types/Book";

interface FetchBooksResponse {
    books: Book[];
    totalNumBooks: number;
}

const API_URL = 'https://localhost:5000/api/book';

export const fetchBooks = async (
    pageSize: number,
    pageNum: number,
    selectedCategories: string[]
): Promise<FetchBooksResponse> => {
    try {
        const categoryParams = selectedCategories.map((cat) => `category=${encodeURIComponent(cat)}`).join('&');
        const response = await fetch(
            `${API_URL}/AllBooks?pageSize=${pageSize}&pageNum=${pageNum}${selectedCategories.length ? `&${categoryParams}` : ''}`
        );
        
        if (!response.ok) {
            throw new Error(`Failed to Fetch Books`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error fetching books:", error);
        throw error;
    }    
};

export const AddBook = async (newBook: Book): Promise<Book> => {
    try {
        const response = await fetch(`${API_URL}/AddBook?`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newBook),
        });

        if (!response.ok) {
            throw new Error("Failed to add book");
        }

        return await response.json();
    }
    catch (error) {
        console.error("Error adding book:", error);
        throw error;
    }
}
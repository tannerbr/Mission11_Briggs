import { useState } from 'react';
import { Book } from '../types/Book';
import { updateBook } from "../api/BooksAPI";

interface EditBookFormProps {
    book: Book;
    onSuccess: () => void;
    onCancel: () => void;
}

const EditBookForm = ({ book, onSuccess, onCancel }: EditBookFormProps) => {
    const [formData, setFormData] = useState<Book>({...book});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        // Convert numeric fields to numbers
        setFormData({
            ...formData,
            [name]: name === 'pageCount' || name === 'price' ? String(value) : value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await updateBook(formData.bookID, formData); // Ensure `addBook` is implemented elsewhere
            onSuccess(); // Call the success callback to refresh the book list
        } catch (error) {
            console.error('Failed to add book:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add New Book</h2>
            <div className="form-grid">
                {/* Book Title */}
                <label>
                    Book Title:
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </label>

                {/* Author */}
                <label>
                    Author:
                    <input
                        type="text"
                        name="author"
                        value={formData.author}
                        onChange={handleChange}
                        required
                    />
                </label>

                {/* Publisher */}
                <label>
                    Publisher:
                    <input
                        type="text"
                        name="publisher"
                        value={formData.publisher}
                        onChange={handleChange}
                        required
                    />
                </label>

                {/* Classification */}
                <label>
                    Classfication:
                    <select
                        name="classification"
                        value={formData.classification}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Classification</option>
                        <option value="Fiction">Fiction</option>
                        <option value="Non-Fiction">Non-Fiction</option>
                    </select>
                </label>

                {/* Category */}
                <label>
                    Category:
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Category</option>
                        <option value="Classic">Classic</option>
                        <option value="Biography">Biography</option>
                        <option value="Historical">Historical</option>
                        <option value="Self-Help">Self-Help</option>
                        <option value="Business">Business</option>
                        <option value="Thrillers">Thrillers</option>
                    </select>
                </label>


                {/* ISBN */}
                <label>
                    ISBN:
                    <input
                        type="text"
                        name="isbn"
                        value={formData.isbn}
                        onChange={handleChange}
                        required
                    />
                </label>

                {/* Page Count */}
                <label>
                    Page Count:
                    <input
                        type="text"
                        name="pageCount"
                        value={formData.pageCount}
                        onChange={handleChange}
                        required
                    />
                </label>

                {/* Price */}
                <label>
                    Price ($):
                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                    />
                </label>

                {/* Submit and Cancel Buttons */}
                <div className="form-buttons">
                    <button type="submit" className="btn btn-success">
                        Add Book
                    </button>
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={onCancel}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </form>
    );
};

export default EditBookForm;
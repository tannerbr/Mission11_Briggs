import { useEffect, useState } from "react";
import './CategoryFilter.css';

function CategoryFilter({selectedCategories, setSelectedCategories,}: 
    {selectedCategories: string[], setSelectedCategories: (categories: string[]) => void}) {
    const [categories, setCategories] = useState<string[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('https://bookproject-briggs-backend.azurewebsites.net/api/book/GetBookCategory'); // chech if API is needed 
                const data = await response.json();
                console.log('Fetched categoires', data);

                setCategories(data);
            }
            catch (error) {
                console.error('Error fetching categories: ' + error);
            }
        }
        fetchCategories();
    }, []);

    function handleCheckboxChange({target}: {target: HTMLInputElement}) {
        const updatedCategories = selectedCategories.includes(target.value)
            ? selectedCategories.filter((c) => c !== target.value) : [...selectedCategories, target.value];
            setSelectedCategories(updatedCategories);
    }
    
    return (
        <div className="category-filter">
            <h5>Book Categories</h5>
            <div className="category-list">
                {categories.map((c) => (
                    <div key={c} className="category-item">
                        <input type="checkbox" id={c} value={c} className="category-checkbox" 
                        onChange={handleCheckboxChange} checked={selectedCategories.includes(c)}/>
                        <label htmlFor={c}>{c}</label>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CategoryFilter;
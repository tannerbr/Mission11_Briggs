interface PaginationProps {
    currPage: number;       // Current page number
    totalPages: number;     // Number of books per page
    pageSize: number;      // Number of books per page
    onPageChange: (newPage: number) => void; // Function to handle page change
    onPageSizeChange: (newSize: number) => void; // Function to handle page size change
}
const Pagination = ({ currPage, totalPages, pageSize, onPageChange, onPageSizeChange }:PaginationProps) => {
    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Pagination</h2>
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                    <label htmlFor="pageSize" className="mr-2">Items per page:</label>
                    <select
                        id="pageSize"
                        value={pageSize}
                        onChange={(e) => {
                            onPageSizeChange(Number(e.target.value));
                            onPageChange(1); // Reset to first page when page size changes
                        }}
                    >
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                    </select>
                </div>
                <div className="flex items-center">
                    <button onClick={() => onPageChange(currPage - 1)} disabled={currPage === 1}>
                        Previous
                    </button>
                    <span className="mx-2">{currPage} of {totalPages}</span>
                    <button onClick={() => onPageChange(currPage + 1)} disabled={currPage === totalPages}>
                        Next
                    </button>
                </div>
            </div>
            <div className="flex justify-center mt-4">
                <button onClick={() => onPageChange(1)} disabled={currPage === 1}>
                    First
                </button>
                {[...Array(totalPages)].map((_, i) => (
                    <button key={i + 1} onClick={() => onPageChange(i + 1)} disabled={currPage === (i + 1)}>
                        {i + 1}
                    </button>
                ))}
                <button onClick={() => onPageChange(totalPages)} disabled={currPage === totalPages}>
                    Last
                </button>            
            </div>
        </div>
        );
    };
export default Pagination;  
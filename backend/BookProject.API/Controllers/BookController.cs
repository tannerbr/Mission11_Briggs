using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using BookProject.API.Data;

namespace BookProject.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private BookDbContext _bookContext;
        public BookController(BookDbContext temp)
        {
            _bookContext = temp;
        }
        // check

        [HttpGet("AllBooks")]
        public IActionResult GetBooks(int pageSize = 10, int pageNum = 1, [FromQuery] List<string>? category = null)
        {
            var query = _bookContext.Books.AsQueryable();

            if(category != null && category.Any())
            {
                query = query.Where(b => category.Contains(b.Category));
            }

            var totalNumBooks = query.Count();

            var list = query
            .Skip(pageSize * (pageNum - 1))
            .Take(pageSize);           

            var returnObject = new
            {
                Books = list,
                TotalNumBooks = totalNumBooks
            };
            return Ok(returnObject);
        }

        [HttpGet("GetBookCategory")]
        public IActionResult GetBookCategory()
        {
            var bookCategory = _bookContext.Books
                .Select(b => b.Category)
                .Distinct()
                .ToList();
            return Ok(bookCategory);
        }

        [HttpPost("AddBook")]
        public IActionResult AddBook([FromBody] Book newBook)
        {
            _bookContext.Books.Add(newBook);
            _bookContext.SaveChanges();

            return Ok(newBook);
        }

        [HttpPut("Update/{bookID}")]
        public IActionResult UpdateBook(int bookID, [FromBody] Book updatedBook)
        {
            var existingBook = _bookContext.Books.Find(bookID);
            if (existingBook == null)
            {
                return NotFound("Book not found");
            }
            existingBook.Title = updatedBook.Title;
            existingBook.Author = updatedBook.Author;
            existingBook.Category = updatedBook.Category;
            existingBook.Classification = updatedBook.Classification;
            existingBook.Price = updatedBook.Price;
            existingBook.ISBN = updatedBook.ISBN;
            existingBook.PageCount = updatedBook.PageCount;

            _bookContext.Books.Update(existingBook);
            _bookContext.SaveChanges();

            return Ok(existingBook);
        }

        [HttpDelete("Delete/{bookID}")]
        public IActionResult DeleteBook(int bookID)
        {
            var book = _bookContext.Books.Find(bookID);
            if (book == null)
            {
                return NotFound("Book not found");
            }

            _bookContext.Books.Remove(book);
            _bookContext.SaveChanges();

            return Ok("Book deleted successfully");
        }
    }
}
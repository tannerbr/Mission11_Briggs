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

        [HttpGet("AllBooks")]
        public IActionResult GetBooks(int pageSize = 10, int pageNum = 1)
        {
            var list = _bookContext.Books.ToList()
            .Skip(pageSize * (pageNum - 1))
            .Take(pageSize);

            var totalNumBooks = _bookContext.Books.Count();

            var returnObject = new
            {
                Books = list,
                TotalNumBooks = totalNumBooks
            };
            return Ok(returnObject);
        }

    }
}
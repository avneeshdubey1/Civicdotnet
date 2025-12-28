using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CivicConnect.API.Data;
using CivicConnect.API.Models;
using CivicConnect.API.Dtos;
using System.Security.Claims;

namespace CivicConnect.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NewsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public NewsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/News (Public - Everyone can see news)
        [HttpGet]
        public async Task<ActionResult<IEnumerable<News>>> GetNews()
        {
            return await _context.News.OrderByDescending(n => n.PublishedDate).ToListAsync();
        }

        // POST: api/News (Admin Only)
        [HttpPost]
        [Authorize] // We check role inside
        public async Task<ActionResult<News>> PostNews(NewsCreateDto request)
        {
            // 1. Check if user is Admin
            var role = User.FindFirst(ClaimTypes.Role)?.Value;
            if (role != "Admin") return Forbid();

            // 2. Create News
            var news = new News
            {
                Title = request.Title,
                Content = request.Content,
                PublishedDate = DateTime.Now
            };

            // 3. Save
            _context.News.Add(news);
            await _context.SaveChangesAsync();

            return Ok(new { message = "News published successfully!", id = news.Id });
        }

        // DELETE: api/News/5 (Admin Only)
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> DeleteNews(int id)
        {
            // 1. Check if user is Admin
            var role = User.FindFirst(ClaimTypes.Role)?.Value;
            if (role != "Admin") return Forbid();

            // 2. Find and Delete
            var news = await _context.News.FindAsync(id);
            if (news == null) return NotFound("News not found.");

            _context.News.Remove(news);
            await _context.SaveChangesAsync();

            return Ok(new { message = "News deleted successfully." });
        }
    }
}
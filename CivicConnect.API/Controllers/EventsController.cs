using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CivicConnect.API.Data;
using CivicConnect.API.Models;
using System.Security.Claims;

namespace CivicConnect.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public EventsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Events (Public - See upcoming events)
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Event>>> GetEvents()
        {
            return await _context.Events.OrderBy(e => e.EventDate).ToListAsync();
        }

        // POST: api/Events (Admin Only - Create Event)
        [HttpPost]
        [Authorize]
        public async Task<ActionResult<Event>> CreateEvent(Event request)
        {
            var role = User.FindFirst(ClaimTypes.Role)?.Value;
            if (role != "Admin") return Forbid();

            _context.Events.Add(request);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Event created successfully!", id = request.Id });
        }

        // POST: api/Events/5/register (Citizens - Volunteer/Join)
        [HttpPost("{id}/register")]
        [Authorize]
        public async Task<IActionResult> RegisterForEvent(int id)
        {
            // 1. Get User ID
            var userIdString = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userIdString == null) return Unauthorized();
            int userId = int.Parse(userIdString);

            // 2. Check if Event exists
            var eventItem = await _context.Events.FindAsync(id);
            if (eventItem == null) return NotFound("Event not found.");

            // 3. Check if already registered
            var existing = await _context.EventRegistrations
                .FirstOrDefaultAsync(r => r.EventId == id && r.UserId == userId);
            
            if (existing != null) return BadRequest("You are already registered for this event.");

            // 4. Register and Update Count
            var registration = new EventRegistration { EventId = id, UserId = userId };
            _context.EventRegistrations.Add(registration);
            
            eventItem.RegistrationCount += 1; // Increment the counter as per diagram

            await _context.SaveChangesAsync();

            return Ok(new { message = "Successfully registered for event!" });
        }
    }
}
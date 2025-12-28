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
    public class ServiceRequestsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ServiceRequestsController(AppDbContext context)
        {
            _context = context;
        }

        // POST: api/ServiceRequests (Citizens request services)
        [HttpPost]
        [Authorize]
        public async Task<ActionResult<ServiceRequest>> PostServiceRequest(ServiceRequestCreateDto request)
        {
            // 1. Get the User from the Token
            var username = User.FindFirstValue(ClaimTypes.Name);
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == username);

            if (user == null) return Unauthorized("User not found.");

            // 2. Create the Request
            var serviceRequest = new ServiceRequest
            {
                RequestType = request.RequestType,
                Description = request.Description,
                Address = request.Address,
                UserId = user.Id,
                Status = "Pending"
            };

            // 3. Save to DB
            _context.ServiceRequests.Add(serviceRequest);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Service request submitted successfully!", id = serviceRequest.Id });
        }

        // GET: api/ServiceRequests (View all)
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ServiceRequest>>> GetServiceRequests()
        {
            return await _context.ServiceRequests.Include(r => r.User).ToListAsync();
        }

        // PUT: api/ServiceRequests/5/status (Admins approve/reject)
        [HttpPut("{id}/status")]
        [Authorize]
        public async Task<IActionResult> UpdateStatus(int id, [FromBody] string newStatus)
        {
            // 1. Check if User is Admin
            var role = User.FindFirst(ClaimTypes.Role)?.Value;
            if (role != "Admin") return Forbid();

            // 2. Find Request
            var request = await _context.ServiceRequests.FindAsync(id);
            if (request == null) return NotFound("Request not found.");

            // 3. Update
            request.Status = newStatus; // e.g., "Approved", "Rejected"
            await _context.SaveChangesAsync();

            return Ok(new { message = $"Request status updated to {newStatus}" });
        }
    }
}
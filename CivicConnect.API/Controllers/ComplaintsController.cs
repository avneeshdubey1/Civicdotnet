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
    public class ComplaintsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ComplaintsController(AppDbContext context)
        {
            _context = context;
        }

        // POST: api/Complaints (Citizens report issues)
        [HttpPost]
        [Authorize] // <--- Only logged in users!
        public async Task<ActionResult<Complaint>> PostComplaint(ComplaintCreateDto request)
        {
            // 1. Get the User ID from the Token
            // We find the user by their Username stored in the token name
            var username = User.FindFirstValue(ClaimTypes.Name);
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == username);

            if (user == null) return Unauthorized("User not found from token.");

            // 2. Create the Complaint
            var complaint = new Complaint
            {
                Title = request.Title,
                Description = request.Description,
                Area = request.Area,
                UserId = user.Id, // Link it to the logged-in user
                Status = "Pending"
            };

            // 3. Save to DB
            _context.Complaints.Add(complaint);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Complaint submitted successfully!", complaintId = complaint.Id });
        }

        // GET: api/Complaints (View all)
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Complaint>>> GetComplaints()
        {
            return await _context.Complaints.Include(c => c.User).ToListAsync();
        }

        // PUT: api/Complaints/5/resolve (Admins resolve issues) <--- THIS IS NEW
        [HttpPut("{id}/resolve")]
        [Authorize]
        public async Task<IActionResult> ResolveComplaint(int id, ComplaintResolveDto request)
        {
            // 1. Check if the user is an Admin
            var userRole = User.FindFirst(ClaimTypes.Role)?.Value;
            if (userRole != "Admin")
            {
                return Forbid(); // 403 Forbidden (You are not allowed!)
            }

            // 2. Find the complaint
            var complaint = await _context.Complaints.FindAsync(id);
            if (complaint == null)
            {
                return NotFound("Complaint not found.");
            }

            // 3. Update the fields
            complaint.Status = "Resolved";
            complaint.ResolutionRemark = request.ResolutionRemark;

            await _context.SaveChangesAsync();

            return Ok(new { message = "Complaint resolved successfully!" });
        }
    }
}
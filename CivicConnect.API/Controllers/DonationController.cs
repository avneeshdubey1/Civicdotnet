using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CivicConnect.API.Data;
using CivicConnect.API.Models;
using CivicConnect.API.Dtos;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace CivicConnect.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DonationsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public DonationsController(AppDbContext context)
        {
            _context = context;
        }

        // 1. ADMIN ONLY: See ALL Donations
        [HttpGet]
        [Authorize(Roles = "Admin")] 
        public async Task<ActionResult<IEnumerable<Donation>>> GetAllDonations()
        {
            return await _context.Donations
                .Include(d => d.User) // Include User info so Admin knows who donated
                .OrderByDescending(d => d.DonationDate)
                .ToListAsync();
        }

        // 2. REGULAR USERS: See ONLY their own Donations
        [HttpGet("my-donations")]
        [Authorize]
        public async Task<ActionResult<IEnumerable<Donation>>> GetMyDonations()
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
            
            return await _context.Donations
                .Where(d => d.UserId == userId)
                .OrderByDescending(d => d.DonationDate)
                .ToListAsync();
        }

        [HttpPost]
        [Authorize]
        public async Task<ActionResult<Donation>> PostDonation(DonationCreateDto request)
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            if (userIdClaim == null) return Unauthorized("User ID not found in token.");
            
            var userId = int.Parse(userIdClaim.Value);

            var donation = new Donation
            {
                Amount = request.Amount,
                Purpose = request.Purpose,
                PaymentId = request.PaymentId, 
                DonationDate = DateTime.Now,
                UserId = userId 
            };

            _context.Donations.Add(donation);
            await _context.SaveChangesAsync();

            return Ok(donation);
        }
    }
}
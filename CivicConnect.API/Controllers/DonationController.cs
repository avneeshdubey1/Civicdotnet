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

        [HttpGet("my-donations")]
        [Authorize]
        public async Task<ActionResult<IEnumerable<Donation>>> GetMyDonations()
        {
            // Get the User ID from the Token
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
            // 1. Get User ID from Token
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            if (userIdClaim == null) return Unauthorized("User ID not found in token.");
            
            var userId = int.Parse(userIdClaim.Value);

            // 2. Create the Donation Entity
            var donation = new Donation
            {
                Amount = request.Amount,
                Purpose = request.Purpose,
                PaymentId = request.PaymentId, // Save the REAL Stripe ID
                DonationDate = DateTime.Now,
                UserId = userId // Link to the user
            };

            _context.Donations.Add(donation);
            await _context.SaveChangesAsync();

            return Ok(donation);
        }
    }
}
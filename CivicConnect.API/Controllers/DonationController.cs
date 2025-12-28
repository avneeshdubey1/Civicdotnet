using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CivicConnect.API.Data;
using CivicConnect.API.Models;
using Microsoft.AspNetCore.Authorization;

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

        // 1. GET HISTORY
        [HttpGet("my-donations")]
        [Authorize]
        public async Task<ActionResult<IEnumerable<Donation>>> GetMyDonations()
        {
            return await _context.Donations.OrderByDescending(d => d.DonationDate).ToListAsync();
        }

        // 2. MOCK DONATION (No External API)
        [HttpPost]
        [Authorize]
        public async Task<ActionResult<Donation>> PostDonation(Donation donation)
        {
            // We simulate a Payment ID here on the server
            donation.PaymentId = "MOCK_TXN_" + Guid.NewGuid().ToString().Substring(0, 8).ToUpper();
            donation.DonationDate = DateTime.Now;

            _context.Donations.Add(donation);
            await _context.SaveChangesAsync();
            return CreatedAtAction("GetMyDonations", new { id = donation.Id }, donation);
        }
    }
}
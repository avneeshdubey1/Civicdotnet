using System.ComponentModel.DataAnnotations;

namespace CivicConnect.API.Dtos
{
    public class DonationCreateDto
    {
        [Required]
        [Range(1, 1000000)] // Minimum 1 rupee
        public decimal Amount { get; set; }

        [Required]
        public string PaymentId { get; set; } = string.Empty; // From Razorpay

        public string Purpose { get; set; } = "General Fund";
    }
}
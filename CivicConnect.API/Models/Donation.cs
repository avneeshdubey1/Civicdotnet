using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CivicConnect.API.Models
{
    public class Donation
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public decimal Amount { get; set; }

        public string? PaymentId { get; set; } // Stores the Razorpay/Stripe Transaction ID

        public string Purpose { get; set; } = "General Fund"; // e.g., "Tree Planting", "Education"

        public DateTime DonationDate { get; set; } = DateTime.Now;

        // Who donated?
        public int UserId { get; set; }
        
        [ForeignKey("UserId")]
        public User? User { get; set; }
    }
}
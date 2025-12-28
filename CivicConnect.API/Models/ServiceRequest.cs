using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CivicConnect.API.Models
{
    public class ServiceRequest
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string RequestType { get; set; } = string.Empty; // e.g., "New Dustbin", "Water Tanker"

        [Required]
        public string Description { get; set; } = string.Empty;

        [Required]
        public string Address { get; set; } = string.Empty;

        public string Status { get; set; } = "Pending"; // Pending -> Approved -> Rejected

        public DateTime CreatedAt { get; set; } = DateTime.Now;

        // Foreign Key: Who requested this?
        public int UserId { get; set; }

        [ForeignKey("UserId")]
        public User? User { get; set; }
    }
}
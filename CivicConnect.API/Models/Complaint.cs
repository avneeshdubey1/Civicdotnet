using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CivicConnect.API.Models
{
    public class Complaint
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Title { get; set; } = string.Empty;

        [Required]
        public string Description { get; set; } = string.Empty;

        [Required]
        public string Area { get; set; } = string.Empty; // e.g., "Main Market"

        public string Status { get; set; } = "Pending"; // Default is always "Pending"

        public string? ResolutionRemark { get; set; } // Admin fills this later

        public DateTime CreatedAt { get; set; } = DateTime.Now;

        // Foreign Key: Which user posted this?
        public int UserId { get; set; }
        
        [ForeignKey("UserId")]
        public User? User { get; set; }
    }
}
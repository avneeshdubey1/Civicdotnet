using System.ComponentModel.DataAnnotations;

namespace CivicConnect.API.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Username { get; set; } = string.Empty; // Fixes "Non-nullable" warning

        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Required]
        public string PasswordHash { get; set; } = string.Empty;

        [Required]
        public string MobileNumber { get; set; } = string.Empty;

        // Based on your Functional Specs (Citizen, Admin, NGO)
        [Required]
        public string Role { get; set; } = "Citizen"; 

        public DateTime CreatedAt { get; set; } = DateTime.Now;
    }
}
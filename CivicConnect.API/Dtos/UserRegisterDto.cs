using System.ComponentModel.DataAnnotations;

namespace CivicConnect.API.Dtos
{
    public class UserRegisterDto
    {
        [Required]
        public string Username { get; set; } = string.Empty;

        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Required]
        [MinLength(6)]
        public string Password { get; set; } = string.Empty;

        [Required]
        [Phone]
        public string MobileNumber { get; set; } = string.Empty;

        // "Citizen", "Admin", or "NGO"
        [Required]
        public string Role { get; set; } = "Citizen"; 
    }
}
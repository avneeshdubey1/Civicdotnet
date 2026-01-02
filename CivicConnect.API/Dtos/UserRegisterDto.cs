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
        // Regex: Min 6 chars, at least 1 letter, at least 1 number OR special char
        [RegularExpression(@"^(?=.*[A-Za-z])(?=.*\d|.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$", 
            ErrorMessage = "Password must be at least 6 characters long and contain at least 1 letter AND (1 number OR 1 special character).")]
        public string Password { get; set; } = string.Empty;

        [Required]
        public string MobileNumber { get; set; } = string.Empty;

        public string Role { get; set; } = "User"; 
    }
}
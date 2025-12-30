// Inside CivicConnect.API/Dtos/ComplaintCreateDto.cs
using System.ComponentModel.DataAnnotations;

namespace CivicConnect.API.Dtos
{
    public class ComplaintCreateDto
    {
        [Required]
        [MinLength(5)]
        public string Title { get; set; } = string.Empty;

        [Required]
        [MinLength(10)]
        public string Description { get; set; } = string.Empty;

        [Required]
        // REMOVED the strict Regex that was causing 400 Errors
        public string Area { get; set; } = string.Empty; 
    }
}
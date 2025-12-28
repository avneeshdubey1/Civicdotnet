using System.ComponentModel.DataAnnotations;

namespace CivicConnect.API.Dtos
{
    public class ServiceRequestCreateDto
    {
        [Required]
        public string RequestType { get; set; } = string.Empty; // e.g., "Water Tanker"

        [Required]
        [MinLength(10)]
        public string Description { get; set; } = string.Empty;

        [Required]
        public string Address { get; set; } = string.Empty;
    }
}
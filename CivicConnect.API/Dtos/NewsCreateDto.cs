using System.ComponentModel.DataAnnotations;

namespace CivicConnect.API.Dtos
{
    public class NewsCreateDto
    {
        [Required]
        public string Title { get; set; } = string.Empty;

        [Required]
        public string Content { get; set; } = string.Empty;
    }
}
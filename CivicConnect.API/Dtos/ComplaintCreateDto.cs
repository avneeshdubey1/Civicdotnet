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
        [RegularExpression(@"^[a-zA-Z]+$", ErrorMessage = "Area must contain only alphabets")]
        public string Area { get; set; } = string.Empty;
        
        // Note: We don't ask for UserId here because we will get it from their Token!
    }
}
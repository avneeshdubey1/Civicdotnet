using System.ComponentModel.DataAnnotations;

namespace CivicConnect.API.Models
{
    public class News
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Title { get; set; } = string.Empty;

        [Required]
        public string Content { get; set; } = string.Empty;

        public DateTime PublishedDate { get; set; } = DateTime.Now;

        // Note: We don't necessarily need to link a User here, 
        // as long as we know only Admins can create it.
    }
}
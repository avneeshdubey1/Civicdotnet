using System.ComponentModel.DataAnnotations;

namespace CivicConnect.API.Models
{
    public class Alert
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Title { get; set; } = string.Empty;

        [Required]
        public string Content { get; set; } = string.Empty;

        public string Priority { get; set; } = "Normal"; // Normal, High, Critical

        public DateTime PostedDate { get; set; } = DateTime.Now;
    }
}
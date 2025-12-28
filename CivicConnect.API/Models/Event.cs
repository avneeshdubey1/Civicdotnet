using System.ComponentModel.DataAnnotations;

namespace CivicConnect.API.Models
{
    public class Event
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Title { get; set; } = string.Empty;

        [Required]
        public string Description { get; set; } = string.Empty;

        [Required]
        public string Venue { get; set; } = string.Empty;

        public DateTime EventDate { get; set; }

        // We will just count how many people registered
        public int RegistrationCount { get; set; } = 0;
    }
}
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CivicConnect.API.Models
{
    public class EventRegistration
    {
        [Key]
        public int Id { get; set; }

        public int EventId { get; set; }
        public int UserId { get; set; }
    }
}
using System.ComponentModel.DataAnnotations;

namespace CivicConnect.API.Dtos
{
    public class ComplaintResolveDto
    {
        [Required]
        public string ResolutionRemark { get; set; } = string.Empty;

        // The status will automatically become "Resolved", so we don't need to ask for it.
    }
}
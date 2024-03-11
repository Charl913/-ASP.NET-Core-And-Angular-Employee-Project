using System.ComponentModel.DataAnnotations;

namespace API.Entities
{
    public class ApplicationUserExperience : BaseEntity
    {
        [Key]
        public int ExperienceId { get; set; }
        public string Title { get; set; }
        public string CompanyName { get; set; }
    }
}
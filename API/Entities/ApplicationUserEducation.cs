using System.ComponentModel.DataAnnotations;

namespace API.Entities
{
    public class ApplicationUserEducation : BaseEntity
    {
        [Key]
        public int EducationId { get; set; }
        public string School { get; set; }
        public string Degree { get; set; }
    }
}
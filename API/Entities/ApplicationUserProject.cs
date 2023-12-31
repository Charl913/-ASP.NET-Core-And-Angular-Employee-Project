using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    public class ApplicationUserProject
    {
        [Key]
        public int ProjectId { get; set; }
        [ForeignKey("ApplicationUser")]
        public int EmployeeId { get; set; }
        public string ProjectTitle { get; set; }
        public string ProjectRequirements { get; set; }
        public string ProjectCode { get; set; }
        public bool IsActive { get; set; }
    }
}
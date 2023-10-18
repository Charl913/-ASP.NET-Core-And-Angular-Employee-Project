using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class RegisterDTO
    {
        [Required]
        public string EmployeeName { get; set; }
        [Required]
        public string Password { get; set; }
        public string JobTitle { get; set; }
    }
}
using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class RegisterDTO
    {
        [Required]
        public string EmployeeName { get; set; }
        [Required]
        public string Password { get; set; }
    }
}
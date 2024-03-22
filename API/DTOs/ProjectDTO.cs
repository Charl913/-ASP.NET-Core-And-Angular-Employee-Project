namespace API.DTOs
{
    public class ProjectDTO
    {
        public int EmployeeId { get; set; }
        public string ProjectTitle { get; set; }
        public string ProjectRequirements { get; set; }
        public string ProjectCode { get; set; }
        public bool IsActive { get; set; } = true;
    }
}
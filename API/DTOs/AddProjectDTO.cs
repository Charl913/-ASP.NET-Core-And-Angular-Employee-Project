namespace API.DTOs
{
    public class AddProjectDTO
    {
        public int EmployeeId { get; set; }
        public string ShortDescription { get; set; }
        public string LongDescription { get; set; }
        public bool IsActive { get; set; } = true;
    }
}
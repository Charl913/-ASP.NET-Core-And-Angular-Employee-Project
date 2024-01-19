namespace API.Entities
{
    public class ApplicationUser : BaseEntity
    {
        public string EmployeeName { get; set; }
        public string JobTitle { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
    }
}
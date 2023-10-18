namespace API.Entities
{
    public class ApplicationUser
    {
        public int Id { get; set; }
        public string EmployeeName { get; set; }
        public string JobTitle { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
    }
}
namespace API.DTOs
{
    public class EventDTO
    {
        public int EmployeeId { get; set; }
        public string EventTitle { get; set; }
        public string EventDescription { get; set; }
        public DateTime DatePicked { get; set; } 
    }
}
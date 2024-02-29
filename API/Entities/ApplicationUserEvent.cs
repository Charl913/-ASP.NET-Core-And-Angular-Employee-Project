namespace API.Entities
{
    public class ApplicationUserEvent: BaseEntity
    {
        public string EventTitle { get; set; }
        public string EventDescription { get; set; }
        public DateTime DatePicked { get; set; }
    }
}
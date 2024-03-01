using System.ComponentModel.DataAnnotations;

namespace API.Entities
{
    public class ApplicationUserEvent: BaseEntity
    {
        [Key]
        public int EventId { get; set; }
        public string EventTitle { get; set; }
        public string EventDescription { get; set; }
        public DateTime DatePicked { get; set; }
    }
}
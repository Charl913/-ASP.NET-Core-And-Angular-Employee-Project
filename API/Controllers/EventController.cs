using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class EventController: BaseController
    {
        private readonly DataContext _context;
        public EventController(DataContext context)
        {
            _context = context;
            
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<ApplicationUserEvent>>> GetEvents(int id)
        {
            var currentUserEvents = new List<ApplicationUserEvent>();
            var events = await _context.Events.ToListAsync();

            foreach(var e in events)
            {
                if(e.Id == id)
                {
                    currentUserEvents.Add(e);
                }
            }

            return currentUserEvents;        
        }
    }
}
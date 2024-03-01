using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class EmployeeEventController: BaseController
    {
        private readonly DataContext _context;
        public EmployeeEventController(DataContext context)
        {
            _context = context;
            
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ApplicationUserEvent>>> GetEvent()
        {
            var employeeEvents = await _context.Events.ToListAsync();

            return employeeEvents;            
        }
    }
}
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class EmployeeProjectsController: BaseController
    {
        private readonly DataContext _context;
        public EmployeeProjectsController(DataContext context)
        {
            _context = context;
            
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ApplicationUserProject>>> GetEmployeeProjects()
        {
            var employeeProjects = await _context.Projects.ToListAsync();

            return employeeProjects;
        }
    }
}
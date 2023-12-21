using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class EmployeesController : BaseController
    {
        private readonly DataContext _context;
        public EmployeesController(DataContext context)
        {
            _context = context;
            
        }
        
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ApplicationUser>>> GetEmployees()
        {
            var employees = await _context.Employees.ToListAsync();

            return employees;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ApplicationUser>> GetEmployee(int id)
        {
            var employee = await _context.Employees.FindAsync(id);

            return employee;
        }
    }
}
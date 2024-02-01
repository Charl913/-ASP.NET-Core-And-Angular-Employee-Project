using System.Globalization;
using API.Data;
using API.DTOs;
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
        public async Task<ActionResult<EmployeeDTO>> GetEmployee(int id)
        {
            var employee = await _context.Employees.FindAsync(id);

            return new EmployeeDTO {
                Id = employee.Id,
                EmployeeName = CultureInfo.CurrentCulture.TextInfo.ToTitleCase(employee.EmployeeName),
                JobTitle = employee.JobTitle
            };
        }
    }
}
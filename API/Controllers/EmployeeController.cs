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

            return new EmployeeDTO
            {
                Id = employee.Id,
                EmployeeName = CultureInfo.CurrentCulture.TextInfo.ToTitleCase(employee.EmployeeName),
                JobTitle = employee.JobTitle,
                IsAdmin = employee.IsAdmin
            };
        }
        [HttpGet("employee-of-the-month")]
        public async Task<ActionResult<EmployeeDTO>> GetEmployeeOfTheMonth()
        {
            var projects = await _context.Projects.ToListAsync();

            var projectCounts = new Dictionary<int, int>();

            foreach (var project in projects)
            {
                if (!project.IsActive)
                {
                    if (projectCounts.ContainsKey(project.Id))
                    {
                        projectCounts[project.Id]++;
                    }
                    else
                    {
                        projectCounts[project.Id] = 1;
                    }
                }
            }

            var maxProjects = projectCounts.Values.Max();
            var employeeIdWithMaxProjects = projectCounts.FirstOrDefault(x => x.Value == maxProjects).Key;

            var employeeOfTheMonth = await _context.Employees.FindAsync(employeeIdWithMaxProjects);

            return new EmployeeDTO
            {
                Id = employeeOfTheMonth.Id,
                EmployeeName = CultureInfo.CurrentCulture.TextInfo.ToTitleCase(employeeOfTheMonth.EmployeeName),
                JobTitle = employeeOfTheMonth.JobTitle,
                IsAdmin = employeeOfTheMonth.IsAdmin
            };
        }
    }
}

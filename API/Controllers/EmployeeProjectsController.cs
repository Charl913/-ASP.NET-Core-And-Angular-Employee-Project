using API.Data;
using API.DTOs;
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

        [HttpPost("add")]
        public async Task<ActionResult<ApplicationUserProject>> Register(AddProjectDTO addProjectDTO)
        {

            var project = new ApplicationUserProject
            {
                EmployeeId = addProjectDTO.EmployeeId,
                ShortDescription = addProjectDTO.ShortDescription.ToLower(),
                LongDescription = addProjectDTO.LongDescription.ToLower(),
                IsActive = addProjectDTO.IsActive
            };

            _context.Projects.Add(project);

            await _context.SaveChangesAsync();

            return project;
        }
    }
}
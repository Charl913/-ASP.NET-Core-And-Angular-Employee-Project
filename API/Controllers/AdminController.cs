using System.Security.Cryptography;
using System.Text;
using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class AdminController : BaseController
    {
        private readonly DataContext _context;
        public AdminController(DataContext context)
        {
            _context = context;

        }
        [HttpPost("register")]
        public async Task<ActionResult<ApplicationUser>> Register(RegisterDTO registerDTO)
        {
            if (await EmployeeNameExists(registerDTO.EmployeeName))
            {
                return BadRequest("User Already Exists");
            }

            using var hmac = new HMACSHA512();

            var employee = new ApplicationUser
            {
                EmployeeName = registerDTO.EmployeeName.ToLower(),
                JobTitle = registerDTO.JobTitle,
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDTO.Password)),
                PasswordSalt = hmac.Key,
                IsAdmin = false
            };

            _context.Employees.Add(employee);

            await _context.SaveChangesAsync();

            return employee;
        }
        [HttpDelete("delete-employee/{id}")]
        public async Task<IActionResult> DeleteEmployee(int id)
        {
            var employee = await _context.Employees.FindAsync(id);

            if (employee == null)
            {
                return BadRequest("Didn't find");
            }

            _context.Employees.Remove(employee);

            await _context.SaveChangesAsync();

            return Ok();
        }
        [HttpPut("make-admin/{id}")]
        public async Task<IActionResult> MakeAdmin(int id)
        {
            var employee = await _context.Employees.FindAsync(id);

            if (employee == null)
            {
                return BadRequest("Didn't find");
            }

            employee.IsAdmin = true;

            _context.Employees.Update(employee);

            await _context.SaveChangesAsync();

            return Ok();
        }
        [HttpPost("add-project")]
        public async Task<ActionResult<ApplicationUserProject>> AddProject(ProjectDTO addProjectDTO)
        {

            var project = new ApplicationUserProject
            {
                Id = addProjectDTO.EmployeeId,
                ProjectTitle = addProjectDTO.ProjectTitle,
                ProjectRequirements = addProjectDTO.ProjectRequirements,
                ProjectCode = addProjectDTO.ProjectCode,
                IsActive = addProjectDTO.IsActive
            };

            _context.Projects.Add(project);

            await _context.SaveChangesAsync();

            return project;
        }
        [HttpPut("save-project-state")]
        public async Task<ActionResult<List<ApplicationUserProject>>> SaveProjectState(List<SaveProjectsDTO> saveProjectsDTOs)
        {
            var projects = new List<ApplicationUserProject>();

            foreach (var saveProjectsDTO in saveProjectsDTOs)
            {
                var project = await _context.Projects.FindAsync(saveProjectsDTO.ProjectId);

                if (project == null)
                {
                    return BadRequest($"Project with ID {saveProjectsDTO.ProjectId} not found");
                }

                project.IsActive = saveProjectsDTO.IsActive;
                await _context.SaveChangesAsync();

                projects.Add(project);
            }

            return projects;
        }
        [HttpPost("add-event")]
        public async Task<ActionResult<ApplicationUserEvent>> AddEvent(EventDTO eventDTO)
        {
            if (await EmployeeIdExists(eventDTO.EmployeeId))
            {
                var userEvent = new ApplicationUserEvent
                {
                    Id = eventDTO.EmployeeId,
                    EventTitle = eventDTO.EventTitle,
                    EventDescription = eventDTO.EventDescription,
                    DatePicked = eventDTO.DatePicked
                };

                _context.Events.Add(userEvent);

                await _context.SaveChangesAsync();

                return userEvent;
            }
            return BadRequest("Employee does not exist");
        }

        private async Task<bool> EmployeeIdExists(int employeeId)
        {
            return await _context.Employees.AnyAsync(x => x.Id == employeeId);
        }

        private async Task<bool> EmployeeNameExists(string employeeName)
        {
            return await _context.Employees.AnyAsync(x => x.EmployeeName == employeeName.ToLower());
        }
    }
}
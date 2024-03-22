using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class ProjectsController : BaseController
    {
        private readonly DataContext _context;
        public ProjectsController(DataContext context)
        {
            _context = context;

        }
        [HttpGet("get-active-projects/{id}")]
        public async Task<ActionResult<IEnumerable<ApplicationUserProject>>> GetActiveProjects(int id)
        {
            var activeProjects = new List<ApplicationUserProject>();
            var projects = await _context.Projects.ToListAsync();

            foreach(var project in projects)
            {
                if(project.Id == id && project.IsActive)
                {
                    activeProjects.Add(project);
                }
            }

            return activeProjects;
        }
        [HttpGet("get-finished-projects/{id}")]
        public async Task<ActionResult<IEnumerable<ApplicationUserProject>>> GetFinishedProjects(int id)
        {
            var finishedProjects = new List<ApplicationUserProject>();
            var projects = await _context.Projects.ToListAsync();

            foreach(var project in projects)
            {
                if(project.Id == id && !project.IsActive)
                {
                    finishedProjects.Add(project);
                }
            }

            return finishedProjects;
        }
    }
}
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class EmployeeExperienceController : BaseController
    {
        private readonly DataContext _context;
        public EmployeeExperienceController(DataContext context) 
        {
            _context = context;

        }

        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<ApplicationUserExperience>>> GetExperience(int id) 
        {
            var currentUserExperience = new List<ApplicationUserExperience>();
            var experiences = await _context.Experience.ToListAsync();


            foreach(var experience in experiences)
            {
                if(experience.Id == id)
                {
                    currentUserExperience.Add(experience);
                }
            }

            return currentUserExperience;
        }
    }
}
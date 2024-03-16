using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class EmployeeEducationController : BaseController
    {
        private readonly DataContext _context;
        public EmployeeEducationController(DataContext context)
        {
            _context = context;

        }

        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<ApplicationUserEducation>>> GetEducation(int id)
        {
            var currentUserEducation = new List<ApplicationUserEducation>();
            var education = await _context.Education.ToListAsync();

            foreach(var e in education)
            {
                if(e.Id == id)
                {
                    currentUserEducation.Add(e);
                }
            }

            return currentUserEducation;
        }
    }
}
using System.Security.Cryptography;
using System.Text;
using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Globalization;

namespace API.Controllers
{
    public class AccountController : BaseController
    {
        private readonly DataContext _context;
        public AccountController(DataContext context)
        {
            _context = context;

        }
        [HttpPost("login")]
        public async Task<ActionResult<EmployeeDTO>> Login(LoginDTO loginDTO)
        {
            var employee = await _context.Employees.SingleOrDefaultAsync(x => x.EmployeeName == loginDTO.EmployeeName);

            if (employee == null)
            {
                return Unauthorized("Invalid Username");
            }

            using var hmac = new HMACSHA512(employee.PasswordSalt);

            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDTO.Password));

            for (int i = 0; i < computedHash.Length; i++)
            {
                if (computedHash[i] != employee.PasswordHash[i])
                {
                    return Unauthorized("Invalid Passowrd");
                }
            }

            return new EmployeeDTO
            {
                Id = employee.Id,
                EmployeeName = CultureInfo.CurrentCulture.TextInfo.ToTitleCase(employee.EmployeeName),
                JobTitle = employee.JobTitle,
                IsAdmin = employee.IsAdmin
            };
        }
        [HttpPost("add-experience")]
        public async Task<ActionResult<ApplicationUserExperience>> AddExperience(ExperienceDTO experienceDTO) 
        {
            var experience = new ApplicationUserExperience
            {
                Id = experienceDTO.EmployeeId,
                Title = experienceDTO.Title,
                CompanyName = experienceDTO.CompanyName
            };

            _context.Experience.Add(experience);

            await _context.SaveChangesAsync();

            return Ok();
        }
        [HttpDelete("remove-experience/{id}")]
        public async Task<ActionResult<ApplicationUserExperience>> RemoveExperience(int id)
        {
            var employee = await _context.Experience.FindAsync(id);

            if(employee == null)
            {
                return BadRequest("Didn't find");
            }

            _context.Experience.Remove(employee);

            await _context.SaveChangesAsync();

            return Ok();
        }
        [HttpPost("add-education")]
        public async Task<ActionResult<ApplicationUserEducation>> AddEducation(EducationDTO educationDTO)
        {
            var education = new ApplicationUserEducation 
            {
                Id = educationDTO.EmployeeId,
                School = educationDTO.School,
                Degree = educationDTO.Degree
            };

            _context.Education.Add(education);

            await _context.SaveChangesAsync();

            return Ok();
        }
        [HttpDelete("remove-education/{id}")]
        public async Task<ActionResult<ApplicationUserEducation>> RemoveEducation(int id)
        {
            var education = await _context.Education.FirstOrDefaultAsync(q => q.EducationId == id);

            if(education == null)
            {
                return BadRequest("Dindn't find");
            }

            _context.Education.Remove(education);

            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}
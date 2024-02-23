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

        [HttpPost("register")]
        public async Task<ActionResult<ApplicationUser>> Register(RegisterDTO registerDTO)
        {
            if (await EmployeeExists(registerDTO.EmployeeName))
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

        private async Task<bool> EmployeeExists(string employeeName)
        {
            return await _context.Employees.AnyAsync(x => x.EmployeeName == employeeName.ToLower());
        }
    }
}
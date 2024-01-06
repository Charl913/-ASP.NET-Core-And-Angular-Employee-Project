using System.Security.Cryptography;
using System.Text;
using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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
                PasswordSalt = hmac.Key
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
                if(computedHash[i] != employee.PasswordHash[i])
                {
                    return Unauthorized("Invalid Passowrd");
                }
            }

            // return employee;
            return new EmployeeDTO
            {
                EmployeeName = employee.EmployeeName,
                JobTitle = employee.JobTitle
            };
        }

        private async Task<bool> EmployeeExists(string employeeName)
        {
            return await _context.Employees.AnyAsync(x => x.EmployeeName == employeeName.ToLower());
        }
    }
}
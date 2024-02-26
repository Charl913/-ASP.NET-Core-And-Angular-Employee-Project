using API.Data;
using API.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class AdminController : BaseController
    {
        private readonly DataContext _context;
        public AdminController(DataContext context)
        {
            _context = context;

        }

        [HttpDelete("delete-employee/{id}")]
        public async Task<ActionResult<EmployeeDTO>> DeleteEmployee(int id)
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
        public async Task<ActionResult<EmployeeDTO>> MakeAdmin(int id)
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
    }
}
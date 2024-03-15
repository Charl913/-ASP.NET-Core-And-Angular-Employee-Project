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

        [HttpPost("add-event")]
        public async Task<ActionResult<ApplicationUserEvent>> AddEvent(EventDTO eventDTO)
        {
            if (await EmployeeExists(eventDTO.EmployeeId))
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
            else
            {
                return BadRequest("Employee does not exist");
            }
        }

        private async Task<bool> EmployeeExists(int employeeId)
        {
            return await _context.Events.AnyAsync(x => x.Id == employeeId);
        }
    }
}
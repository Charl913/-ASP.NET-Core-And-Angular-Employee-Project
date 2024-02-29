using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<ApplicationUser> Employees { get; set; }
        public DbSet<ApplicationUserProject> Projects {get; set; }
        public DbSet<ApplicationUserEvent> Events { get; set; }
    }
}
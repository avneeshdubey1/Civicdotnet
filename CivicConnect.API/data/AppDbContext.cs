using Microsoft.EntityFrameworkCore;
using CivicConnect.API.Models;

namespace CivicConnect.API.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        // This line tells the database to create a "Users" table based on your User.cs model
        public DbSet<User> Users { get; set; }
        public DbSet<Complaint> Complaints { get; set; }
        public DbSet<ServiceRequest> ServiceRequests { get; set; }
        public DbSet<News> News { get; set; }
        public DbSet<Event> Events { get; set; }
        public DbSet<EventRegistration> EventRegistrations { get; set; }
        public DbSet<Donation> Donations { get; set; }
        public DbSet<Alert> Alerts { get; set; }
    }
}
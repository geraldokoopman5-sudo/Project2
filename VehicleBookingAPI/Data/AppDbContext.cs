using Microsoft.EntityFrameworkCore;
using VehicleBookingAPI.Models.Entities;

namespace VehicleBookingAPI.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Vehicle> Vehicles { get; set; }
        public DbSet<Booking> Bookings { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<User>()
                .HasIndex(u => u.Email)
                .IsUnique();

            modelBuilder.Entity<Vehicle>()
                .HasOne(v => v.Owner)
                .WithMany(u => u.Vehicles)
                .HasForeignKey(v => v.OwnerId);

            modelBuilder.Entity<Booking>()
                .HasOne(b => b.Company)
                .WithMany(u => u.Bookings)
                .HasForeignKey(b => b.CompanyId);

            modelBuilder.Entity<Booking>()
                .HasOne(b => b.Vehicle)
                .WithMany(v => v.Bookings)
                .HasForeignKey(b => b.VehicleId);
        }
    }

}

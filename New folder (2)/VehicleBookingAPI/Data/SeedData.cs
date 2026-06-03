using VehicleBookingAPI.Models.Entities;
using VehicleBookingAPI.Models.Enums;

namespace VehicleBookingAPI.Data
{
    public static class SeedData
    {
        public static void Initialize(AppDbContext context)
        {
            if (context.Users.Any()) return;

            var owner = new User
            {
                Name = "Sam Owner",
                Email = "sam@fleet.co.za",
                Password = "Owner123",
                PhoneNumber = "0820000001",
                Role = UserRole.Vehicle,
                Status = UserStatus.Active
            };

            var company = new User
            {
                Name = "Acme Corp",
                Email = "acme@corp.co.za",
                Password = "Company123",
                PhoneNumber = "0820000002",
                Role = UserRole.Company,
                Status = UserStatus.Active
            };

            var admin = new User
            {
                Name = "Admin User",
                Email = "admin@fleet.co.za",
                Password = "Admin123",
                PhoneNumber = "0820000003",
                Role = UserRole.Admin,
                Status = UserStatus.Active
            };

            context.Users.AddRange(owner, company, admin);
            context.SaveChanges();

            var vehicle = new Vehicle
            {
                VehicleId = Guid.NewGuid(),
                OwnerId = owner.Id,
                Make = "Toyota",
                Model = "Hilux",
                Year = 2022,
                Category = "Bakkie",
                DailyRate = 850.00m,
                IsAvailable = true
            };

            context.Vehicles.Add(vehicle);
            context.SaveChanges();
        }
    }
}
using Microsoft.EntityFrameworkCore;
using VehicleBookingAPI.Data;
using VehicleBookingAPI.DTOs.Vehicle;
using VehicleBookingAPI.Models.Entities;

namespace VehicleBookingAPI.Services
{
    public class VehicleService
    {
        private readonly AppDbContext _context;

        public VehicleService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<Vehicle>> GetAvailableVehicles()
        {
            return await _context.Vehicles.Where(v => v.Availability ==true).ToListAsync();
        }

        public async Task<Vehicle> AddVehicle(CreateVehicleDto vehicleDto)
        {
            var vehicle = new Vehicle
            {
                OwnerId = vehicleDto.OwnerId,
                Make = vehicleDto.Make,
                Model = vehicleDto.Model,
                Year = vehicleDto.Year,
                Category = vehicleDto.Category,
                DailyRate = vehicleDto.DailyRate,
                Availability = true
            };
            
            _context.Vehicles.Add(vehicle);
            await _context.SaveChangesAsync();

            return vehicle;
        }
    }
}

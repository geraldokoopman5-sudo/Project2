using Microsoft.EntityFrameworkCore;
using VehicleBookingAPI.Data;
using VehicleBookingAPI.DTOs.Vehicle;
using VehicleBookingAPI.Models.Entities;
using VehicleBookingAPI.Models.Enums;
using VehicleBookingAPI.Services.Interfaces;

namespace VehicleBookingAPI.Services
{
    public class VehicleService : IVehicleService
    {
        private readonly AppDbContext _context;

        public VehicleService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<VehicleResponseDto>> GetAllVehiclesAsync()
        {
            var vehicles = await _context.Vehicles
                .Include(v => v.Owner)
                .ToListAsync();

            return vehicles.Select(MapToResponseDto).ToList();
        }

        //public async Task<List<VehicleResponseDto>> GetAvailableVehiclesAsync()
        //{
        //    var vehicles = await _context.Vehicles
        //        .Include(v => v.Owner)
        //        .Where(v => v.IsAvailable)
        //        .ToListAsync();

        //    return vehicles.Select(MapToResponseDto).ToList();
        //}
        public async Task<List<VehicleResponseDto>> GetAvailableVehiclesAsync()
        {
            var vehicles = await _context.Vehicles
                .Include(v => v.Owner)
                .Where(v => v.IsAvailable && v.ApprovalStatus == VehicleApprovalStatus.Approved)
                .ToListAsync();

            return vehicles.Select(MapToResponseDto).ToList();
        }

        public async Task<VehicleResponseDto?> GetVehicleByIdAsync(Guid id)
        {
            var vehicle = await _context.Vehicles
                .Include(v => v.Owner)
                .FirstOrDefaultAsync(v => v.VehicleId == id);

            return vehicle == null ? null : MapToResponseDto(vehicle);
        }

        public async Task<VehicleResponseDto> AddVehicleAsync(CreateVehicleDto dto)
        {
            var vehicle = new Vehicle
            {
                VehicleId = Guid.NewGuid(),
                OwnerId = dto.OwnerId,
                Make = dto.Make,
                Model = dto.Model,
                Year = dto.Year,
                Category = dto.Category,
                DailyRate = dto.DailyRate,
                IsAvailable = true,
                ImageData = dto.ImageData,
                ApprovalStatus = VehicleApprovalStatus.Pending
            };

            _context.Vehicles.Add(vehicle);
            await _context.SaveChangesAsync();

            return MapToResponseDto(vehicle);
        }

        public async Task<bool> UpdateVehicleAsync(Guid id, UpdateVehicleDto dto)
        {
            var vehicle = await _context.Vehicles.FindAsync(id);
            if (vehicle == null) return false;

            vehicle.Make = dto.Make;
            vehicle.Model = dto.Model;
            vehicle.Year = dto.Year;
            vehicle.Category = dto.Category;
            vehicle.DailyRate = dto.DailyRate;
            vehicle.IsAvailable = dto.IsAvailable;
            if (!string.IsNullOrEmpty(dto.ImageData))
                vehicle.ImageData = dto.ImageData;

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteVehicleAsync(Guid id)
        {
            var vehicle = await _context.Vehicles.FindAsync(id);
            if (vehicle == null) return false;

            bool hasActiveBookings = await _context.Bookings.AnyAsync(b =>
                b.VehicleId == id &&
                (b.Status == BookingStatus.Pending || b.Status == BookingStatus.Confirmed));

            if (hasActiveBookings)
                throw new InvalidOperationException(
                    "Cannot delete a vehicle that has pending or confirmed bookings.");

            _context.Vehicles.Remove(vehicle);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> ApproveVehicleAsync(Guid id)
        {
            var vehicle = await _context.Vehicles.FindAsync(id);
            if (vehicle == null) return false;

            vehicle.ApprovalStatus = VehicleApprovalStatus.Approved;
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> RejectVehicleAsync(Guid id)
        {
            var vehicle = await _context.Vehicles.FindAsync(id);
            if (vehicle == null) return false;

            vehicle.ApprovalStatus = VehicleApprovalStatus.Rejected;
            await _context.SaveChangesAsync();
            return true;
        }

        private static VehicleResponseDto MapToResponseDto(Vehicle v)
        {
            return new VehicleResponseDto
            {
                VehicleId = v.VehicleId,
                OwnerId = v.OwnerId,
                OwnerName = v.Owner?.Name ?? string.Empty,
                Make = v.Make,
                Model = v.Model,
                Year = v.Year,
                Category = v.Category,
                DailyRate = v.DailyRate,
                IsAvailable = v.IsAvailable,
                ImageData = v.ImageData,
                ApprovalStatus = v.ApprovalStatus
            };
        }
    }
}

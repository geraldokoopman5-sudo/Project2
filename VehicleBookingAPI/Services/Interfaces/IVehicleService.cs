using VehicleBookingAPI.DTOs.Booking;
using VehicleBookingAPI.DTOs.Vehicle;

namespace VehicleBookingAPI.Services.Interfaces
{
    public interface IVehicleService
    {
        Task<List<VehicleResponseDto>> GetAvailableVehiclesAsync();
        Task<VehicleResponseDto?> GetVehicleByIdAsync(int id);
        Task<VehicleResponseDto> AddVehicleAsync(CreateVehicleDto dto);
        Task<bool> UpdateVehicleAsync(int id, UpdateVehicleDto dto);
    }
}

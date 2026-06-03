using VehicleBookingAPI.DTOs.Vehicle;

namespace VehicleBookingAPI.Services.Interfaces
{
    public interface IVehicleService
    {
        Task<List<VehicleResponseDto>> GetAllVehiclesAsync();
        Task<List<VehicleResponseDto>> GetAvailableVehiclesAsync();
        Task<VehicleResponseDto?> GetVehicleByIdAsync(Guid id);
        Task<VehicleResponseDto> AddVehicleAsync(CreateVehicleDto dto);
        Task<bool> UpdateVehicleAsync(Guid id, UpdateVehicleDto dto);
        Task<bool> DeleteVehicleAsync(Guid id);
    }
}

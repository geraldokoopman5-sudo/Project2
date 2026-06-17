using VehicleBookingAPI.DTOs.Auth;

namespace VehicleBookingAPI.Services.Interfaces
{
    public interface IJwtService
    {
        string GenerateToken(UserResponseDto user);
    }
}

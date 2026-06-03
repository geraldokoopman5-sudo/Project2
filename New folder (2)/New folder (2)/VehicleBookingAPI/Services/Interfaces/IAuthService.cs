using VehicleBookingAPI.DTOs.Auth;

namespace VehicleBookingAPI.Services.Interfaces
{
    public interface IAuthService
    {
        Task<string> Register(RegisterDto dto);
        Task<UserResponseDto?> Login(LoginDto dto);
        Task<List<UserResponseDto>> GetAllUsers();
        Task<UserResponseDto?> GetUserById(Guid id);
        Task<UserResponseDto?> UpdateUser(Guid id, UpdateUserDto dto);
        Task<UserResponseDto?> DeleteUser(Guid id);
    }
}
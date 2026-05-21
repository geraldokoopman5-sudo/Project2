using VehicleBookingAPI.DTOs.Auth;
using VehicleBookingAPI.Models.Entities;

namespace VehicleBookingAPI.Services.Interfaces
{
    public interface IAuthService
    {
        Task<string> Register(RegisterDto dto);
        Task<User?> Login(LoginDto dto);
        Task<List<User>> GetAllusers();
        Task<User?> GetUserById(int id);
        Task<bool> UpdateUser(int id, RegisterDto dto);
        Task<bool> DeleteUser(int id);
    }
}

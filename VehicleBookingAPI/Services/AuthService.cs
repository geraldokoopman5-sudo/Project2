using Microsoft.EntityFrameworkCore;
using VehicleBookingAPI.Data;
using VehicleBookingAPI.DTOs.Auth;
using VehicleBookingAPI.Models.Entities;
using VehicleBookingAPI.Services.Interfaces;

namespace VehicleBookingAPI.Services
{
    public class AuthService : IAuthService
    {
        private readonly AppDbContext _context;

        public AuthService(AppDbContext context)
        {
            _context = context;
        }
        
        public async Task<string>Register(RegisterDto dto)
        {
            bool emailExist = await _context.Users.AnyAsync(u => u.Email == dto.Email);

            if (emailExist)
            {
                return "This email already linked to a account";
            }

            var user = new User
            {
                Name = dto.Name,
                Email = dto.Email,
                Password = dto.Password,
                Role = dto.Role,
                Status = "Active"
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return "User registered successfully";
        }

        internal async Task GetAllUsers()
        {
            throw new NotImplementedException();
        }

        internal async Task LoginDto(LoginDto dto)
        {
            throw new NotImplementedException();
        }
    }
}

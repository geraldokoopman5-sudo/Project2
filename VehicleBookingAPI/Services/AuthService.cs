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

        public async Task<string> Register(RegisterDto dto)
        {
            bool emailExists = await _context.Users.AnyAsync(u => u.Email == dto.Email);
            if (emailExists)
                return "An account with this email already exists.";

            var user = new User
            {
                Name = dto.Name,
                Email = dto.Email,
                Password = dto.Password,   
                PhoneNumber = dto.PhoneNumber,
                Role = dto.Role,
                Status = "Active"
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return "User registered successfully.";
        }

      
        public async Task<User?> Login(LoginDto dto)
        {
            return await _context.Users
                .FirstOrDefaultAsync(u => u.Email == dto.Email && u.Password == dto.Password);
        }

        public async Task<List<User>> GetAllUsers()
        {
            return await _context.Users.ToListAsync();
        }

        public async Task<User?> GetUserById(int id)
        {
            return await _context.Users.FindAsync(id);
        }

        public async Task<bool> UpdateUser(int id, RegisterDto dto)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null) return false;

            bool emailTaken = await _context.Users
                .AnyAsync(u => u.Email == dto.Email && u.Id != id);
            if (emailTaken) throw new InvalidOperationException("Email already in use.");

            user.Name = dto.Name;
            user.Email = dto.Email;
            user.PhoneNumber = dto.PhoneNumber;
            user.Role = dto.Role;

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null) return false;

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
            return true;
        }

        Task<List<User>> IAuthService.GetAllusers()
        {
            throw new NotImplementedException();
        }
    }
}

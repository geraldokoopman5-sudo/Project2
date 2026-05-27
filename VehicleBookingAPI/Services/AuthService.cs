using Microsoft.EntityFrameworkCore;
using VehicleBookingAPI.Data;
using VehicleBookingAPI.DTOs.Auth;
using VehicleBookingAPI.Models.Entities;
using VehicleBookingAPI.Models.Enums;
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
                Password = dto.Password,  // TODO: hash with BCrypt
                PhoneNumber = dto.PhoneNumber,
                Role = dto.Role,
                Status = UserStatus.Active  // FIX: was string "Active"
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return "User registered successfully.";
        }

        public async Task<UserResponseDto?> Login(LoginDto dto)
        {
            // TODO: replace with BCrypt hash comparison
            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.Email == dto.Email && u.Password == dto.Password);

            return user == null ? null : MapToResponseDto(user);
        }

        public async Task<List<UserResponseDto>> GetAllUsers()
        {
            var users = await _context.Users.ToListAsync();
            return users.Select(MapToResponseDto).ToList();
        }

        // FIX: int → Guid
        public async Task<UserResponseDto?> GetUserById(Guid id)
        {
            var user = await _context.Users.FindAsync(id);
            return user == null ? null : MapToResponseDto(user);
        }

        // FIX: int → Guid, RegisterDto → UpdateUserDto
        public async Task<UserResponseDto?> UpdateUser(Guid id, UpdateUserDto dto)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null) return null;

            bool emailTaken = await _context.Users
                .AnyAsync(u => u.Email == dto.Email && u.Id != id);
            if (emailTaken)
                throw new InvalidOperationException("Email already in use.");

            user.Name = dto.Name;
            user.Email = dto.Email;
            user.PhoneNumber = dto.PhoneNumber;
            user.Role = dto.Role;
            user.Status = dto.Status;

            await _context.SaveChangesAsync();
            return MapToResponseDto(user);
        }

        // FIX: int → Guid
        public async Task<UserResponseDto?> DeleteUser(Guid id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null) return null;

            var deletedUser = MapToResponseDto(user);
            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return deletedUser;
        }

        private static UserResponseDto MapToResponseDto(User user)
        {
            return new UserResponseDto
            {
                Id = user.Id,
                Name = user.Name,
                Email = user.Email,
                PhoneNumber = user.PhoneNumber,
                Role = user.Role,
                Status = user.Status
            };
        }
    }
}
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
            }; // Use a mapper to make this cleaner

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return "User registered successfully.";
        }

      
        public async Task<User?> Login(LoginDto dto)
        {
            return await _context.Users
                .FirstOrDefaultAsync(u => u.Email == dto.Email && u.Password == dto.Password); // Incomplete -> Do proper hashing and salting with .NET identity or raw bcrypt passwords & tokens
        }

        public async Task<List<User>> GetAllUsers() // Return a DTO, you don 't want to expose all user details in a real app
        {
            return await _context.Users.ToListAsync();
        }

        public async Task<User?> GetUserById(int id)
        {
            return await _context.Users.FindAsync(id);
        }

        public async Task<bool> UpdateUser(int id, RegisterDto dto) // Either dont return anything or return a response DTO
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

            await _context.SaveChangesAsync(); // Logic can be refactored 
            return true;
        }

        public async Task<bool> DeleteUser(int id) // DONT RETURN A BOOLEAN, THROW EXCEPTIONS OR RETURN A RESPONSE DTO
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null) return false;

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
            return true;
        }

        Task<List<User>> IAuthService.GetAllusers() // Use DTO
        {
            throw new NotImplementedException();
        }
    }
}

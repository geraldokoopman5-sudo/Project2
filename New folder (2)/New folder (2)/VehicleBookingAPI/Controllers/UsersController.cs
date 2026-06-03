using Microsoft.AspNetCore.Mvc;
using VehicleBookingAPI.DTOs.Auth;
using VehicleBookingAPI.Services.Interfaces;

namespace VehicleBookingAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IAuthService _authService;

        public UsersController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost]
        public async Task<IActionResult> CreateUser(RegisterDto dto)
        {
            try
            {
                var result = await _authService.Register(dto);
                return Ok(new { message = result });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetAllUsers()
        {
            var users = await _authService.GetAllUsers();
            return Ok(users);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserById(Guid id)
        {
            var user = await _authService.GetUserById(id);
            if (user == null) return NotFound("User not found.");
            return Ok(user);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(Guid id, UpdateUserDto dto)
        {
            try
            {
                var updated = await _authService.UpdateUser(id, dto);
                if (updated == null) return NotFound("User not found.");
                return Ok(updated);
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(Guid id)
        {
            var deleted = await _authService.DeleteUser(id);
            if (deleted == null) return NotFound("User not found.");
            return Ok(new { message = "User deleted successfully.", user = deleted });
        }
    }
}
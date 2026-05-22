using Microsoft.AspNetCore.Mvc;
using VehicleBookingAPI.DTOs.Auth;
using VehicleBookingAPI.Services.Interfaces;

namespace VehicleBookingAPI.Controllers
{
  
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AdminController(IAuthService authService)
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
            var users = await _authService.GetAllusers();
            return Ok(users);
        }

        // GET /api/admin/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserById(int id)
        {
            var user = await _authService.GetUserById(id);
            if (user == null) return NotFound("User not found.");
            return Ok(user);
        }

        // PUT /api/admin/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, RegisterDto dto)
        {
            try
            {
                var success = await _authService.UpdateUser(id, dto);
                if (!success) return NotFound("User not found.");
                return Ok(new { message = "User updated successfully." });
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        // DELETE /api/admin/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var success = await _authService.DeleteUser(id);
            if (!success) return NotFound("User not found.");
            return Ok(new { message = "User deleted successfully." });
        }
    }
}

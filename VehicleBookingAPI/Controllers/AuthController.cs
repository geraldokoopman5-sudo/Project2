using Microsoft.AspNetCore.Mvc;
using VehicleBookingAPI.DTOs.Auth;
using VehicleBookingAPI.Services.Interfaces;

namespace VehicleBookingAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterDto dto)
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

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto dto)
        {
            var user = await _authService.Login(dto);
            if (user == null)
                return Unauthorized(new { message = "Invalid email or password." });

            return Ok(new { message = "Login successful.", userId = user.Id, role = user.Role });
        }
    }
}

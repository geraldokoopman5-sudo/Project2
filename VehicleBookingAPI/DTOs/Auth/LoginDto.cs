using System.ComponentModel.DataAnnotations;

namespace VehicleBookingAPI.DTOs.Auth
{
    public class LoginDto
    {
        public string Email { get; set; } = string.Empty; // Also required
        [Required]
        public string Password { get; set; } = string.Empty;

    }
}

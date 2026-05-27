using System.ComponentModel.DataAnnotations;

namespace VehicleBookingAPI.DTOs.Auth
{
    public class LoginDto
    {
        [EmailAddress]
        [Required]
        [MaxLength(100)]
        public string Email { get; set; } = string.Empty; 

        [Required]
        public string Password { get; set; } = string.Empty;

    }
}

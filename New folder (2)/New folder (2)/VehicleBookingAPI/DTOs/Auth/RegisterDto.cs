using System.ComponentModel.DataAnnotations;
using VehicleBookingAPI.Models.Enums;


namespace VehicleBookingAPI.DTOs.Auth
{
    public class RegisterDto
    {
        // Add Validations
        [Required]
        [MaxLength(100)]
        public string Name { get; set; } = string.Empty;

        [Required]
        [MaxLength(100)]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Required]
        [MaxLength(100)]
        public string Password { get; set; } = string.Empty;

        [Required]
        [MaxLength(10)]
        public string PhoneNumber { get; set; } = string.Empty;

        public UserRole Role { get; set; } 
    
        
    }
}

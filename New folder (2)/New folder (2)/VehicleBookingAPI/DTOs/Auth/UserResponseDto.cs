using System.ComponentModel.DataAnnotations;
using VehicleBookingAPI.Models.Enums;

namespace VehicleBookingAPI.DTOs.Auth
{
    public class UserResponseDto
    {
        public Guid Id { get; set; }
        [Required]
        [MaxLength(100)]
        public string Name { get; set; } = string.Empty;

        [Required]
        [EmailAddress]
        [MaxLength(100)]
        public string Email { get; set; } = string.Empty;

        [Required]
        [MaxLength(10)]
        public string PhoneNumber { get; set; } = string.Empty;

        public UserRole Role { get; set; }
        public UserStatus Status { get; set; }
    }
}

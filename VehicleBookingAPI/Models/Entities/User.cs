using VehicleBookingAPI.Models.Enums;
using System.ComponentModel.DataAnnotations;

namespace VehicleBookingAPI.Models.Entities
{
    public class User
    {
        [Key]
        public Guid Id { get; set; } 


        [Required]
        [MaxLength(100)]
        public required string Name { get; set; } // Add Validations

        [EmailAddress]
        [Required]
        public string Email { get; set; } = string.Empty; // Add validation for email format

        [MaxLength(10)]
        [Required]
        public string PhoneNumber { get; set; } = string.Empty;

        [Required]
        public string Password { get; set; } = string.Empty;
        public UserRole Role { get; set; }
        public UserStatus Status { get; set; }

        public ICollection<Vehicle> Vehicles { get; set; } = new List<Vehicle>();
        public ICollection<Booking> Bookings { get; set; } = new List<Booking>();
    }
}

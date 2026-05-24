using System.ComponentModel.DataAnnotations;

namespace VehicleBookingAPI.Models.Entities
{
    public class User
    {
        [Key]
        public int Id { get; set; } // Use Guids instead, auto-increment is weird
        [Required]
        public required string Name { get; set; } // Add Validations
        [EmailAddress]
        [Required]
        public string Email { get; set; } = string.Empty; // Add validation for email format
        [MaxLength(10)]
        public string PhoneNumber { get; set; } = string.Empty;
        [Required]
        public required string Password { get; set; }
        public string Role { get; set; } // Enum - ensure it works in Identity (Auth provider)
        public string Status { get; set; } = string.Empty; // Should be enum as well

        public ICollection<Vehicle> Vehicles { get; set; } = new List<Vehicle>();
        public ICollection<Booking> Bookings { get; set; } = new List<Booking>();
    }
}

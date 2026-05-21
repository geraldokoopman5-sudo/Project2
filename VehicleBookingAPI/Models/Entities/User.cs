using Microsoft.Identity.Client;
using System.ComponentModel.DataAnnotations;
using VehicleBookingAPI.Models.Enums;

namespace VehicleBookingAPI.Models.Entities
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public required string Name { get; set; }
        [Required]
        public string Email { get; set; } = string.Empty;
        [MaxLength(10)]
        public string PhoneNumber { get; set; } = string.Empty;
        [Required]
        public required string Password { get; set; }
        public UserRole Role { get; set; } 
        public string Status { get; set; } = string.Empty;

        public ICollection<Vehicle> Vehicles { get; set; } = new List<Vehicle>();
        public ICollection<Booking> Bookings { get; set; } = new List<Booking>();
    }
}

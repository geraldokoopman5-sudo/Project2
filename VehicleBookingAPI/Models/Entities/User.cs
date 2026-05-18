using Microsoft.Identity.Client;
using System.ComponentModel.DataAnnotations;

namespace VehicleBookingAPI.Models.Entities
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        public required string Name { get; set; }
        public string Email { get; set; } = string.Empty;
        public  int PhoneNumber { get; set; }
        public required string Password { get; set; }
        public string Role { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
        public ICollection<Vehicle> Vehicles { get; set; } = new List<Vehicle>();
        public ICollection<Booking> Bookings { get; set; } = new List<Booking>();
    }
}

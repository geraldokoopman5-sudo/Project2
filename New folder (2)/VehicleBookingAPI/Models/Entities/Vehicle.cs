using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace VehicleBookingAPI.Models.Entities
{
    public class Vehicle
    {
        [Key]
        public Guid VehicleId { get; set; }

        [Required]
        public Guid OwnerId { get; set; }

        [MaxLength(100)]
        [Required]
        public string Make { get; set; } = string.Empty;

        [MaxLength(100)]
        [Required]
        public string Model { get; set; } = string.Empty;

        // FIX: was DateTime, Year is a number not a date
        public int Year { get; set; }

        [MaxLength(50)]
        public string Category { get; set; } = string.Empty;

        [Column(TypeName = "decimal(10,2)")]
        public decimal DailyRate { get; set; }

        public bool IsAvailable { get; set; } = true;

        [MaxLength(int.MaxValue)]
        public string? ImageData { get; set; }

        [ForeignKey("OwnerId")]
        public User Owner { get; set; } = null!;

        public ICollection<Booking> Bookings { get; set; } = new List<Booking>();
    }
}
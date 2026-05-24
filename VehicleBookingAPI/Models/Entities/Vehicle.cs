using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace VehicleBookingAPI.Models.Entities
{
    public class Vehicle
    {
        [Key]
        public int VehicleId { get; set; } // Guid

        [Required]
        public int OwnerId { get; set; } // Guid

        [MaxLength(100)]
        public string Make { get; set; }

        [MaxLength(100)]
        public string Model { get; set; }

        public int Year { get; set; } // DateTime.Year

        [MaxLength(50)]
        public string Category { get; set; } // Integer

        [Column(TypeName = "decimal(10,2)")]
        public decimal DailyRate { get; set; }

        public bool IsAvailabile { get; set; } = true;

        
        [ForeignKey("OwnerId")]
        public User Owner { get; set; }

        public ICollection<Booking> Bookings { get; set; } = new List<Booking>();
        public bool IsAvailable { get; internal set; }
    }
}


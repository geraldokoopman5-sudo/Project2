using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace VehicleBookingAPI.DTOs.Vehicle
{
    public class CreateVehicleDto
    {

        [Required]
        public int OwnerId { get; set; }

        [Required]
        [MaxLength(100)]
        public string Make { get; set; } = string.Empty;

        [Required]
        [MaxLength(100)]
        public string Model { get; set; } = string.Empty;

        [Range(1900, 2100)]
        public int Year { get; set; }

        [MaxLength(50)]
        public string Category { get; set; } = string.Empty;

        [Column(TypeName = "decimal(10,2)")]
        [Range(0.01, double.MaxValue, ErrorMessage = "DailyRate must be greater than zero")]
        public decimal DailyRate { get; set; }
    }
}

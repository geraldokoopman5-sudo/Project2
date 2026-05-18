using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace VehicleBookingAPI.DTOs.Vehicle
{
    public class UpdateVehicleDto
    {
        using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace VehicleBookingAPI.DTOs.Vehicle
    {
        public class CreateVehicleDto
        {
            [Key]
            public int VehicleId { get; set; }

            [Required]
            public int OwnerId { get; set; }

            [MaxLength(100)]
            public string Make { get; set; }

            [MaxLength(100)]
            public string Model { get; set; }

            public int Year { get; set; }

            [MaxLength(50)]
            public string Category { get; set; }

            [Column(TypeName = "decimal(10,2)")]
            public decimal DailyRate { get; set; }
        }
    }

}
}

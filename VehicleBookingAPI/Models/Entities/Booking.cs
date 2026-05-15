using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace VehicleBookingAPI.Models.Entities
{
    public class Booking
    {
        [Key]
        public int BookingId { get; set; }

        [Required]
        public int CompanyId { get; set; }

        [Required]
        public int VehicleId { get; set; }

        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }

        [Column(TypeName = "decimal(10,2)")]
        public decimal TotalCost { get; set; }

        public string Status { get; set; } = "pending";

        // Relationships
        [ForeignKey("CompanyId")]
        public User Company { get; set; }

        [ForeignKey("VehicleId")]
        public Vehicle Vehicle { get; set; } 
    }
}

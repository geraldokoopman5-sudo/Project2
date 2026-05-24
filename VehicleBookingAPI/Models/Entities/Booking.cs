using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using VehicleBookingAPI.Models.Enums;

namespace VehicleBookingAPI.Models.Entities
{
    public class Booking
    {
        [Key]
        public int BookingId { get; set; } // Make Guid

        [Required]
        public int CompanyId { get; set; } // Guid as well

        [Required]
        public int VehicleId { get; set; } // Guid as well

        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }

        [Column(TypeName = "decimal(10,2)")]
        public decimal TotalCost { get; set; }

        public BookingStatus Status { get; set; } = BookingStatus.Pending;

        [ForeignKey("CompanyId")]
        public User Company { get; set; } = null!; // Rename to Company 

        [ForeignKey("VehicleId")]
        public Vehicle Vehicle { get; set; } = null!;
    }
}

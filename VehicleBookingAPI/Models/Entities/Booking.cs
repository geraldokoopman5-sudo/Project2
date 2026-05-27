using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using VehicleBookingAPI.Models.Enums;

namespace VehicleBookingAPI.Models.Entities
{
    public class Booking
    {
        [Key]
        public Guid BookingId { get; set; }

        [Required]
        public Guid CompanyId { get; set; }

        [Required]
        public Guid VehicleId { get; set; }

        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }

        [Column(TypeName = "decimal(10,2)")]
        public decimal TotalCost { get; set; }

        public BookingStatus Status { get; set; } = BookingStatus.Pending;

        [ForeignKey("CompanyId")]
        public User Company { get; set; } = null!;

        [ForeignKey("VehicleId")]
        public Vehicle Vehicle { get; set; } = null!;
    }
}
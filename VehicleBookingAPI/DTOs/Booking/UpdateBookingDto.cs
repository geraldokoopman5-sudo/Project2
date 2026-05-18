using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace VehicleBookingAPI.DTOs.Booking
{
    public class UpdateBookingDto
    {
        [Required]
        public int BookingId { get; set; }

        [Required]
        public int CompanyId { get; set; }

        [Required]
        public int VehicleId { get; set; }

        [Required]
        public DateTime StartDate { get; set; }

        [Required]
        public DateTime EndDate { get; set; }

        [Required]
        public decimal TotalCost { get; set; }

        [Required]
        public string Status { get; set; }
    }
}

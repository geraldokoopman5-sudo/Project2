using System.ComponentModel.DataAnnotations;

namespace VehicleBookingAPI.DTOs.Booking
{
    public class CreateBookingDto
    {
        [Required]
        public Guid CompanyId { get; set; }

        [Required]
        public Guid VehicleId { get; set; }

        [Required]
        public DateTime StartDate { get; set; }

        [Required]
        public DateTime EndDate { get; set; }
    }
}
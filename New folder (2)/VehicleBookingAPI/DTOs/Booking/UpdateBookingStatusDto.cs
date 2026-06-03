using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using VehicleBookingAPI.Models.Enums;

namespace VehicleBookingAPI.DTOs.Booking
{
    public class UpdateBookingStatusDto
    {
        [Required]
        public BookingStatus Status { get; set; }
    }
}

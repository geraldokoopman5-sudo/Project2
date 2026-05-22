using VehicleBookingAPI.Models.Enums;

namespace VehicleBookingAPI.DTOs.Booking
{
    public class BookingResponseDto
    {
        public int BookingId { get; set; }
        public int CompanyId { get; set; }
        public string CompanyName { get; set; } = string.Empty;
        public int VehicleId { get; set; }
        public string VehicleMakeModel { get; set; } = string.Empty;
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public int NumberOfDays { get; set; }
        public decimal TotalCost { get; set; }
        public BookingStatus Status { get; set; }
    }
}


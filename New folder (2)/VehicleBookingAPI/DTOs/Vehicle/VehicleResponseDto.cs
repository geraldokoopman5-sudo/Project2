using VehicleBookingAPI.Models.Enums;

namespace VehicleBookingAPI.DTOs.Vehicle
{
    public class VehicleResponseDto
    {
        public Guid VehicleId { get; set; }
        public Guid OwnerId { get; set; }
        public string OwnerName { get; set; } = string.Empty;
        public string Make { get; set; } = string.Empty;
        public string Model { get; set; } = string.Empty;
        public int Year { get; set; }
        public string Category { get; set; } = string.Empty;
        public decimal DailyRate { get; set; }
        public bool IsAvailable { get; set; }
        public string? ImageData { get; set; }
        public VehicleApprovalStatus ApprovalStatus { get; set; }
    }
}
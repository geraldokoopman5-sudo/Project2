namespace VehicleBookingAPI.DTOs.Vehicle
{
    public class VehicleResponseDto
    {
        public int VehicleId { get; set; }
        public int OwnerId { get; set; }
        public string OwnerName { get; set; } = string.Empty;
        public string Make { get; set; } = string.Empty;
        public string Model { get; set; } = string.Empty;
        public int Year { get; set; }
        public string Category { get; set; } = string.Empty;
        public decimal DailyRate { get; set; }
        public bool IsAvailable { get; set; }
    }
}

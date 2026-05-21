using VehicleBookingAPI.DTOs.Booking;
using VehicleBookingAPI.Models.Enums;

namespace VehicleBookingAPI.Services.Interfaces
{
    public interface IBookingService
    {
        Task<BookingResponseDto?> CreateBookingAsync(CreateBookingDto dto);
        Task<List<BookingResponseDto>> GetAllBookingAsync();
        Task<BookingResponseDto?> GetBookingByIdAsync(int id);
        Task<bool> UpdateBookingStatusAsync(int id, BookingStatus status);
    }
}

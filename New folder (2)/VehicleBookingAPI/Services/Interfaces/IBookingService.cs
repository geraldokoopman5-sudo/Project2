using VehicleBookingAPI.DTOs.Booking;
using VehicleBookingAPI.Models.Enums;

namespace VehicleBookingAPI.Services.Interfaces
{
    public interface IBookingService
    {
        Task<BookingResponseDto?> CreateBookingAsync(CreateBookingDto dto);
        Task<List<BookingResponseDto>> GetAllBookingAsync();
        Task<BookingResponseDto?> GetBookingByIdAsync(Guid id);
        Task<bool> UpdateBookingStatusAsync(Guid id, BookingStatus status);
        Task<bool> DeleteBookingAsync(Guid id);
    }
}
using Microsoft.EntityFrameworkCore;
using VehicleBookingAPI.Data;
using VehicleBookingAPI.DTOs.Booking;
using VehicleBookingAPI.Helpers;
using VehicleBookingAPI.Models.Entities;
using VehicleBookingAPI.Models.Enums;
using VehicleBookingAPI.Services.Interfaces;

namespace VehicleBookingAPI.Services
{
    public class BookingService : IBookingService
    {
        private readonly AppDbContext _context;

        public BookingService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<BookingResponseDto?> CreateBookingAsync(CreateBookingDto dto)
        {
            var dateError = BookingValidator.ValidateDates(dto.StartDate, dto.EndDate);
            if (dateError != null)
                throw new ArgumentException(dateError);

            var vehicle = await _context.Vehicles
                .Include(v => v.Owner)
                .FirstOrDefaultAsync(v => v.VehicleId == dto.VehicleId);

            if (vehicle == null)
                throw new KeyNotFoundException("Vehicle not found.");

            if (!vehicle.IsAvailable)
                throw new InvalidOperationException("Vehicle is not available for booking.");

            bool overlapExists = await _context.Bookings.AnyAsync(b =>
                b.VehicleId == dto.VehicleId &&
                dto.StartDate < b.EndDate &&
                dto.EndDate > b.StartDate &&
                b.Status != BookingStatus.Cancelled);

            if (overlapExists)
                throw new InvalidOperationException("Vehicle is already booked for the selected dates.");

            int days = BookingCalculator.CalculateDays(dto.StartDate, dto.EndDate);
            decimal total = BookingCalculator.CalculateTotal(vehicle.DailyRate, days);

            var booking = new Booking
            {
                CompanyId = dto.CompanyId,
                VehicleId = dto.VehicleId,
                StartDate = dto.StartDate,
                EndDate = dto.EndDate,
                TotalCost = total,
                Status = BookingStatus.Pending
            };

            _context.Bookings.Add(booking);
            await _context.SaveChangesAsync();

            return MapToResponseDto(booking, vehicle, days);
        }

        // FIX: renamed to match interface, removed the stub
        public async Task<List<BookingResponseDto>> GetAllBookingAsync()
        {
            var bookings = await _context.Bookings
                .Include(b => b.Vehicle)
                .Include(b => b.Company)
                .ToListAsync();

            return bookings.Select(b =>
            {
                int days = BookingCalculator.CalculateDays(b.StartDate, b.EndDate);
                return MapToResponseDto(b, b.Vehicle, days);
            }).ToList();
        }

        // FIX: int → Guid
        public async Task<BookingResponseDto?> GetBookingByIdAsync(Guid id)
        {
            var booking = await _context.Bookings
                .Include(b => b.Vehicle)
                .Include(b => b.Company)
                .FirstOrDefaultAsync(b => b.BookingId == id);

            if (booking == null) return null;

            int days = BookingCalculator.CalculateDays(booking.StartDate, booking.EndDate);
            return MapToResponseDto(booking, booking.Vehicle, days);
        }

        // FIX: int → Guid
        public async Task<bool> UpdateBookingStatusAsync(Guid id, BookingStatus status)
        {
            var booking = await _context.Bookings.FindAsync(id);
            if (booking == null) return false;

            booking.Status = status;
            await _context.SaveChangesAsync();
            return true;
        }

        // FIX: int → Guid
        public async Task<bool> DeleteBookingAsync(Guid id)
        {
            var booking = await _context.Bookings.FindAsync(id);
            if (booking == null) return false;

            if (booking.Status == BookingStatus.Pending || booking.Status == BookingStatus.Confirmed)
                throw new InvalidOperationException(
                    "Cannot delete an active booking. Reject or cancel it first.");

            _context.Bookings.Remove(booking);
            await _context.SaveChangesAsync();
            return true;
        }

        private static BookingResponseDto MapToResponseDto(Booking booking, Vehicle vehicle, int days)
        {
            return new BookingResponseDto
            {
                BookingId = booking.BookingId,
                CompanyId = booking.CompanyId,
                CompanyName = booking.Company?.Name ?? string.Empty,
                VehicleId = booking.VehicleId,
                VehicleMakeModel = $"{vehicle.Make} {vehicle.Model}",
                StartDate = booking.StartDate,
                EndDate = booking.EndDate,
                NumberOfDays = days,
                TotalCost = booking.TotalCost,
                Status = booking.Status
            };
        }
    }
}
using Microsoft.EntityFrameworkCore;
using VehicleBookingAPI.Data;
using VehicleBookingAPI.DTOs.Booking;
using VehicleBookingAPI.Models.Entities;

namespace VehicleBookingAPI.Services
{
    public class BookingService
    {
        private readonly AppDbContext _context;

        public BookingService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<string> CreateBookingAsync(CreateBookingDto bookingDto)
        {
            var vehicle = await _context.Vehicles.FirstOrDefaultAsync(v => v.VehicleId == bookingDto.VehicleId);

            if(vehicle == null)
            {
                return "Vehicle not found";
            }

            if (!vehicle.Availability)
            {
                return "Vehicle is not avaible at this moment";
            }

            if(bookingDto.EndDate < bookingDto.StartDate)
            {
                return "End Date cannot be before start date";
            }

            bool overlapExist = await _context.Bookings.AnyAsync(b =>
             b.VehicleId == bookingDto.VehicleId &&
             bookingDto.StartDate < b.EndDate &&
             bookingDto.EndDate > b.StartDate &&
             b.Status != "cancelled");

            if (overlapExist)
            {
                return "Vehicle already booked for selected dates";
            }

            int days = (bookingDto.EndDate - bookingDto.StartDate).Days;

            decimal total = days * vehicle.DailyRate;

            var booking = new Booking
            {
                CompanyId = bookingDto.CompanyId,
                VehicleId = bookingDto.VehicleId,
                StartDate = bookingDto.StartDate,
                EndDate = bookingDto.EndDate,
                TotalCost = total,
                Status = "pending"
            };

            _context.Bookings.Add(booking);
            await _context.SaveChangesAsync();

            return "Booking created successfully";
        }   

    }
}

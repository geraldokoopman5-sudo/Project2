using Microsoft.AspNetCore.Mvc;
using VehicleBookingAPI.DTOs.Booking;
using VehicleBookingAPI.Models.Enums;
using VehicleBookingAPI.Services.Interfaces;

namespace VehicleBookingAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BookingController : ControllerBase
    {
        private readonly IBookingService _bookingService;

        public BookingController(IBookingService bookingService)
        {
            _bookingService = bookingService;
        }

        [HttpPost]
        public async Task<IActionResult> CreateBooking(CreateBookingDto dto)
        {
            try
            {
                var result = await _bookingService.CreateBookingAsync(dto);
                return CreatedAtAction(nameof(GetBookingById), new { id = result!.BookingId }, result);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (InvalidOperationException ex)
            {
                return Conflict(new { message = ex.Message });
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetAllBookings()
        {
            var bookings = await _bookingService.GetAllBookingAsync();
            return Ok(bookings);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetBookingById(Guid id)
        {
            var booking = await _bookingService.GetBookingByIdAsync(id);
            if (booking == null) return NotFound("Booking not found.");
            return Ok(booking);
        }

        [HttpPut("{id}/approve")]
        public async Task<IActionResult> ApproveBooking(Guid id)
        {
            var success = await _bookingService.UpdateBookingStatusAsync(id, BookingStatus.Confirmed);
            if (!success) return NotFound("Booking not found.");
            return Ok(new { message = "Booking confirmed." });
        }

        // FIX: was missing from your controller
        [HttpPut("{id}/reject")]
        public async Task<IActionResult> RejectBooking(Guid id)
        {
            var success = await _bookingService.UpdateBookingStatusAsync(id, BookingStatus.Rejected);
            if (!success) return NotFound("Booking not found.");
            return Ok(new { message = "Booking rejected." });
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBooking(Guid id)
        {
            try
            {
                var success = await _bookingService.DeleteBookingAsync(id);
                if (!success) return NotFound("Booking not found.");
                return Ok(new { message = "Booking deleted successfully." });
            }
            catch (InvalidOperationException ex)
            {
                return Conflict(new { message = ex.Message });
            }
        }
    }
}
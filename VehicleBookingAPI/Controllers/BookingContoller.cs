using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using VehicleBookingAPI.DTOs.Booking;
using VehicleBookingAPI.Services;

namespace VehicleBookingAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookingContoller : ControllerBase
    {
        private readonly BookingService _bookingService;

        public BookingContoller(BookingService bookingService)
        {
            _bookingService = bookingService;
        }

        [HttpPost]
        public async Task<IActionResult>CreateBooking(CreateBookingDto createBookingDto)
        {
            var result = await _bookingService.CreateBookingAsync(createBookingDto);

            return Ok(result);
        }

        [HttpGet("{BookingId}")]
        public async Task<IActionResult> GetAllBookingsAsync()
        {
            var booking = _bookingService.
        }
    }
}

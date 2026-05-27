using Microsoft.AspNetCore.Mvc;
using VehicleBookingAPI.DTOs.Vehicle;
using VehicleBookingAPI.Services.Interfaces;

namespace VehicleBookingAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VehiclesController : ControllerBase
    {
        private readonly IVehicleService _vehicleService;

        public VehiclesController(IVehicleService vehicleService)
        {
            _vehicleService = vehicleService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAvailableVehicles()
        {
            var vehicles = await _vehicleService.GetAvailableVehiclesAsync();
            return Ok(vehicles);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetVehicleById(Guid id)
        {
            var vehicle = await _vehicleService.GetVehicleByIdAsync(id);
            if (vehicle == null) return NotFound("Vehicle not found.");
            return Ok(vehicle);
        }

        [HttpPost]
        public async Task<IActionResult> AddVehicle(CreateVehicleDto dto)
        {
            var vehicle = await _vehicleService.AddVehicleAsync(dto);
            return CreatedAtAction(nameof(GetVehicleById), new { id = vehicle.VehicleId }, vehicle);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateVehicle(Guid id, UpdateVehicleDto dto)
        {
            var success = await _vehicleService.UpdateVehicleAsync(id, dto);
            if (!success) return NotFound("Vehicle not found.");
            return Ok("Vehicle updated successfully.");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteVehicle(Guid id)
        {
            try
            {
                var success = await _vehicleService.DeleteVehicleAsync(id);
                if (!success) return NotFound("Vehicle not found.");
                return Ok("Vehicle deleted successfully.");
            }
            catch (InvalidOperationException ex)
            {
                return Conflict(new { message = ex.Message });
            }
        }
    }
}
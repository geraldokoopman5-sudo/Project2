using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using VehicleBookingAPI.DTOs.Vehicle;
using VehicleBookingAPI.Services;

namespace VehicleBookingAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VehiclesController : ControllerBase
    {
        private readonly VehicleService _vehicleService;

        public VehiclesController(VehicleService vehiclesService)
        {
            _vehicleService = vehiclesService;
        }

        [HttpGet]
        public async Task<IActionResult>GetVehicles()
        {
            var vehicles = await _vehicleService.GetAvailableVehicles();

            return Ok(vehicles);
        }
        [HttpPost]
        public async Task<IActionResult> AddVehicle(CreateVehicleDto dto)
        {
            var vehicle = await _vehicleService.AddVehicle(dto);

            return Ok(vehicle);
        }
    }
}

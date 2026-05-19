//using Microsoft.AspNetCore.Mvc;
//using VehicleBookingAPI.DTOs.Auth;
//using VehicleBookingAPI.Services;

//namespace VehicleBookingAPI.Controllers
//{
//    [ApiController]
//    [Route("api/[controller]")]
//    public class AuthenticationController : ControllerBase
//    {
//        private readonly AuthService _authService;

//        public AuthenticationController(AuthService authService)
//        {
//            _authService = authService;
//        }

//        // =====================================================
//        // REGISTER USER
//        // POST: api/authentication/register
//        // =====================================================
//        [HttpPost("register")]
//        public async Task<IActionResult> Register(RegisterDto dto)
//        {
//            try
//            {
//                var result = await _authService.RegisterUser(dto);

//                return Ok(new
//                {
//                    message = result
//                });
//            }
//            catch (Exception ex)
//            {
//                return BadRequest(new
//                {
//                    message = ex.Message
//                });
//            }
//        }

//        // =====================================================
//        // LOGIN USER
//        // POST: api/authentication/login
//        // =====================================================
//        [HttpPost("login")]
//        public async Task<IActionResult> Login(LoginDto dto)
//        {
//            try
//            {
//                var user = await _authService.Login(dto);

//                if (user == null)
//                {
//                    return Unauthorized(new
//                    {
//                        message = "Invalid email or password"
//                    });
//                }

//                return Ok(new
//                {
//                    message = "Login successful",
//                    user
//                });
//            }
//            catch (Exception ex)
//            {
//                return BadRequest(new
//                {
//                    message = ex.Message
//                });
//            }
//        }

//        // =====================================================
//        // GET ALL USERS
//        // GET: api/authentication/users
//        // =====================================================
//        [HttpGet("users")]
//        public async Task<IActionResult> GetAllUsers()
//        {
//            var users = await _authService.GetAllUsers();

//            return Ok(users);
//        }

//        // =====================================================
//        // GET USER BY ID
//        // GET: api/authentication/users/1
//        // =====================================================
//        [HttpGet("users/{id}")]
//        public async Task<IActionResult> GetUserById(int id)
//        {
//            var user = await _authService.GetUserById(id);

//            if (user == null)
//            {
//                return NotFound(new
//                {
//                    message = "User not found"
//                });
//            }

//            return Ok(user);
//        }

//        // =====================================================
//        // UPDATE USER
//        // PUT: api/authentication/users/1
//        // =====================================================
//        [HttpPut("users/{id}")]
//        public async Task<IActionResult> UpdateUser(int id, RegisterDto dto)
//        {
//            try
//            {
//                var result = await _authService.UpdateUser(id, dto);

//                if (!result)
//                {
//                    return NotFound(new
//                    {
//                        message = "User not found"
//                    });
//                }

//                return Ok(new
//                {
//                    message = "User updated successfully"
//                });
//            }
//            catch (Exception ex)
//            {
//                return BadRequest(new
//                {
//                    message = ex.Message
//                });
//            }
//        }

//        // =====================================================
//        // DELETE USER
//        // DELETE: api/authentication/users/1
//        // =====================================================
//        [HttpDelete("users/{id}")]
//        public async Task<IActionResult> DeleteUser(int id)
//        {
//            var result = await _authService.DeleteUser(id);

//            if (!result)
//            {
//                return NotFound(new
//                {
//                    message = "User not found"
//                });
//            }

//            return Ok(new
//            {
//                message = "User deleted successfully"
//            });
//        }
//    }
//}
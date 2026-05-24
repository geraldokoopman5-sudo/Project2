using System.Net;
using System.Text.Json;

namespace VehicleBookingAPI.Middelware
{
    public class ErrorHandlingMiddleware
    {
        private readonly RequestDelegate _next;

        private readonly ILogger<ErrorHandlingMiddleware> _logger;

        public ErrorHandlingMiddleware(RequestDelegate next, ILogger<ErrorHandlingMiddleware> logger)
        {
            _next = next;
            _logger = logger;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);

            }

            catch (Exception ex)
            {
                _logger.LogError(ex, "Unhandled exception");
                //await HandleExceptionAsync(context, ex);
            }
        }

        private static Task HandleExeptionAsync(HttpContext context, Exception exception)
        {
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

            var response = JsonSerializer.Serialize(new
            {
                message = "An unexpected error occurred. Please try again later.",
                detail = exception.Message
            });

            return context.Response.WriteAsync(response);
        }
    }
}

// put this middleware into chat, it will not work.
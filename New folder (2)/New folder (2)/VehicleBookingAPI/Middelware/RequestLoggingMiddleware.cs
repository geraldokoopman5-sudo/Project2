using System.Diagnostics;

namespace VehicleBookingAPI.Middelware
{
    public class RequestLoggingMiddleware(RequestDelegate next, ILogger<RequestLoggingMiddleware> logger)
    {
        private readonly RequestDelegate _next = next;
        private readonly ILogger<RequestLoggingMiddleware> _logger = logger;

        public async Task InvokeAsync(HttpContext context)
        {
            var stopwatch = Stopwatch.StartNew();
            var method = context.Request.Method;
            var path = context.Request.Path;

            _logger.LogInformation(
                "Request Started: {Method} {Path} at {Time}",
                method,
                path,
                DateTime.UtcNow);

            try
            {
                await _next(context);
                stopwatch.Stop();

                _logger.LogInformation(
                    "Request Completed: {Method} {Path} responded {StatusCode} in {ElapsedMilliseconds}ms",
                    method,
                    path,
                    context.Response.StatusCode,
                    stopwatch.ElapsedMilliseconds);
            }
            catch (Exception ex)
            {
                stopwatch.Stop();

                _logger.LogError(
                    ex,
                    "Request Failed: {Method} {Path} after {ElapsedMilliseconds}ms",
                    method,
                    path,
                    stopwatch.ElapsedMilliseconds);

                throw;
            }
        }
    }
}
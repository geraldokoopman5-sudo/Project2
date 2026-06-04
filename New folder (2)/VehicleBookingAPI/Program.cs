using Microsoft.EntityFrameworkCore;
using VehicleBookingAPI.Data;
using VehicleBookingAPI.Middelware;
using VehicleBookingAPI.Services;
using VehicleBookingAPI.Services.Interfaces;

namespace VehicleBookingAPI
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddControllers();
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

           
            var connectionString =
                Environment.GetEnvironmentVariable("postgresql://bookingdb_fhw1_user:YmU6NYtJ8EgWhhQlswvsZwxKIyOwyBwj@dpg-d8gl1il8nd3s7394eqag-a/bookingdb_fhw1")
                ?? builder.Configuration.GetConnectionString("DefaultConnection");

            builder.Services.AddDbContext<AppDbContext>(options =>
                options.UseNpgsql(connectionString));

            builder.Services.AddScoped<IAuthService, AuthService>();
            builder.Services.AddScoped<IBookingService, BookingService>();
            builder.Services.AddScoped<IVehicleService, VehicleService>();

            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowAll", policy =>
                {
                    policy.AllowAnyOrigin()
                          .AllowAnyHeader()
                          .AllowAnyMethod();
                });

                options.AddPolicy("AllowFrontend", policy =>
                {
                    policy.WithOrigins(
                              Environment.GetEnvironmentVariable("FRONTEND_URL")
                              ?? "https://your-frontend.onrender.com")
                          .AllowAnyHeader()
                          .AllowAnyMethod();
                });
            });

            var app = builder.Build();

         
            using (var scope = app.Services.CreateScope())
            {
                var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
                db.Database.Migrate();
                SeedData.Initialize(db);
            }

            app.UseSwagger();
            app.UseSwaggerUI();

            app.UseCors("AllowFrontend");
            app.UseCors("AllowAll");

            app.UseMiddleware<RequestLoggingMiddleware>();
            app.UseMiddleware<ErrorHandlingMiddleware>();

            app.MapControllers();
            app.Run();
        }
    }
}

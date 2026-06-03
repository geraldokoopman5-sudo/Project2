using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace VehicleBookingAPI.Migrations
{
    /// <inheritdoc />
    public partial class AddVehicleImageData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ImageData",
                table: "Vehicles",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ImageData",
                table: "Vehicles");
        }
    }
}

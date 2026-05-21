namespace VehicleBookingAPI.Helpers
{
    public class BookingCalculator
    {
        public int CalculateDays(DateTime startDate, DateTime endDate)
        {
            int days = (endDate.Date - startDate.Date).Days;
            return Math.Max(days, 1);
        }

        public static decimal CalculateTotal(decimal dailyRate, int numberOfDays)
        {
            return dailyRate * numberOfDays;
        }
    }
}

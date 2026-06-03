namespace VehicleBookingAPI.Helpers
{
    public class BookingValidator
    {
        public static string? ValidateDates(DateTime startDate,DateTime endDate )
        {
            if (startDate.Date < DateTime.Today)
            
                return "Start date cannot be before Today";
            

            if(endDate.Date < startDate.Date)
            
                return "End date cannot be before the start date";

            return null;
        }   
    
    }
}

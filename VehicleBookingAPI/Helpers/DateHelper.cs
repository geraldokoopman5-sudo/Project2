namespace VehicleBookingAPI.Helpers
{
    public class DateHelper
    {
        public static bool RnagesOverlap(DateTime start1, DateTime end1, DateTime start2 , DateTime end2)
        {
           return start1 < end2 && start2 < end1;
        }
    }
}

namespace BlackSunHotelAPI.Models
{
    public class ParkingService
    {
        public int ParkingServiceId { get; set; }
        public int BookingId { get; set; }
        public string ParkingPlateNo { get; set; }

        public Booking Booking { get; set; }
    }
}

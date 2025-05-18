namespace BlackSunHotelAPI.Models
{    
    public class Review
    {
        public int ReviewId { get; set; }
        public int UserId { get; set; }
        public int BookingId { get; set; }
        public string ReviewContent { get; set; }
        public int Rating { get; set; }
        public User User { get; set; }
        public Booking Booking { get; set; }
    }
}

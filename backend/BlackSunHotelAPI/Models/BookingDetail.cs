using System.Text.Json.Serialization;

namespace BlackSunHotelAPI.Models
{    
    public class BookingDetail
    {
        public int BookingDetailId { get; set; }
        public int BookingId { get; set; }
        public int RoomId { get; set; }

        [JsonIgnore]
        public Booking Booking { get; set; }
        [JsonIgnore]
        public Room Room { get; set; }
    }
}

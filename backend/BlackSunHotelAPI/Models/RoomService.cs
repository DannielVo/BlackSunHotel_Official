namespace BlackSunHotelAPI.Models
{    
    public class RoomService
    {
        public int RoomServiceId { get; set; }
        public int RoomId { get; set; }
        public DateTime Datetime { get; set; }
        public string RoomServiceStatus { get; set; }

        public Room Room { get; set; }
    }
}

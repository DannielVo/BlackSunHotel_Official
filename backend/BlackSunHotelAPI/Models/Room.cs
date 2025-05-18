namespace BlackSunHotelAPI.Models
{    
    public class Room
    {
        public int RoomId { get; set; }
        public string RoomTitle { get; set; }
        public int RoomTypeId { get; set; }
        public string RoomDescription { get; set; }
        public string RoomImage { get; set; }
        public string RoomStatus { get; set; }

        public RoomType RoomType { get; set; }
    }
}

namespace BlackSunHotelAPI.DTOs
{
    public class CreateRoomDto
    {
        public string RoomTitle { get; set; }
        public int RoomTypeId { get; set; }
        public string RoomDescription { get; set; }
        public string RoomImage { get; set; }
        public string RoomStatus { get; set; }
    }
}


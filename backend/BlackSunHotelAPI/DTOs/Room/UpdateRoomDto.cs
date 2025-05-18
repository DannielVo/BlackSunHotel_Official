using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BlackSunHotelAPI.DTOs
{
    public class UpdateRoomDto
    {
        public string RoomTitle { get; set; }
        public int RoomTypeId { get; set; }
        public string RoomDescription { get; set; }
        public string RoomImage { get; set; }
        public string RoomStatus { get; set; }
    }
}
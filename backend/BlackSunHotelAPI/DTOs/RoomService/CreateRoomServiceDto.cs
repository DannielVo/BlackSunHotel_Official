using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BlackSunHotelAPI.DTOs
{
    public class CreateRoomServiceDto
    {
        public int RoomId { get; set; }
        public DateTime Datetime { get; set; }
        public string RoomServiceStatus { get; set; }
    }
}
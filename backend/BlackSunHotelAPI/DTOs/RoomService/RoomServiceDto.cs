using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BlackSunHotelAPI.Models;

namespace BlackSunHotelAPI.DTOs
{
    public class RoomServiceDto
    {
        public int RoomServiceId { get; set; }
        public int RoomId { get; set; }
        public DateTime Datetime { get; set; }
        public string RoomServiceStatus { get; set; }

        public Room Room { get; set; }
    }
}
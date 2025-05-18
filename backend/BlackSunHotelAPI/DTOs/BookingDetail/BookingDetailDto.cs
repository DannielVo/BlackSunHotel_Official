using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BlackSunHotelAPI.Models;

namespace BlackSunHotelAPI.DTOs
{
    public class BookingDetailDto
    {
        public int BookingDetailId { get; set; }
        public int BookingId { get; set; }
        public int RoomId { get; set; }
    }
}
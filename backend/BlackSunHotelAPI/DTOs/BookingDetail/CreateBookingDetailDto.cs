using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BlackSunHotelAPI.DTOs
{
    public class CreateBookingDetailDto
    {
        public int BookingId { get; set; }
        public int RoomId { get; set; }
    }
}
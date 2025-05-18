using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BlackSunHotelAPI.DTOs
{
    public class UpdateBookingDetailDto
    {
        public int BookingId { get; set; }
        public int RoomId { get; set; }
    }
}
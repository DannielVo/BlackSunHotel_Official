using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BlackSunHotelAPI.DTOs
{
    public class UpdateParkingServiceDto
    {
        public int BookingId { get; set; }
        public string ParkingPlateNo { get; set; }
    }
}
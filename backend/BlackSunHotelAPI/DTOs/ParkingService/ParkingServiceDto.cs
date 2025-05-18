using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BlackSunHotelAPI.Models;

namespace BlackSunHotelAPI.DTOs
{
    public class ParkingServiceDto
    {
        public int ParkingServiceId { get; set; }
        public int BookingId { get; set; }
        public string ParkingPlateNo { get; set; }

        public Booking Booking { get; set; }
    }
}
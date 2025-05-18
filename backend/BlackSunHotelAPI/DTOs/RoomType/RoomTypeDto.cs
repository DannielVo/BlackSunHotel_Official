using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BlackSunHotelAPI.DTOs
{
    public class RoomTypeDto
    {
        public int RoomTypeId { get; set; }
        public string RoomTypeName { get; set; }
        public string RoomDesc { get; set; }
        public string RoomFeatures { get; set; }
        public string RoomAmenities { get; set; }
        public string RoomImg { get; set; }
        public int MaxNoPeople { get; set; }
        public float RoomPrice { get; set; }
    }
}
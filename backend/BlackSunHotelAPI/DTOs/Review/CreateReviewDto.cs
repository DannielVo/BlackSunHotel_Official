using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BlackSunHotelAPI.DTOs
{
    public class CreateReviewDto
    {
        public int UserId { get; set; }
        public int BookingId { get; set; }
        public string ReviewContent { get; set; }
        public int Rating { get; set; }
    }
}
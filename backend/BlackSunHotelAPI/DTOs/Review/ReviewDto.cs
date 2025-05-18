using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BlackSunHotelAPI.Models;

namespace BlackSunHotelAPI.DTOs
{
    public class ReviewDto
    {
        public int ReviewId { get; set; }
        public int UserId { get; set; }
        public int BookingId { get; set; }
        public string ReviewContent { get; set; }
        public int Rating { get; set; }
        public User User { get; set; }
        public Booking Booking { get; set; }
    }
}
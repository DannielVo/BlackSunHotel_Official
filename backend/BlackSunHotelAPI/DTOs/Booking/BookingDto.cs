using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BlackSunHotelAPI.Models;

namespace BlackSunHotelAPI.DTOs
{
    public class BookingDto
    {
        public int BookingId { get; set; }
        public int? UserId { get; set; }
        public string Fullname { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public DateTime CheckInDate { get; set; }
        public DateTime CheckOutDate { get; set; }
        public float TotalPrice { get; set; }
        public string PaymentStatus { get; set; }
        public string Notes { get; set; }
        public ICollection<BookingDetail> BookingDetails { get; set; }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BlackSunHotelAPI.DTOs;
using BlackSunHotelAPI.Models;

namespace BlackSunHotelAPI.Mappers
{
    public static class BookingMappers
    {
        public static BookingDto ToBookingDto(this Booking bookingModel){
            return new BookingDto
            {
                BookingId = bookingModel.BookingId,
                UserId = bookingModel.UserId,
                Fullname = bookingModel.Fullname,
                Email = bookingModel.Email,
                Phone = bookingModel.Phone,
                CheckInDate = bookingModel.CheckInDate,
                CheckOutDate = bookingModel.CheckOutDate,
                TotalPrice = bookingModel.TotalPrice,
                PaymentStatus = bookingModel.PaymentStatus,
                Notes = bookingModel.Notes,
                BookingDetails = bookingModel.BookingDetails
            };
        }

        public static Booking ToBookingFromCreateDTO(this CreateBookingDto bookingDto)
        {
            return new Booking
            {
                UserId = bookingDto.UserId,
                Fullname = bookingDto.Fullname,
                Email = bookingDto.Email,
                Phone = bookingDto.Phone,
                CheckInDate = bookingDto.CheckInDate,
                CheckOutDate = bookingDto.CheckOutDate,
                TotalPrice = bookingDto.TotalPrice,
                PaymentStatus = bookingDto.PaymentStatus,
                Notes = bookingDto.Notes,
            };
        }
    }
}
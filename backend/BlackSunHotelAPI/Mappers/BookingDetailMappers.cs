using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BlackSunHotelAPI.DTOs;
using BlackSunHotelAPI.Models;

namespace BlackSunHotelAPI.Mappers
{
    public static class BookingDetailMappers
    {
        public static BookingDetailDto ToBookingDetailDto(this BookingDetail bookingDetailModel){
            return new BookingDetailDto
            {
                BookingDetailId = bookingDetailModel.BookingDetailId,
                BookingId = bookingDetailModel.BookingId,
                RoomId = bookingDetailModel.RoomId,
            };
        }

        public static BookingDetail ToBookingDetailFromCreateDTO(this CreateBookingDetailDto bookingDetailDto)
        {
            return new BookingDetail
            {
                BookingId = bookingDetailDto.BookingId,
                RoomId = bookingDetailDto.RoomId,
            };
        }
    }
}
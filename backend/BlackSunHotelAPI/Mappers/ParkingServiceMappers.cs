using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BlackSunHotelAPI.DTOs;
using BlackSunHotelAPI.Models;

namespace BlackSunHotelAPI.Mappers
{
    public static class ParkingServiceMappers
    {
        public static ParkingServiceDto ToParkingServiceDto(this ParkingService parkingModel){
            return new ParkingServiceDto
            {
                ParkingServiceId = parkingModel.ParkingServiceId,
                BookingId = parkingModel.BookingId,
                ParkingPlateNo = parkingModel.ParkingPlateNo,
                Booking = parkingModel.Booking,
            };
        }

        public static ParkingService ToParkingServiceFromCreateDTO(this CreateParkingServiceDto parkingDto)
        {
            return new ParkingService
            {
                BookingId = parkingDto.BookingId,
                ParkingPlateNo = parkingDto.ParkingPlateNo
            };
        }
    }
}
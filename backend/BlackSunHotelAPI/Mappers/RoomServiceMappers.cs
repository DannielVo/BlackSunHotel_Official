using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BlackSunHotelAPI.DTOs;
using BlackSunHotelAPI.Models;

namespace BlackSunHotelAPI.Mappers
{
    public static class RoomServiceMappers
    {
        public static RoomServiceDto ToRoomServiceDto(this RoomService roomServiceModel){
            return new RoomServiceDto
            {
                RoomServiceId = roomServiceModel.RoomServiceId,
                RoomId = roomServiceModel.RoomId,
                Datetime = roomServiceModel.Datetime,
                RoomServiceStatus = roomServiceModel.RoomServiceStatus,
                Room = roomServiceModel.Room
            };
        }

        public static RoomService ToRoomServiceFromCreateDTO(this CreateRoomServiceDto roomServiceDto)
        {
            return new RoomService
            {
                RoomId = roomServiceDto.RoomId,
                Datetime = roomServiceDto.Datetime,
                RoomServiceStatus = roomServiceDto.RoomServiceStatus,
            };
        }
    }
}
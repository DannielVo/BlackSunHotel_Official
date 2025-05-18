using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BlackSunHotelAPI.DTOs;
using BlackSunHotelAPI.Models;

namespace BlackSunHotelAPI.Mappers
{
    public static class RoomMappers
    {
        public static RoomDto ToRoomDto(this Room roomModel){
            return new RoomDto{
                RoomId = roomModel.RoomId,
                RoomTitle = roomModel.RoomTitle,
                RoomTypeId = roomModel.RoomTypeId,
                RoomDescription = roomModel.RoomDescription,
                RoomImage = roomModel.RoomImage,
                RoomStatus = roomModel.RoomStatus,
                RoomType = roomModel.RoomType
            };
        }

        public static Room ToRoomFromCreateDTO(this CreateRoomDto roomDto){
            return new Room{
                RoomTitle = roomDto.RoomTitle,
                RoomTypeId = roomDto.RoomTypeId,
                RoomDescription = roomDto.RoomDescription,
                RoomImage = roomDto.RoomImage,
                RoomStatus = roomDto.RoomStatus,
            };
        }
    }
}
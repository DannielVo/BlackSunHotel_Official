using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BlackSunHotelAPI.DTOs;
using BlackSunHotelAPI.Models;

namespace BlackSunHotelAPI.Mappers
{
    public static class RoomTypeMappers
    {
        public static RoomTypeDto ToRoomTypeDto(this RoomType roomTypeModel){
            return new RoomTypeDto
            {
                RoomTypeId = roomTypeModel.RoomTypeId,
                RoomTypeName = roomTypeModel.RoomTypeName,
                RoomDesc = roomTypeModel.RoomDesc,
                RoomFeatures = roomTypeModel.RoomFeatures,
                RoomAmenities = roomTypeModel.RoomAmenities,
                RoomImg = roomTypeModel.RoomImg,
                MaxNoPeople = roomTypeModel.MaxNoPeople,
                RoomPrice = roomTypeModel.RoomPrice
            };
        }

        public static RoomType ToRoomTypeFromCreateDTO(this CreateRoomTypeDto roomDto)
        {
            return new RoomType
            {
                RoomTypeName = roomDto.RoomTypeName,
                RoomDesc = roomDto.RoomDesc,
                RoomFeatures = roomDto.RoomFeatures,
                RoomAmenities = roomDto.RoomAmenities,
                RoomImg = roomDto.RoomImg,
                MaxNoPeople = roomDto.MaxNoPeople,
                RoomPrice = roomDto.RoomPrice
            };
        }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BlackSunHotelAPI.DTOs;
using BlackSunHotelAPI.Models;

namespace BlackSunHotelAPI.Mappers
{
    public static class UserMappers
    {
        public static UserDto ToUserDto(this User userModel){
            return new UserDto
            {
                UserId = userModel.UserId,
                Fullname = userModel.Fullname,
                Email = userModel.Email,
                Phone = userModel.Phone,
                IsStaff = userModel.IsStaff,
                RoleName = userModel.RoleName
            };
        }

        public static User ToUserFromCreateDTO(this CreateUserDto userDto)
        {
            return new User
            {
                Fullname = userDto.Fullname,
                Email = userDto.Email,
                Phone = userDto.Phone,
                IsStaff = userDto.IsStaff,
                RoleName = userDto.RoleName,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(userDto.Password)
            };
        }
    }
}